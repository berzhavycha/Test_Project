export interface IPlace {
    fsq_id: string,
    name: string;
    categories: { name: string }[];
    location: { address: string, formatted_address: string };
    distanceToPlace: number;
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        };
    };
}

