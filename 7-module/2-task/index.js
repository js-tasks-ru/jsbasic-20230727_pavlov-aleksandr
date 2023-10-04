import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
  }
  createModal(){
    this.modal = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
          </div>
      </div>
    </div>
    `);
    return this.modal;
  }
  setTitle(title) {
    this.modalTitle = this.modal.querySelector('.modal__title');
    this.modalTitle.textContent = title;
  }

  setBody(node) {
    this.modalBody = this.modal.querySelector('.modal__body');
    this.modalBody.innerHTML = '';
    this.modalBody.append(node);
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');

    this.modal.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });
    document.addEventListener('keydown', (event) => this.closeByEscape(event));
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }

  closeByEscape(event) {
    if (event.code === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.closeByEscape);
    }
  }
}
