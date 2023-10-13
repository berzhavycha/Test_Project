import { snakeToCamel } from "../utils/snakeToCamel";
import { fetchPlaces } from "../queryBuilders/placeQueryBuilder";
import { CSubject } from "../Observer/Subject";
import { IPlace } from "../interfaces";
import {
    MAX_RADIUS,
    MIN_PLACES,
    FETCH_LIMIT
} from '../constants'


interface INormalizedPlaces {
    [id: string]: IPlace
}

export class CPlacesModel extends CSubject {
    public places: IPlace[] = []

    constructor() {
        super()
    }

    private calculateDistance = (latitude: number, longitude: number, placeLatitude: number, placeLongitude: number): number => {
        const radiusEarthKm = 6371;
        const diffLat = (placeLatitude - latitude) * (Math.PI / 180);
        const diffLon = (placeLongitude - longitude) * (Math.PI / 180);
        const a =
            0.5 - Math.cos(diffLat) / 2 +
            Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;

        return radiusEarthKm * 2 * Math.asin(Math.sqrt(a)) * 1000;
    }

    private async fetchAndSortPlaces(latitude: number, longitude: number) {
        try {

            let allPlaces: INormalizedPlaces = {};
            let radius = 200;
            const densityThreshold = 0.000001;
            let density = 0;

            do {
                const searchParams = new URLSearchParams({
                    ll: `${latitude},${longitude}`,
                    radius: `${radius}`,
                    limit: `${FETCH_LIMIT}`,
                });

                const data = await fetchPlaces(searchParams);
                const places = data.results;

                places.forEach((place: IPlace) => {
                    if (!allPlaces[place.fsq_id]) {
                        allPlaces[place.fsq_id] = place;
                    }
                });

                
                density = places.length / (Math.PI * radius * radius);
                if (density < densityThreshold && radius < (MAX_RADIUS / 2)) {
                    radius *= 2;
                } else {
                    radius += Math.round(radius * 0.5);
                }


            } while (Object.keys(allPlaces).length < MIN_PLACES && radius <= MAX_RADIUS);

            if (Object.keys(allPlaces).length < MIN_PLACES) {
                throw new Error('There are not enough places near you.');
            }

            const placesWithDistance = Object.values(allPlaces).map((item: IPlace) => ({
                ...item,
                distanceToPlace: Math.trunc(this.calculateDistance(latitude, longitude, item.geocodes.main.latitude, item.geocodes.main.longitude)),
            }));

            return placesWithDistance
                .sort((a: IPlace, b: IPlace) => a.distanceToPlace - b.distanceToPlace)
                .slice(0, MIN_PLACES)
                .map(snakeToCamel);
        } catch (err) {
            if (err instanceof Error) {
                this.updateState({ data: [], error: err.message });
            }
        }
    }

    async memoizedFetchPlace(latitude: number, longitude: number) {
        try {
            const cacheKey = 'placeSearchCache'
            const cachedData = localStorage.getItem(cacheKey)
            const cache = cachedData ? new Map(JSON.parse(cachedData)) : new Map()
            const key = `${latitude}:${longitude}`

            for (const [key, result] of cache.entries()) {
                const [cachedLat, cachedLon] = key.split(':').map(parseFloat)
                const distance = this.calculateDistance(latitude, longitude, cachedLat, cachedLon)

                if (distance <= 50) {
                    this.places = result
                    this.updateState({ data: this.places, error: null })
                    return
                }
            }

            if (cache.has(key)) {
                return cache.get(key)
            }

            const result = await this.fetchAndSortPlaces(latitude, longitude)
            console.log(result)
            cache.set(key, result)
            localStorage.setItem(cacheKey, JSON.stringify(Array.from(cache.entries())))

            this.places = result as IPlace[]
            this.updateState({ data: this.places, error: null })

        } catch (err) {
            if (err instanceof Error) {
                this.updateState({ data: [], error: err.message });
            }
        }
    }

    filterPlaces(category: string) {
        const filteredPlaces = category === 'All' ? this.places : this.places.filter(place => place.categories[0]?.name === category)
        this.updateState({ data: filteredPlaces, error: null })
    }
}