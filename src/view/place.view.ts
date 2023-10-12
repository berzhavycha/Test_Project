import { IPlace } from "../interfaces"
import * as L from 'leaflet';
import { getLocation } from "../utils/getUserLocation";


export interface IObserver {
    update(list: IPlace[]): void
}

export class CPlaceView implements IObserver {
    public app
    public container
    public mainInner
    public placeList
    public map
    public locationFormWrapper
    public locationForm
    public locationFormHeader
    public latFormBlock
    public lonFormBlock
    public submitBtn
    public errorBlock
    public errorSpan
    public locationFormBottom
    public pElem
    public aElem
    public latInput
    public lonInput

    public L: any
    public mapLayer: any

    constructor() {
        this.app = this.getElement('#root')

        this.container = this.createElement('div', 'container')
        this.mainInner = this.createElement('div', 'main-inner')
        this.placeList = this.createElement('div', 'place-list')
        this.map = this.createElement('div', undefined, 'map')

        this.locationFormWrapper = this.createElement('div', 'location-form-wrapper')
        this.locationForm = this.createElement('form', 'location-form')
        this.locationFormHeader = this.createElement('h2', undefined)
        this.locationFormHeader.innerText = 'Give us your location!'

        this.latFormBlock = this.createElement('div', 'location-form-block')
        this.latInput = this.createInputElement('latitude')

        this.lonFormBlock = this.createElement('div', 'location-form-block')
        this.lonInput = this.createInputElement('longitude')

        this.errorBlock = this.createElement('div', 'error-block')
        this.errorSpan = this.createElement('span', 'error-message')
        this.errorSpan.innerText = 'Invalid input. Please enter valid latitude and longitude.'

        this.submitBtn = this.createElement('button', 'send-location-btn') as HTMLButtonElement
        this.submitBtn.innerText = 'Send Location'
        this.submitBtn.type = 'submit'

        this.locationFormBottom = this.createElement('div', 'location-form-bottom')
        this.pElem = this.createElement('p', undefined)
        this.pElem.innerText = 'Don`t know your location? '
        this.aElem = this.createElement('a', 'find-location-button')
        this.aElem.innerText = 'Find it out!'
        this.aElem.onclick = async () => {
            const { latitude, longitude } = await getLocation()
            this.latInput.value = `${latitude}`
            this.lonInput.value = `${longitude}`
        }

        this.app?.append(this.container, this.locationFormWrapper)
        this.container.append(this.mainInner)
        this.mainInner.append(this.placeList, this.map)

        this.locationFormWrapper.append(this.locationForm)
        this.locationForm.append(this.locationFormHeader, this.latFormBlock, this.lonFormBlock, this.errorBlock, this.submitBtn, this.locationFormBottom)

        this.latFormBlock.append(this.latInput)
        this.lonFormBlock.append(this.lonInput)
        this.errorBlock.append(this.errorSpan)
        this.locationFormBottom.append(this.pElem)
        this.pElem.append(this.aElem)
    }

    private generetePlacesList = (list: IPlace[]) => {
        return list.map((item: any) => (
            ` 
            <div class="place-item ${item.categories[0].name.split(' ')[0]}">
                <div class="place-item-info">
                    <h3>${item.name}</h3>
                    <p class="categoty">${item.categories[0].name}</p>
                    <p class="location"><i class="fa-solid fa-location-dot"></i> ${item.location.formattedAddress}</p>
                    <p class="distance"><i class="fa-solid fa-person-walking"></i> ${item.distanceToPlace} meters away</p>
                </div>
            </div>
        `
        ))
    }

    private getAllCategories = (arr: IPlace[]) => {
        return arr.reduce((acc, item) => {
            const category: string = item.categories[0].name
            if (!acc.includes(category)) {
                acc.push(category)
            }

            return acc
        }, [] as string[])
    }

    private generatePlacesCategoryBtns(list: string[]) {
        return list.map((item: any) => (
            `<button class="category ${item.split(' ')[0]}">${item}</button>`
        ))
    }

    private generatePopup(name: string, address: string, distance: number): string {
        return `
            <div class="popup">
                <h4>${name}</h4>
                <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
                <p><i class="fa-solid fa-person-walking"></i> ${distance} meters away</p>
            </div>
        `
    }

    private createInputElement(id: string) {
        const input = this.createElement('input', undefined, id) as HTMLInputElement
        input.type = 'text'
        input.placeholder = `Enter your ${id}`

        return input
    }

    

    createElement(tag: string, className: string | undefined, id?: string) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        if (id) element.setAttribute('id', id)

        return element
    }

    getElement(selector: string) {
        const element = document.querySelector(selector)

        return element
    }

    getLatitude() {
        return this.latInput.value
    }

    getlongitude() {
        return this.lonInput.value
    }

    setLatitude(lat: number) {
        this.latInput.value = `${lat}`
    }

    setlongitude(lon: number) {
        this.lonInput.value = `${lon}`
    }

    displayPlaces(list: IPlace[]) {
        const placeListElement: HTMLDivElement = document.querySelector('.place-list') as HTMLDivElement

        if (this.locationFormWrapper) {
            this.locationFormWrapper.style.display = 'none'
            this.locationFormWrapper.style.opacity = '0'
            this.locationFormWrapper.style.visibility = 'hidden'

            placeListElement.style.display = 'flex'

            const placesCategoryFilterBtns = this.generatePlacesCategoryBtns(this.getAllCategories(list))

            placeListElement.innerHTML += `
            <div class="places-list-top">
                <h2>10 Nearest Places Next to You</h2>
                <div class="filter-btns">
                 <button>All</button>
                    ${placesCategoryFilterBtns.join('')}
                </div>
            </div>
            `
        }

        while (this.placeList.firstElementChild?.nextElementSibling) {
            this.placeList.removeChild(this.placeList.firstElementChild.nextElementSibling)
        }

        if (list.length === 0) {
            const p = this.createElement('p', undefined)
            p.textContent = 'Nothing to do! Add a task?'
            this.placeList.append(p)
        } else {
            const placesHTMLlist = this.generetePlacesList(list)


            if (placeListElement) {
                placeListElement.innerHTML += placesHTMLlist.join('')
            }
        }
    }


    displayMarkers(list: IPlace[]) {
        if (!this.L && !this.mapLayer) {
            this.L = (window as any).L
            this.mapLayer = this.L.map('map')
        }

        this.mapLayer.setView([+this.latInput.value, +this.lonInput.value], 14)


        this.L.marker([+this.latInput.value, +this.lonInput.value], {
            title: 'You',
            icon: this.L.icon({
                iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png',
                iconSize: [70, 70]
            })
        }).bindPopup('<h2>You</h2>').addTo(this.mapLayer)

        let markersArray: L.Marker[] = [];

        this.mapLayer.eachLayer((layer: L.Layer) => {
            if (layer instanceof L.Marker && layer.options.title && layer.options.title !== 'You') {
                markersArray.push(layer as L.Marker);
            }
        });

        if (markersArray.length) {
            for (let i = 0; i < markersArray.length; i++) {
                this.mapLayer.removeLayer(markersArray[i]);
            }
            markersArray = []
        }


        this.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.mapLayer);

        list.forEach((place) => {
            const marker = this.L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {
                title: place.name,
            }).bindPopup(this.generatePopup(place.name, place.location.address, place.distanceToPlace)).addTo(this.mapLayer);
            markersArray.push(marker)
        });
    }

    bindFetchPlaces(handler: Function) {
        this.locationForm.addEventListener('submit', event => {
            event.preventDefault()
            const latitude = this.latInput.value
            const longitude = this.lonInput.value

            if (latitude && longitude) {
                this.submitBtn.innerText = 'Loading...'
                handler(latitude, longitude)
            } else {
                this.errorBlock.style.display = 'block'
            }
        })
    }

    bindFilterPlaces(handler: Function) {
        this.placeList.addEventListener('click', event => {
            const target = event.target as HTMLButtonElement;
            if (target && target.tagName === 'BUTTON') {
                handler(target.innerText)
            }
        })
    }

    update(places: IPlace[]) {
        this.displayPlaces(places);
        this.displayMarkers(places);
    }
}