

import Notiflix from "notiflix";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info')

function toggleElements(loading) {
  breedSelect.style.display = loading ? 'none' : 'block';
  loader.style.display = loading ? 'block' : 'none';
  error.style.display = 'none';
}

function fetchData(url) {
  toggleElements(true);
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.map(({id, name}) =>{ 
        const option = document.createElement('option');
        option.value = id;
        option.text = name;
        breedSelect.appendChild(option);
      });
      
      new SlimSelect({
        select: '.breed-select'
      });

      toggleElements(false);
    })
    .catch(err => {
      console.error('Error:', err);
      error.textContent = err.message;
      error.style.display = 'block';
      toggleElements(false);
    });
}

const breedApiUrl = 'https://api.thecatapi.com/v1/breeds';
fetchData(breedApiUrl);

const breed_id = 'your_breed_id_value_here';

const catInfoApiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breed_id}`;

