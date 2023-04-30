export class PetModal
{
  #pet = {};
  modalExists = false;
  /**
   *
   * @param {Object} pet
   */
  constructor(pet = {})
  {
    if (Object.keys(pet).length === 0) {
      throw new Error('The passed object is empty');
    }

    this.#pet = pet;
    this.modalWrapper = document.querySelector('.modal-wrapper');

    this.modalCloseHandler = this.close.bind(this);
    document.addEventListener('click', this.modalCloseHandler);
  }

  render()
  {
    if (this.modalWrapper !== null) {
      this.remove();
    }

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';

    this.modalContent = document.createElement('div');
    this.modalContent.className = 'modal';

    const modalPictire = document.createElement('div');
    modalPictire.className = 'modal__picture';
    modalPictire.style.backgroundImage = `url(${this.#pet.img})`;
    this.modalContent.append(modalPictire);

    const modalContent = document.createElement('div');
    modalContent.className = 'modal__content';

    const petName = document.createElement('h3');
    petName.className = 'pet-name';
    petName.textContent = this.#pet.name;
    modalContent.append(petName);

    const petTypeBreed = document.createElement('p');
    petTypeBreed.className = 'pet-type-breed';
    petTypeBreed.textContent = `${this.#pet.type} - ${this.#pet.breed}`;
    modalContent.append(petTypeBreed);

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = this.#pet.description;
    modalContent.append(description);

    const petProperties = document.createElement('ul');
    petProperties.className = 'pet-properties';

    const age = document.createElement('li');
    age.insertAdjacentHTML('afterbegin', `Age: <span>${this.#pet.age}</span>`);
    petProperties.append(age);

    const inoculations = document.createElement('li');
    inoculations.insertAdjacentHTML('afterbegin', `Inoculations: <span>${this.#pet.inoculations.join(', ')}</span>`);
    petProperties.append(inoculations);

    const diseases = document.createElement('li');
    diseases.insertAdjacentHTML('afterbegin', `Deseases: <span>${this.#pet.diseases.join(', ')}</span>`);
    petProperties.append(diseases);

    const parasites = document.createElement('li');
    parasites.insertAdjacentHTML('afterbegin', `Parasites: <span>${this.#pet.parasites.join(', ')}</span>`);
    petProperties.append(parasites);

    modalContent.append(petProperties);

    this.modalContent.append(modalContent);

    const closeButton = document.createElement('a');
    closeButton.href = '#!';
    closeButton.className = 'modal__close';
    closeButton.title = 'Закрыть';

    this.modalContent.append(closeButton);
    this.modalWrapper.append(this.modalContent);
    document.body.append(this.modalWrapper);
  }

  open()
  {
    this.modalWrapper.style.display = 'block';
    this.modalContent.classList.add('opened');

    this.disableScroll();
  }

  close(event)
  {
    this.modalClose = event.target.closest('.modal__close');

    const clickOutsideModal =
      this.modalContent !== null &&
      this.modalContent.classList.contains('opened') &&
      !event.target.closest('.modal') &&
      !event.target.closest('.pets__slider__card');

    if (this.modalClose || clickOutsideModal) {
      event.preventDefault();
      this.modalWrapper.style.display = 'none';
      this.modalContent.classList.remove('opened');
      this.enableScroll();
    }
  }

  disableScroll()
  {
    this.paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;
    this.fixBlocks = document.querySelectorAll('.fix-block');

    document.body.classList.add('lock');
    document.body.style.paddingRight = this.paddingOffset;

    this.fixBlocks.forEach(el => {
      el.style.paddingRight = this.paddingOffset;
    });
  }

  enableScroll()
  {
    document.body.classList.remove('lock');
    document.body.style.paddingRight = '';
    this.fixBlocks.forEach(el => {
      el.style.paddingRight = '';
    });
  }

  remove()
  {
    this.modalWrapper.remove();
  }
}
