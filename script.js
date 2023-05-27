import { default as imageData } from './gallery-items.js';

const galleryList = document.querySelector('ul.js-gallery');
const modalWindow = document.querySelector('div.js-lightbox');
const lightboxImage = document.querySelector('img.lightbox__image');
		
const galleryItemsList = imageData.reduce((items, { preview, original, description }) =>
	items += `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img 
            class="gallery__image"
            src="${preview}" 
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`, "");

galleryList.insertAdjacentHTML('beforeend', galleryItemsList);

galleryList.addEventListener('click', onGalleryImageClick);
function onGalleryImageClick(event) {
	event.preventDefault();

	const targetImage = event.target;
	console.log(targetImage);
	if (targetImage.nodeName !== "IMG") {
		return
	}

	modalWindow.classList.add('is-open');

	lightboxImage.src = targetImage.dataset.source;
	lightboxImage.alt = targetImage.alt
}

const btnCloseModalWindow = document.querySelector('button[data-action="close-lightbox"]');
btnCloseModalWindow.addEventListener('click', onBtnCloseModalWindow);

function onBtnCloseModalWindow(event) {
	// const modalWindow = document.querySelector('div.lightbox');
	modalWindow.classList.remove('is-open');

	lightboxImage.src = "";
	lightboxImage.alt = "";
}

modalWindow.addEventListener('click', onOtherObjectClick);
function onOtherObjectClick(event) {
	if (event.target === lightboxImage) {
		return;
	}
	onBtnCloseModalWindow(event);	
}

document.addEventListener('keydown', onKeyEscapeDownOnModalWindow);
function onKeyEscapeDownOnModalWindow(event) {
	if (!modalWindow.classList.contains('is-open')) {
		return;
	}
	if (event.code === "Escape") {
		onBtnCloseModalWindow(event);
	}
}

document.addEventListener('keydown', onScrollingImageOnModalWindow);
function onScrollingImageOnModalWindow(event) {
	if (!modalWindow.classList.contains('is-open')) {
		return;
	}
	if (event.code === "ArrowLeft") {
		const indexOfImage = imageData.findIndex(({ original }) => original === lightboxImage.src);

		if (indexOfImage > 0) {
			lightboxImage.src = imageData[indexOfImage - 1].original;
			lightboxImage.alt = imageData[indexOfImage - 1].alt;
		}
		else {
			lightboxImage.src = imageData[imageData.length - 1].original;
			lightboxImage.alt = imageData[imageData.length - 1].alt;
		}
	}
	else if (event.code === "ArrowRight") {
		const indexOfImage = imageData.findIndex(({ original }) => original === lightboxImage.src);

		if (indexOfImage >= 0 && indexOfImage < imageData.length - 1) {
			lightboxImage.src = imageData[indexOfImage + 1].original;
			lightboxImage.alt = imageData[indexOfImage + 1].alt;
		}
		else {
			lightboxImage.src = imageData[0].original;
			lightboxImage.alt = imageData[0].alt;
		}
	}
};