import { getLocation } from "./getUserLocation";
import { memoizedPlaceSearch } from "./getClosestPlacesByCoords";
import { generetePlacesList } from "./generatePlacesList";
import { generatePlacesCategoryBtns } from "./generatePlacesCategoryBtn";
import { filterPlacesByCategory } from "./filterPlaces";
import { subject } from "../Observer/Subject";
import { MapObserver } from "../Observer/MapObserver";
import { IPlace } from "../interfaces";


export const submitForm = async (event: Event) => {
    event.preventDefault();

    let nearestPlaces: IPlace[] = []

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

                sendLocationBtn.innerText = 'Loading...'

                try {
                    if (isNaN(latitude) || isNaN(longitude)) {

                        if (errorElement) {
                            errorElement.style.display = 'block'
                        }

                        return
                    }

                    nearestPlaces = await memoizedPlaceSearch(latitude, longitude);

                    if (formElement) {
                        formElement.style.display = 'none'
                        formElement.style.opacity = '0'
                        formElement.style.visibility = 'hidden'
                    }

                    const mapObserver = new MapObserver(latitude, longitude)
                    subject.subscribeObserver(mapObserver)

                    displayPlaces(nearestPlaces)
                    subject.updateState({ data: nearestPlaces, error: null })
                } catch (error: any) {
                    console.error(error);
                    subject.updateState({ data: [], error: error })
                }

            }

            const filterBtnsContainer: HTMLElement | null = document.querySelector('.filter-btns');
            if (filterBtnsContainer) {
                filterBtnsContainer.addEventListener('click', (e) => {

                    let resultArr: IPlace[] = []
                    const target = e.target as HTMLButtonElement;
                    if (target && target.tagName === 'BUTTON') {
                        resultArr = filterPlacesByCategory(e, nearestPlaces);
                        subject.updateState({ data: resultArr, error: null })
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

const getAllCategories = (arr: IPlace[]) => {
    return arr.reduce((acc, item) => {
        const category: string = item.categories[0].name
        if (!acc.includes(category)) {
            acc.push(category)
        }

        return acc
    }, [] as string[])
}

export const displayPlaces = (list: IPlace[]) => {
    const placesHTMLlist = generetePlacesList(list)
    const placesCategoryFilterBtns = generatePlacesCategoryBtns(getAllCategories(list))

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