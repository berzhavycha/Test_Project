import { getLocation } from "./getUserLocation";
import { placeSearch } from "./getClosestPlacesByCoords";

export const submitForm = async (event: Event) => {
    event.preventDefault();

    if (event.target && event.target instanceof HTMLFormElement) {

        const sendLocationBtn: HTMLButtonElement | null = event.target.querySelector('.send-location-btn');

        if (sendLocationBtn && event.target.contains(sendLocationBtn)) {
            const latitudeInput: HTMLInputElement | null = document.getElementById('latitude') as HTMLInputElement | null;
            const longitudeInput: HTMLInputElement | null = document.getElementById('longitude') as HTMLInputElement | null;

            if (latitudeInput && longitudeInput) {
                const latitude: number = parseFloat(latitudeInput.value);
                const longitude: number = parseFloat(longitudeInput.value);

                if (isNaN(latitude) || isNaN(longitude)) {
                    alert('Invalid input. Please enter valid latitude and longitude.');
                    return;
                }

                try {
                    const nearestPlaces = await placeSearch(latitude, longitude);
                    console.log(nearestPlaces);
                } catch (error) {
                    console.error(error);
                    alert('Error occurred while fetching places.');
                }
            }
        } else {
            const { latitude, longitude } = getLocation()
            const nearestPlaces = await placeSearch(latitude, longitude);
            console.log(nearestPlaces)
        }


    }
}