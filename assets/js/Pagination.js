import { PetModal } from './PetModal.js';
export class Pagination
{
  #petsUnique = [];
  #pets = [];

  constructor(
    container = '.pets__slider__wrapper',
    petsUnique = [],
    cardsToShow = 3
  )
  {
    this.#petsUnique = petsUnique;
    this.container = document.querySelector(container);
    this.cardsToShow = cardsToShow;

    this.btnFirst = document.getElementById('pagination-first');
    this.btnLast = document.getElementById('pagination-last');
    this.btnPrev = document.getElementById('pagination-prev');
    this.btnNext = document.getElementById('pagination-next');
    this.btnActive = document.getElementById('pagination-active');

    this.mobileMediaQuery = window.matchMedia('(min-width: 300px) and (max-width: 767px)');
    this.tabletMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1269px)');
    this.desktopMediaQuery = window.matchMedia('(min-width: 1280px)');

    this.#pets = this.#makeRandomPageSequence(this.#petsUnique);
    this.pages = this.#generatePages(this.#pets, this.cardsToShow);
    this.pageIndex = 0;
    this.lastPageIndex = this.pages.length - 1;

    this.btnPrevClickHandler = this.shiftLeft.bind(this);
    this.btnNextClickHandler = this.shiftRight.bind(this);
    this.btnLastClickHandler = this.shiftToLast.bind(this);
    this.btnFirstClickHandler = this.shiftToFirst.bind(this);
    this.sliderOpenSingleCardHandler = this.openModal.bind(this);

    this.mobileMediaQueryHandler = this.handleMobileChange.bind(this);
    this.tabletMediaQueryHandler = this.handleTabletChange.bind(this);
    this.desktopMediaQueryHandler = this.handleDesktopChange.bind(this);

    this.btnNext.addEventListener('click', this.btnNextClickHandler);
    this.btnLast.addEventListener('click', this.btnLastClickHandler);
    this.btnFirst.addEventListener('click', this.btnFirstClickHandler);
    this.container.addEventListener('click', this.sliderOpenSingleCardHandler);

    this.mobileMediaQuery.addEventListener('change', this.mobileMediaQueryHandler);
    this.tabletMediaQuery.addEventListener('change', this.tabletMediaQueryHandler);
    this.desktopMediaQuery.addEventListener('change', this.desktopMediaQueryHandler);

    this.mobileMediaQueryHandler(this.mobileMediaQuery);
    this.tabletMediaQueryHandler(this.tabletMediaQuery);
    this.desktopMediaQueryHandler(this.desktopMediaQuery);
  }

  render()
  {
    this.container.innerHTML = '';
    this.container.insertAdjacentHTML("afterbegin", this.#renderPage(this.pages[this.pageIndex]));
    this.btnActive.innerText = this.pageIndex + 1;
  }

  shiftRight()
  {
    event.preventDefault();

    if (this.pageIndex !== this.lastPageIndex) {
      this.pageIndex++;
    }

    if (this.pageIndex === this.lastPageIndex) {
      this.pageIndex = this.lastPageIndex;

      this.#disableButton(this.btnNext, this.btnNextClickHandler);
      this.#disableButton(this.btnLast, this.btnLastClickHandler);
    }

    if (this.pageIndex === 1) {
      this.#enableButton(this.btnPrev, this.btnPrevClickHandler);
      this.#enableButton(this.btnFirst, this.btnFirstClickHandler);
    }

    this.container.classList.add('page-fadeinout');

    this.render();
  }

  shiftLeft(event)
  {
    event.preventDefault();
    if (this.pageIndex !== 0) {
      this.pageIndex--;
    }

    if (this.pageIndex === 0) {
      this.#disableButton(this.btnPrev, this.btnPrevClickHandler);
      this.#disableButton(this.btnFirst, this.btnFirstClickHandler);
    }

    if (this.pageIndex === this.lastPageIndex - 1) {
      this.#enableButton(this.btnNext, this.btnNextClickHandler);
      this.#enableButton(this.btnLast, this.btnLastClickHandler);
    }

    this.render();
  }

  shiftToLast(event)
  {
    event.preventDefault();
    this.pageIndex = this.lastPageIndex;

    this.#disableButton(this.btnNext, this.btnNextClickHandler);
    this.#disableButton(this.btnLast, this.btnLastClickHandler);

    this.#enableButton(this.btnPrev, this.btnPrevClickHandler);
    this.#enableButton(this.btnFirst, this.btnFirstClickHandler);

    this.container.classList.add('page-fadeinout');

    this.render();
  }

  shiftToFirst(event)
  {
    event.preventDefault();
    this.pageIndex = 0;

    this.#disableButton(this.btnPrev, this.btnPrevClickHandler);
    this.#disableButton(this.btnFirst, this.btnFirstClickHandler);

    this.#enableButton(this.btnNext, this.btnNextClickHandler);
    this.#enableButton(this.btnLast, this.btnLastClickHandler);

    this.render();
  }

  #enableButton(button, handler)
  {
    button.classList.remove('btn-rounded-inactive');
    button.addEventListener('click', handler);
  }

  #disableButton(button, handler)
  {
    button.classList.add('btn-rounded-inactive');
    button.removeEventListener('click', handler);
  }

  handleMobileChange(event)
  {
    if (event.matches) {
      this.cardsToShow = 3;
      this.#reloadPage();
    }
  }

  handleTabletChange(event)
  {
    if (event.matches) {
      this.cardsToShow = 6;
      this.#reloadPage();
    }
  }

  handleDesktopChange(event)
  {
    if (event.matches) {
      this.cardsToShow = 8;
      this.#reloadPage();
    }
  }

  #reloadPage()
  {
    this.pages = this.#generatePages(this.#pets, this.cardsToShow);
    this.lastPageIndex = this.pages.length - 1;
    this.pageIndex = 0;

    this.#disableButton(this.btnPrev, this.btnPrevClickHandler);
    this.#disableButton(this.btnFirst, this.btnFirstClickHandler);
    this.#enableButton(this.btnNext, this.btnNextClickHandler);
    this.#enableButton(this.btnLast, this.btnLastClickHandler);

    this.render();
  }

  /**
   *
   * @param {Array} page
   * @returns {String}
   */
  #renderPage(page)
  {
    let html = '';

    for (let i = 0; i < page.length; i++) {
      html += this.#renderCard(page[i]);
    }

    return html;
  }

  /**
   *
   * @param {Object} pet
   * @returns {String}
   */
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

  /**
   *
   * @param {Array} pages
   * @param {number} itemsInside
   * @returns {Array}
   */
  #generatePages(pages, itemsInside)
  {
    let data = [...pages];
    let newPageSet = [];

    let cnt = 0;
    let arr = [];

    for (let item of data) {
      arr.push(item);
      cnt++;

      if(cnt === itemsInside) {
        newPageSet.push(arr);
        cnt = 0;
        arr = [];
      }
    }

    return newPageSet;
  }

  /**
   *
   * @param {Array} data
   * @returns {Array}
   */
  #makeRandomPageSequence(data)
  {
    let set = [];
    let pages = [];

    for (let i = 0; i < 6; i++) {
      set = [...data];
      pages.push( ...this.#shuffle(set) );
    }

    return pages;
  }

  /**
   *
   * @param {Array} data
   * @returns {Array}
   */
  #shuffle(data)
  {
    return data.sort( () => Math.random() - 0.5 );
  }

  openModal(event)
  {
    event.preventDefault();
    let petCard = event.target.closest('.pets__slider__card');

    if (!petCard) return;

    const petId = petCard.dataset.id;

    const modal = new PetModal(this.#petsUnique.find((el) => el.id == petId));
    modal.render();
    modal.open();
  }
}
