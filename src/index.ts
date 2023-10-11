import { findUserLocation, submitForm } from "./functionality/submitForm";

const form: HTMLFormElement | null = document.querySelector('.location-form');
form?.addEventListener('submit', submitForm);

const findUserLocationButton: HTMLAnchorElement | null = document.querySelector('.find-location-button')
findUserLocationButton?.addEventListener('click', findUserLocation)

