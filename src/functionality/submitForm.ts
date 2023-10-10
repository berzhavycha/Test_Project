import { getLocation } from "./getUserLocation";
import { memoizedPlaceSearch } from "./getClosestPlacesByCoords";
import { generetePlacesList } from "./generetePlacesList";
import { generetePlacesCategoryBtns } from "./generatePlacesCategoryBtn";
import { filterPlacesByCategory } from "./filterPlaces";
import { displayMarkersWrapper } from "./map";

const placeSearch = memoizedPlaceSearch()

export const submitForm = async (event: Event) => {
    event.preventDefault();

    let nearestPlaces: any = null
    let displayMarkers: Function

    if (event.target && event.target instanceof HTMLFormElement) {

        const sendLocationBtn: HTMLButtonElement | null = event.target.querySelector('.send-location-btn')
        const latitudeInput: HTMLInputElement | null = document.getElementById('latitude') as HTMLInputElement | null
        const longitudeInput: HTMLInputElement | null = document.getElementById('longitude') as HTMLInputElement | null
        const formElement: HTMLFormElement | null = document.querySelector('.location-form-wrapper');
        const errorElement: HTMLSpanElement | null = document.querySelector('.error-block') as HTMLSpanElement | null


        if (latitudeInput && longitudeInput) {

            const latitude: number = parseFloat(latitudeInput.value)
            const longitude: number = parseFloat(longitudeInput.value)

            if (sendLocationBtn && event.target.contains(sendLocationBtn)) {
                try {
                    if (isNaN(latitude) || isNaN(longitude)) {

                        if (errorElement) {
                            errorElement.style.display = 'block'
                        }

                        return
                    }

                    nearestPlaces = await placeSearch(latitude, longitude);

                    if (formElement) {
                        formElement.style.display = 'none'
                        formElement.style.opacity = '0'
                        formElement.style.visibility = 'hidden'
                    }

                    displayMarkers = displayMarkersWrapper(latitude, longitude)

                    displayPlaces(nearestPlaces)
                    displayMarkers(nearestPlaces)
                } catch (error) {
                    console.error(error);
                }

            }

            const filterBtnsContainer: HTMLElement | null = document.querySelector('.filter-btns');
            if (filterBtnsContainer) {
                filterBtnsContainer.addEventListener('click', (e) => {
                    const target = e.target as HTMLButtonElement;
                    if (target && target.tagName === 'BUTTON') {
                        filterPlacesByCategory(e, nearestPlaces, displayMarkers);
                    }
                });
            }

        }
    }

}

export const findUserLocation = async (e: Event) => {
    e.preventDefault()

    const { latitude, longitude } = await getLocation()
    const latitudeInput: HTMLInputElement | null = document.getElementById('latitude') as HTMLInputElement | null
    const longitudeInput: HTMLInputElement | null = document.getElementById('longitude') as HTMLInputElement | null

    if (latitudeInput && longitudeInput) {
        latitudeInput.value = `${latitude}`
        longitudeInput.value = `${longitude}`
    }
}

const getAllCategories = (arr: any[]) => {
    return arr.reduce((acc, item) => {
        const category = item.categories[0].name
        if (!acc.includes(category)) {
            acc.push(category)
        }

        return acc
    }, [])
}

const displayPlaces = (list: any[]) => {
    const placesHTMLlist = generetePlacesList(list)
    const placesCategoryFilterBtns = generetePlacesCategoryBtns(getAllCategories(list))

    const placeListElement: HTMLDivElement | null = document.querySelector('.place-list') as HTMLDivElement | null

    if (placeListElement) {
        placeListElement.style.display = 'flex'

        placeListElement.innerHTML += `
        <div class="places-list-top">
            <h2>10 Nearest Places Next to You</h2>
            <div class="filter-btns">
             <button>All</button>
                ${placesCategoryFilterBtns.join('')}
            </div>
        </div>
        `
        placeListElement.innerHTML += placesHTMLlist.join('')
    }
}