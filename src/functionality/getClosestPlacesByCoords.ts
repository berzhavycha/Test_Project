export async function placeSearch(latitude: number, longitude: number) {
    try {
        let places = null
        let i = 1
        do {
            const searchParams = new URLSearchParams({
                query: 'coffee',
                ll: `${latitude},${longitude}`,
                open_now: 'true',
                sort: 'DISTANCE',
                radius: `${22000 * i}`
            });

            const results = await fetch(
                `https://api.foursquare.com/v3/places/search?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',
                    }
                }
            );

            const data = await results.json();
            places = data.results
            console.log(places)
            i++
        } while (places?.length < 10)

        const nearestPlace = findNearesPlace(places, latitude, longitude)
        return nearestPlace;
    } catch (err) {
        console.error(err);
    }
}

const calculateDistance = (latitude: number, longitude: number, placeLatitude: number, placeLongitude: number): number => {
    const radiusEarthKm = 6371;
    const diffLat = (placeLatitude - latitude) * (Math.PI / 180);
    const diffLon = (placeLongitude - longitude) * (Math.PI / 180);
    const a =
        0.5 - Math.cos(diffLat) / 2 +
        Math.cos(latitude * (Math.PI / 180)) * Math.cos(placeLatitude * (Math.PI / 180)) * (1 - Math.cos(diffLon)) / 2;

    return radiusEarthKm * 2 * Math.asin(Math.sqrt(a));
}

const findNearesPlace = (places: any[], latitude: number, longitude: number) => {
    let nearestPlace = null
    let minDistance = Number.MAX_VALUE

    places.forEach(place => {
        const placeLatitude = place.geocodes.main.latitude
        const placeLongitude = place.geocodes.main.longitude
        const distance = calculateDistance(latitude, longitude, placeLatitude, placeLongitude)

        if (distance < minDistance) {
            minDistance = distance
            nearestPlace = place
        }
    })

    return nearestPlace
}
