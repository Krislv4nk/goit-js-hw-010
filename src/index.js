

// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// let breeds = [];
// let selectedBreed = null;
// let catInfo = null;

// fetchBreeds()
//   .then(data => {
//     breeds = data;
   
//     updateBreedSelectOptions();
//   })
//   .catch(error => {
//     console.error(`Error fetching breeds: ${error.message}`);
//   });

// function updateBreedSelectOptions() {
//   const select = document.querySelector('.breed-select');
//   breeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.text = breed.name;
//     select.appendChild(option);
//   });
//   select.addEventListener('change', handleBreedChange);
// }

// function handleBreedChange(e) {
//   selectedBreed = e.target.value;
//   fetchCatByBreed(selectedBreed)
//     .then(data => {
//       catInfo = data[0];
      
//       updateCatInfoDiv();
//     })
//     .catch(error => {
//       console.error(`Error fetching cat info: ${error.message}`);
//     });
// }

// function updateCatInfoDiv() {
//   const div = document.querySelector('.cat-info');
//   div.innerHTML = `
//     <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" />
//     <h2>${catInfo.breeds[0].name}</h2>
//     <p>${catInfo.breeds[0].description}</p>
//     <p><strong>Temperament:</strong> ${catInfo.breeds[0].temperament}</p>
//   `;
// }


import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

let breeds = [];
let selectedBreed = null;
let catInfo = null;

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
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
    console.error(`Error fetching breeds: ${error.message}`);
  });

function updateBreedSelectOptions() {
  breedSelect.style.display = 'block'; 
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
  breedSelect.addEventListener('change', handleBreedChange);
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
      console.error(`Error fetching cat info: ${error.message}`);
    })
    .finally(() => {
      loader.style.display = 'none'; 
    });
}

function updateCatInfoDiv() {
  catInfoDiv.innerHTML = `
    <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" />
    <h2>${catInfo.breeds[0].name}</h2>
    <p>${catInfo.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catInfo.breeds[0].temperament}</p>
  `;
  catInfoDiv.style.display = 'block'; 
}
