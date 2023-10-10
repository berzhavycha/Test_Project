import { submitForm } from "./functionality/submitForm";

const form: HTMLFormElement | null = document.querySelector('.location-form');
form?.addEventListener('submit', submitForm);



// navigator.geolocation.watchPosition(success, error)

// function success(pos: any) {
//     const lat = pos.coords.latitude
//     const lon = pos.coords.longitude
//     const accuracy = pos.coords.accuracy

//     let marker = L.marker([lat, lon]).addTo(map)
//     let circle = L.circle([lat, lon], { radius: accuracy }).addTo(map)

//     map.fitBounds(circle.getBounds())
// }

// function error(err: any) {
//     if (err.code === 1) {
//         alert("Please give location access")
//     } else {
//         alert('something went wrong')
//     }
// }