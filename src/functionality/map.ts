import { IPlace } from "../interfaces";

export const displayMarkers = (L: any, map: L.Map, list: IPlace[]): void => {
    let markersArray: L.Marker[] = [];


    map.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Marker && layer.options.title && layer.options.title !== 'You') {
            markersArray.push(layer as L.Marker);
        }
    });

    if (markersArray.length) {
        for (let i = 0; i < markersArray.length; i++) {
            map.removeLayer(markersArray[i]);
        }
        markersArray = []
    }


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    list.forEach((place) => {
        const marker = L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {
            title: place.name,
        }).bindPopup(generatePopup(place.name, place.location.address, place.distanceToPlace)).addTo(map);
        markersArray.push(marker)
    });
}


function generatePopup(name: string, address: string, distance: number): string {
    return `
        <div class="popup">
            <h4>${name}</h4>
            <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
            <p><i class="fa-solid fa-person-walking"></i> ${distance} meters away</p>
        </div>
    `
}