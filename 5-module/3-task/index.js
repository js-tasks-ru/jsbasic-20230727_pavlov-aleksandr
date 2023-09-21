function initCarousel() {
  const leftArrow = document.querySelector('.carousel__arrow_left')
  const rightArrow = document.querySelector('.carousel__arrow_right')
  const carousel = document.querySelector('carousel__inner')
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselSlideWidth = document.querySelector('.carousel__slide');
  let currentPosition = 0;
  let numberOfSlides = 4;
  function visibilityNavigationsButtons(){
    if (currentPosition == 0){
      leftArrow.style.display = 'none';
    } else{
      leftArrow.style.display = '';
    }
    if (currentPosition == carouselSlideWidth.offsetWidth* (numberOfSlides -1)){
      rightArrow.style.display = '';
    } else{
      rightArrow.style.display = 'none';
    }
    }
    visibilityNavigationsButtons();
    rightArrow.addEventListener('click', function () {
      currentPosition -= carouselSlideWidth.offsetWidth;
      visibilityNavigationsButtons();
  
      carouselInner.style.transform = `translateX(${currentPosition}px)`;
    });
  
    leftArrow.addEventListener('click', function () {
      currentPosition += carouselSlideWidth.offsetWidth;
      visibilityNavigationsButtons();
  
      carouselInner.style.transform = `translateX(${currentPosition}px)`;
    });
}

  
