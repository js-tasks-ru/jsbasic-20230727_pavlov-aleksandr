import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbon();
  }

  createArrowLeft() {
    const arrowLeft = createElement(`
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  `);

    return arrowLeft;
  }

  createArrowRight() {
    const arrowRight = createElement(`
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  `);

    return arrowRight;
  }

  createRibbonInner() {
    const ribbonInner = createElement(`
      <nav class="ribbon__inner"></nav>
    `);

    const ribbonItem = this.categories.map(item => createElement(`
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
    `));

    ribbonInner.append(...ribbonItem);
    return ribbonInner;
  }

  scrollRibbon(ribbon) {
    this.ribbonInner = ribbon.querySelector('.ribbon__inner');
    this.buttonArrowLeft = ribbon.querySelector('.ribbon__arrow_left');
    this.buttonArrowRight = ribbon.querySelector('.ribbon__arrow_right');

    ribbon.addEventListener('click', (event) => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollWidth = this.ribbonInner.scrollWidth;
      let clientWidth = this.ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (event.target.closest('.ribbon__arrow_left')) {
        this.ribbonInner.scrollBy(-350, 0);
        this.buttonArrowRight.classList.add('ribbon__arrow_visible');
        if (scrollLeft == 0) {
          this.buttonArrowLeft.classList.remove('ribbon__arrow_visible');
        }
      }
      if (event.target.closest('.ribbon__arrow_right')) {
        this.ribbonInner.scrollBy(350, 0);
        this.buttonArrowLeft.classList.add('ribbon__arrow_visible');
        if (scrollRight < 1) {
          this.buttonArrowRight.classList.remove('ribbon__arrow_visible');
        }
      }
    })
  }

  selectRibbonItem(ribbon) {
    let a = ribbon.querySelectorAll('.ribbon__item');
    this.ribbonItem = ribbon.querySelector('.ribbon__item');

    this.ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.closest('.ribbon__item')) {
        a.forEach((el) => {
          if (el.getElementsByClassName('ribbon__item_active')) {
            el.classList.remove('ribbon__item_active');
          }
        })
        event.target.classList.add('ribbon__item_active');

        let ribbonSelectEvent = new CustomEvent('ribbon-select', {
          detail: event.target.closest('.ribbon__item').dataset.id,
          bubbles: true
        })
        this.ribbonItem.dispatchEvent(ribbonSelectEvent);
      }
    })
  }

  createRibbon() {
    const ribbon = createElement(`
    <div class="ribbon"></div>
    `);

    ribbon.append(this.createArrowLeft());
    ribbon.append(this.createRibbonInner());
    ribbon.append(this.createArrowRight());

    this.scrollRibbon(ribbon);
    this.selectRibbonItem(ribbon);

    return ribbon;
  }
}