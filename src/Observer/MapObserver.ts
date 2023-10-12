import { ISubject } from "./Subject"
import { displayMarkers } from "../functionality/map"

export interface IObserver {
    update(subject: ISubject): void
}



export class MapObserver implements IObserver {
    private L: any
    private map: any
    private latitude: number
    private longitude: number

    constructor(latitude: number, longitude: number) {
        this.L = (window as any).L
        this.latitude = latitude
        this.longitude = longitude
        this.map = this.L.map('map').setView([latitude, longitude], 14)


        this.L.marker([this.latitude, this.longitude], {
            title: 'You',
            icon: this.L.icon({
                iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png',
                iconSize: [70, 70]
            })
        }).bindPopup('<h2>You</h2>').addTo(this.map)
    }

    update(subject: ISubject): void {
        const { data } = subject.getState()
        displayMarkers(this.L, this.map, data)
    }
}
