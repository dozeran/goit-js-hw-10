export { fetchBreeds, fetchCatByBreed };
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_U7rmTrzS44tYKdfqDehj67wZQ7M3Ymzp8kjm8c31ehFSXld5OIkCTwEnK6hSTdbh';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    if (response.status !== 200) {
      return Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        return Notify.failure(
          `Oops! Something went wrong! Try reloading the page!`
        );
      }
      return response;
    });
}
