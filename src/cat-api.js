import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc";


export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    })
    .catch(error => {
      console.error('There was an error with the fetch operation: ', error);
    });
}


export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        const cat = data[0];
        return {
          name: cat.breeds[0].name,
          description: cat.breeds[0].description,
          temperament: cat.breeds[0].temperament,
          imageUrl: cat.url
        };
      } else {
        throw new Error('No cat found with the provided breed ID');
      }
    })
    .catch(error => {
      console.error('There was an error with the fetch operation: ', error);
    });
}

