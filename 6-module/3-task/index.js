import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.elem = this.createSlider(slides);
    this.addCarouselButtonClickListener();
    this.initCarousel(slides.length);
  }

  createSlider(slides) {
    let str = '';

    slides.forEach((slide) => {
      str += `
        <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
        </div>
      `;
    });

    return createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
          <div class="carousel__inner">${str}</div>
        </div>
    `);
  }

  initCarousel(slidesLength) {
    let rightClickArrow = this.elem.querySelector('.carousel__arrow.carousel__arrow_right');
    let leftClickArrow = this.elem.querySelector('.carousel__arrow.carousel__arrow_left');
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let currentSlideIndex = 0;

    function checkNavigationButtonsVisibility() {
      if (currentSlideIndex === 0) {
        leftClickArrow.style.display = 'none';
      } else {
        leftClickArrow.style.display = '';
      }

      if (currentSlideIndex === slidesLength - 1) {
        rightClickArrow.style.display = 'none';
      } else {
        rightClickArrow.style.display = '';
      }
    }

    checkNavigationButtonsVisibility();

    rightClickArrow.addEventListener('click', function () {
      if (currentSlideIndex >= slidesLength - 1) {
        return;
      }

      currentSlideIndex++;

      checkNavigationButtonsVisibility();

      carouselInner.style.transform = `translateX(${-currentSlideIndex * carouselInner.offsetWidth}px)`;
    });

    leftClickArrow.addEventListener('click', function () {
      if (currentSlideIndex <= 0) {
        return;
      }

      currentSlideIndex--;

      checkNavigationButtonsVisibility();

      carouselInner.style.transform = `translateX(${-currentSlideIndex * carouselInner.offsetWidth}px)`;
    });
  }

  addCarouselButtonClickListener() {
    const addButtons = this.elem.querySelectorAll('.carousel__button');

    addButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.closest('.carousel__slide').getAttribute('data-id');

        const event = new CustomEvent("product-add", {
          detail: productId,
          bubbles: true,
        });
        this.elem.dispatchEvent(event);
      });
    });
  }
}