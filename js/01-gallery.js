import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

function generateGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-original="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `)
    .join('');
}

function openFullSizeImage(event) {
  event.preventDefault();
  
  const targetElement = event.target;
  
  if (targetElement.tagName !== 'IMG') return;
  
  const fullSizeImageSource = targetElement.dataset.original;

  const instance = basicLightbox.create(`<img src="${fullSizeImageSource}">`);
  instance.show();

  document.addEventListener('keydown', closeOnEscapePress);

  function closeOnEscapePress(event) {
    if (event.code !== 'Escape') return;

    instance.close();
    document.removeEventListener('keydown', closeOnEscapePress);
  }
}

function initializeGallery(galleryContainer, galleryItems) {
  galleryContainer.insertAdjacentHTML(
    'beforeend',
    generateGalleryMarkup(galleryItems)
  );
  galleryContainer.addEventListener('click', openFullSizeImage);
}

initializeGallery(galleryContainer, galleryItems);