import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[type="email"]');
const message = document.querySelector('textarea[name="message"]');

let formData = {}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateFormData();

function onFormSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    
    formData = {};
    };

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
};

function populateFormData() {
const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if(savedFormData) {
    const formKeys = Object.keys(savedFormData);
    formKeys.map(element => {
    document.querySelector(`[name='${element}']`).value = savedFormData[element]});
}
}



