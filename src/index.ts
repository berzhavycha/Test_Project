import { submitForm } from "./functionality/submitForm";

const form: HTMLFormElement | null = document.querySelector('.location-form');
form?.addEventListener('submit', submitForm);

