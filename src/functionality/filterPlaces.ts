import { displayMarkersWrapper } from "./map";

export const filterPlacesByCategory = async (event: Event, placeList: any, displayMarkers: Function) => {
    const placesElements: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.place-item');
    const copyArr = [...placeList]

    if (event && event.target) {
        const target = event.target as HTMLInputElement;
        const category = target.innerText.split(' ')[0]

        let index = 0
        placesElements.forEach((place) => {
            if (category === 'All') {
                place.classList.remove('hidden');
            } else {
                if (place.classList.contains(category)) {
                    place.classList.remove('hidden');
                } else {
                    place.classList.add('hidden');
                    copyArr.splice(index, 1)
                    index--
                }
            }
            index++
        });
    }

    displayMarkers(copyArr)
};
