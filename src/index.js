

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

let breeds = [];
let selectedBreed = null;
let catInfo = null;

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

breedSelect.addEventListener('change', handleBreedChange);
function showLoader() {
  loader.classList.add('show-loader');
}

function hideLoader() {
  loader.classList.remove('show-loader');
}
fetchBreeds()
  .then(data => {
    breeds = data;
    updateBreedSelectOptions();
    loader.style.display = 'none'; 
  })
  .catch(error => {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });

function updateBreedSelectOptions() {
   
 const elements = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    return option;
  });
  breedSelect.append(...elements);
  breedSelect.style.display = 'flex';
  new SlimSelect({
    select: '#selected',
  })
}

function handleBreedChange(e) {
  selectedBreed = e.target.value;
  loader.style.display = 'block'; 
  catInfoDiv.style.display = 'none';

  fetchCatByBreed(selectedBreed)
    .then(data => {
      catInfo = data[0];
      updateCatInfoDiv();
    })
    .catch(error => {
      Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    })
    .finally(() => {
      loader.style.display = 'none'; 
    });
}

function updateCatInfoDiv() {
  catInfoDiv.innerHTML = `
    <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" style="width: 100%; height: 100%; object-fit: cover;" />
    <h2>${catInfo.breeds[0].name}</h2>
    <p>${catInfo.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catInfo.breeds[0].temperament}</p>
  `;
  catInfoDiv.style.display = 'block'; 
}
