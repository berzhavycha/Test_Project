import { IPlace } from "../interfaces";
import { fetchPlaces } from "../queryBuilders/placeQueryBuilder";
import { snakeToCamel } from "./snakeToCamel";

const RADIUS = 100;
const MAX_ATTEMPTS = 25;
const MIN_PLACES = 10;

interface INormalizedPlaces {
    [id: string]: IPlace
}

export async function placeSearch(latitude: number, longitude: number) {
    try {
        let allPlaces: INormalizedPlaces = {}
        let i = 1
        do {
            const searchParams = new URLSearchParams({
                ll: `${latitude},${longitude}`,
                radius: `${RADIUS * i}`,
            });

            const response = await fetch(
                `https://api.foursquare.com/v3/places/search?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',
                    }
                }
            )


            if (!response.ok) {
                throw new Error("Fetch places error!")
            }

            const data = await response.json();
            const places = data.results

            places.forEach((place: IPlace) => {
                if (!allPlaces[place.fsq_id]) {
                    allPlaces[place.fsq_id] = place
                }
            })

            i++
        } while (Object.keys(allPlaces).length <= MIN_PLACES ?? i <= MAX_ATTEMPTS)

        if (Object.keys(allPlaces).length < MIN_PLACES) {
            throw new Error('There is no 10 places that is near you')
        }

        const placesWithDistance = Object.values(allPlaces).map((item: IPlace) => ({
            ...item,
            distanceToPlace: Math.trunc(calculateDistance(latitude, longitude, item.geocodes.main.latitude, item.geocodes.main.longitude))
        }))

        return placesWithDistance.sort((a: IPlace, b: IPlace) => a.distanceToPlace - b.distanceToPlace).slice(0, 10).map(snakeToCamel);
    } catch (err) {
        console.error(err);
    }
}

export const calculateDistance = (latitude: number, longitude: number, placeLatitude: number, placeLongitude: number): number => {
    const radiusEarthKm = 6371;
    const diffLat = (placeLatitude - latitude) * (Math.PI / 180);
    const diffLon = (placeLongitude - longitude) * (Math.PI / 180);
    const a =
        0.5 - Math.cos(diffLat) / 2 +
        Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;

    return radiusEarthKm * 2 * Math.asin(Math.sqrt(a)) * 1000;
}

export const memoizedPlaceSearch = async (latitude: number, longitude: number) => {
    const cacheKey = 'placeSearchCache'
    const cachedData = localStorage.getItem(cacheKey)
    const cache = cachedData ? new Map(JSON.parse(cachedData)) : new Map()
    const key = `${latitude}:${longitude}`

    for (const [key, result] of cache.entries()) {
        const [cachedLat, cachedLon] = key.split(':').map(parseFloat)
        const distance = calculateDistance(latitude, longitude, cachedLat, cachedLon)

        if (distance <= 50) {
            return result
        }
    }

    if (cache.has(key)) {
        return cache.get(key)
    }

    const result = await placeSearch(latitude, longitude)
    cache.set(key, result)
    localStorage.setItem(cacheKey, JSON.stringify(Array.from(cache.entries())))

    return result
}