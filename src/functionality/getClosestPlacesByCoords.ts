export async function placeSearch(latitude: number, longitude: number) {
    try {
        let places = null
        let i = 1
        do {
            const searchParams = new URLSearchParams({
                ll: `${latitude},${longitude}`,
                radius: `${2000 * i}`,
            });

            if (i === 25) break

            const results = await fetch(
                `https://api.foursquare.com/v3/places/search?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',
                    }
                }
            )

            const data = await results.json();
            places = data.results
            i++
        } while (places?.length < 10)

        if (places?.length < 10) {
            throw new Error('There is no 10 places that is near you')
        }

        places = places.map((item: any) => ({
            ...item,
            distanceToPlace: Math.trunc(calculateDistance(latitude, longitude, item.geocodes.main.latitude, item.geocodes.main.longitude))
        }))

        return places.sort((a: any, b: any) => a.distanceToPlace - b.distanceToPlace)
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

export const memoizedPlaceSearch = () => {
    const cache = new Map()

    return async function (latitude: number, longitude: number) {
        if (cache.has(`${latitude}:${longitude}`)) {
            return cache.get(`${latitude}:${longitude}`)
        }

        const result = await placeSearch(latitude, longitude)
        cache.set(`${latitude}:${longitude}`, result)
        return result
    }
}