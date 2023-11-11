import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc";



export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(url, {headers: {'x-api-key':'live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc'}})
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url, {headers: {'x-api-key':'live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc'}})
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.data;
    });
}