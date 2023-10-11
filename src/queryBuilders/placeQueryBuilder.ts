const API_HEADERS = {
    Accept: 'application/json',
    Authorization: `${process.env.FOURSQUARE_PLACES_API_KEY}`,
};

export const fetchPlaces = async (params: URLSearchParams): Promise<any> => {
    const url = `${process.env.FOURSQUARE_PLACES_API_BASE_URL}?${params}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: API_HEADERS,
    });
    return response.json();
}