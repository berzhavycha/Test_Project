export const displayMarkersWrapper = (latitude: number, longitude: number) => {
    const L = (window as any).L
    let map: any = null
    let markers: any = []

    let icon = L.icon({
        iconUrl: 'https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png',
        iconSize: [70, 70]
    })

    map = L.map('map').setView([latitude, longitude], 14)
    L.marker([latitude, longitude], {
        title: 'You',
        icon
    }).bindPopup('<h2>You</h2>').addTo(map)

    return function (list: any) {
        if (markers.length) {
            for (let i = 0; i < markers.length; i++) {
                map.removeLayer(markers[i]);
            }
            markers = []
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        list.forEach((place: any) => {
            const marker = L.marker([place.geocodes.main.latitude, place.geocodes.main.longitude], {
                title: place.name,
            }).bindPopup(generatePopup(place.name, place.location.address, place.distanceToPlace)).addTo(map);
            markers.push(marker)
        });
    }

};



function generatePopup(name: string, address: string, distance: number) {
    return `
        <div class="popup">
            <h4>${name}</h4>
            <p><i class="fa-solid fa-location-dot"></i> ${address}</p>
            <p><i class="fa-solid fa-person-walking"></i> ${distance} meters away</p>
        </div>
    `
}