import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_70dUkozJaKRJH6v6FEFfisLMREnwDOgTiuAgxgnEEsMXPrnFGZVgsw5q9FYgyhoc";

export async function fetchBreeds() {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export async function fetchCatByBreed(breedId) {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}