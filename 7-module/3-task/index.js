import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
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
    this.sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    this.sliderSteps[0].classList.add('slider__step-active');

    holder.addEventListener('click', (event) => {
      this.showSegmentSelection(event);
    })

    return this.elem;
  }

  click(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    this.value = Math.round(approximateValue);
    let valuePercents = this.value / segments * 100;
    return valuePercents;
  }

  showSegmentSelection(event) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    let leftPercents = this.click(event);

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValue.textContent = this.value;

    for (let i = 0; i < this.sliderSteps.length; i++) {
      if (i == this.value) {
        this.sliderSteps[i].classList.add('slider__step-active');
      } else {
        this.sliderSteps[i].classList.remove('slider__step-active');
      }
    }

    let sliderChangeEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    })
    this.elem.dispatchEvent(sliderChangeEvent);
  }
}