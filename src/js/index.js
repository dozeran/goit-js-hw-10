import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    selectEl.style.display = 'flex';
    renderCatsList(breeds);
    selectEl.style.width = '200px';
    new SlimSelect({
      select: '.breed-select',
    });
    loaderEl.style.display = 'none';
  })
  .catch(RequestError);

selectEl.addEventListener('change', e => {
  catInfoEl.style.display = 'none';
  loaderEl.style.display = 'block';
  const breedId = e.target.value;
  fetchCatByBreed(breedId).then(renderCatInfo).catch(RequestError);
  loaderEl.style.display = 'none';
  catInfoEl.style.display = 'flex';
});

function renderCatsList(breeds) {
  const breedsList = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  selectEl.innerHTML = breedsList;
}

function renderCatInfo(catFullData) {
  const { url, breeds } = catFullData.data[0];
  const { name, description, temperament } = breeds[0];
  catInfoEl.innerHTML = `<img src="${url}" width="300">
  <div class="catdiscr">
  <h2>${name}</h2>
  <p>${description}</p>
  <p><strong>Temperament:</strong> ${temperament}</p></div>`;
}

function RequestError() {
  Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  loaderEl.style.display = 'none';
}
