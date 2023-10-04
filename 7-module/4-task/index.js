import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = this.steps - 1;
    this.createModal();
  }

  createModal() {
    this.elem = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
          <div class="slider__thumb">
            <span class="slider__value">0</span>
          </div>

        <!--Полоска слайдера-->
        <div class="slider__progress"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div >
  `)

    this.progress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    this.sliderSteps[0].classList.add('slider__step-active');

    holder.addEventListener('click', this.onClick);

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;
    this.thumb.onpointerdown = this.onPointerDown;

    return this.elem;
  }

  setSliderChangeEvent() {
    let sliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })

    this.elem.dispatchEvent(sliderChangeEvent);
  }

  setSliderValue() {
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      if (i == this.value) {
        this.sliderSteps[i].classList.add('slider__step-active');
      } else {
        this.sliderSteps[i].classList.remove('slider__step-active');
      }
    }
  }

  getLeftRelative(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    return leftRelative;
  }


  onClick = (event) => {
    let leftRelative = this.getLeftRelative(event);
    let approximateValue = leftRelative * this.segments;
    this.value = Math.round(approximateValue);

    let leftPercents = this.value / this.segments * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    this.setSliderValue();
    this.setSliderChangeEvent();
  }


  onPointerMove = (event) => {
    this.elem.classList.add('slider_dragging');

    let leftRelative = this.getLeftRelative(event);
    let leftPercents = leftRelative * 100;
    let approximateValue = leftRelative * this.segments;
    this.value = Math.round(approximateValue);

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    this.setSliderValue();
  }


  onPointerUp = (event) => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
    this.elem.classList.remove('slider_dragging');

    let leftPercents = this.value / this.segments * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    this.setSliderChangeEvent();
  }


  onPointerDown = (event) => {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.position = 'absolute';
    thumb.style.zIndex = '1000';

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }
}