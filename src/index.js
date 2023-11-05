import axios from "axios";
import SlimSelect from "slim-select";
import Styles from './css/common.css';
import Notiflix from "notiflix";


import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };


  const loader = document.querySelector('p.loader');
  const select = document.querySelector('select.breed-select');
  const info = document.querySelector('div.cat-info');
  
  
  loader.classList.remove('hidden');
  select.classList.add('hidden');
  info.classList.add('hidden');
  
  
  const error = document.querySelector('p.error');
  
  
  error.classList.add('hidden');
  
  
  fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
     
    })
    .catch(err => {
      
      error.classList.remove('hidden');
      error.textContent = `Error: ${err.message}`;
    });
  
  error.classList.add('hidden');
  
  
  fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(breeds => {
          // Обробити відповідь
          console.log(breeds);
    })
    .catch(err => {
      
      Notiflix.Notify.failure(`Error: ${err.message}`);
    });
    
  const selectBreed = document.querySelector('select.breed-select');
  
  const slimSelect = new SlimSelect({
    select: select,
    placeholder: 'Select breed',
    showSearch: true,
    searchPlaceholder: 'Search by breed name',
    searchText: 'Not found'
  });    

 