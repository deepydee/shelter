import { PetModal } from './PetModal.js';
export class Slider
{
  #pets = [];
  /**
   *
   * @param {Array} pets
   */
  constructor(container = '.track', pets = [])
  {
    this.#pets = pets;
    this.container = document.querySelector(container);
    this.container.innerHTML = '';

    this.mobileMediaQuery = window.matchMedia('(min-width: 300px) and (max-width: 767px)');
    this.tabletMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1269px)');
    this.desktopMediaQuery = window.matchMedia('(min-width: 1280px)');

    this.sliderBtnLeft = document.getElementById('sliderBtnLeft');
    this.sliderBtnRight = document.getElementById('sliderBtnRight');

    this.sliderBtnLeftHandler = this.moveLeft.bind(this);
    this.sliderBtnRightHandler = this.moveRight.bind(this);
    this.sliderOpenSingleCardHandler = this.openModal.bind(this);

    this.sliderBtnLeft.addEventListener('click', this.sliderBtnLeftHandler);
    this.sliderBtnRight.addEventListener('click', this.sliderBtnRightHandler);
    this.container.addEventListener('click', this.sliderOpenSingleCardHandler);

    this.mobileMediaQueryHandler = this.handleMobileChange.bind(this);
    this.tabletMediaQueryHandler = this.handleTabletChange.bind(this);
    this.desktopMediaQueryHandler = this.handleDesktopChange.bind(this);

    this.mobileMediaQuery.addEventListener('change', this.mobileMediaQueryHandler);
    this.tabletMediaQuery.addEventListener('change', this.tabletMediaQueryHandler);
    this.desktopMediaQuery.addEventListener('change', this.desktopMediaQueryHandler);

    this.mobileMediaQueryHandler(this.mobileMediaQuery);
    this.tabletMediaQueryHandler(this.tabletMediaQuery);
    this.desktopMediaQueryHandler(this.desktopMediaQuery);
  }

  render()
  {
    const items = ['left', 'active', 'right'];
    let cnt = 0;
    let html = ``;

    items.forEach((item) => {
      html += `<div class="item" id="item-${item}">`;
      html += this.#renderItem(this.petsSequence[cnt]);
      html += `</div>`;
      cnt++;
    });

    this.container.innerHTML = '';
    this.container.insertAdjacentHTML("afterbegin", html);
    this.itemLeft = this.container.querySelector('#item-left');
    this.itemActive = this.container.querySelector('#item-active');
    this.itemRight = this.container.querySelector('#item-right');
  }

  moveLeft()
  {
    this.#blockControls();
    this.container.classList.add('transition-left');

    this.container.addEventListener('animationend', (event) => {

      this.container.classList.remove('transition-left');
      this.#unblockControls();

      this.petsSequence = this.#shiftSlidesSequence(this.petsSequence, 'left');
      this.render();
    }, {once: true});
  }

  moveRight()
  {
    this.#blockControls();
    this.container.classList.add('transition-right');

    this.container.addEventListener('animationend', (event) => {

      this.container.classList.remove('transition-right');
      this.#unblockControls();

      this.petsSequence = this.#shiftSlidesSequence(this.petsSequence, 'right');
      this.render();
    }, {once: true});
  }

  handleMobileChange(event)
  {
    if (event.matches) {
      this.slidesToShow = 1;
      this.petsSequence = this.#generateSlidesSequence();
      this.render();
    }
  }

  handleTabletChange(event)
  {
    if (event.matches) {
      this.slidesToShow = 2;
      this.petsSequence = this.#generateSlidesSequence();
      this.render();
    }
  }

  handleDesktopChange(event)
  {
    if (event.matches) {
      this.slidesToShow = 3;
      this.petsSequence = this.#generateSlidesSequence();
      this.render();
    }
  }

  #blockControls()
  {
    this.sliderBtnLeft.disabled = true;
    this.sliderBtnRight.disabled = true;
    this.sliderBtnLeft.classList.add('btn-rounded-inactive');
    this.sliderBtnRight.classList.add('btn-rounded-inactive');
  }

  #unblockControls()
  {
    this.sliderBtnLeft.disabled = false;
    this.sliderBtnRight.disabled = false;
    this.sliderBtnLeft.classList.remove('btn-rounded-inactive');
    this.sliderBtnRight.classList.remove('btn-rounded-inactive');
  }

  #renderCard(pet)
  {
    return `
    <div class="pets__slider__card" data-id="${pet.id}">
      <div class="card-body">
        <div class="card-img">
          <img src="${pet.img}" alt="${pet.name}">
        </div>
        <h3 class="card-heading">${pet.name}</h3>
        <a class="btn btn-secondary slider-more" href="#!">Learn more</a>
      </div>
    </div>`;
  }

  #renderItem(items)
  {
    let html = ``;

    for (let i = 0; i < this.slidesToShow; i++) {
      html += this.#renderCard(items[i]);
    }

    return html;
  }

  #generateSlidesSequence()
  {
    let pets = [...this.#pets];
    let sequence = [];
    let exclude = [];

    for (let i = 0; i < 3; i++) {
      if (exclude.length > this.slidesToShow) {
        exclude.splice(0, this.slidesToShow);
      }

      sequence[i] = this.#generateRandomSet(this.slidesToShow, exclude);
      exclude.push(...sequence[i]);
    }

    return sequence.map(item => item.map(pet => {
      return pets.find(el => el.id === pet);
    }));
  }

  #generateSlide(exclude)
  {
    let pets = [...this.#pets];
    const randomSet = this.#generateRandomSet(this.slidesToShow, exclude);

    return randomSet.map(pet => pets.find(el => el.id === pet));
  }

  #shiftSlidesSequence(array, shiftTo)
  {
    let exclude = [];

    if (shiftTo === 'left') {
      exclude = array[0].map(el => el.id);
      array.pop();
      array.unshift(this.#generateSlide(exclude));
    } else if (shiftTo === 'right') {
      exclude = array[2].map(el => el.id);
      array.shift();
      array.push(this.#generateSlide(exclude));
    }

    return array;
  }

  #generateRandomSet(num = 3, exclude = [])
  {
    let all = this.#pets.map((el) => el.id);
    let filtered = all.filter((el) => exclude.indexOf(el) === -1);

    return filtered.sort( () => Math.random() - 0.5 ).splice(0, num);
  }

  openModal(event)
  {
    event.preventDefault();
    let petCard = event.target.closest('.pets__slider__card');

    if (!petCard) return;

    const petId = petCard.dataset.id;

    const modal = new PetModal(this.#pets.find((el) => el.id == petId));
    modal.render();
    modal.open();
  }
}
