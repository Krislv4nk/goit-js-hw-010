import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc";


export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds: ", error);
      return [];
    });
}


export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching cat information: ", error);
      return null;
    });
}

