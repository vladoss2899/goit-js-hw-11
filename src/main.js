import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightboxEl = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', handleSerch);

function handleSerch(event) {
  event.preventDefault();
  loaderEl.style.display = 'block';
  gallery.innerHTML = '';

  const form = event.currentTarget;
  const q = form.elements.query.value.trim();

  fetchImages(q)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: 'red',
          icon: 'none',
        });
      }
      createMarkup(data.hits);
    })
    .catch(err => {
      iziToast.error({
        message: 'Oops, server connection error!',
        position: 'topRight',
        backgroundColor: 'red',
        icon: 'none',
      });
    })
    .finally(() => {
      form.reset();
      loaderEl.style.display = 'none';
    });
}

function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '41900218-778e908913d1efd90b8f97d56';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}/?${searchParams}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  const markup = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-card">
        <a class="gallery-link" href="${largeImageURL}">
            <img 
                class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"/>
        </a>
        
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${likes} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${views} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${comments} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${downloads} </p>
            </div>
        </div>
    </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightboxEl.refresh();
}
