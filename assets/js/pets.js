import { getPets } from './getPets.js';
import { Pagination } from './Pagination.js';
import { BackToTop } from './BackToTop.js';

const fixBlocks = document.querySelectorAll('.fix-block');
const showOnPx = 100;

const ToTop = new BackToTop(showOnPx);

const enableScroll = () => {
  document.body.classList.remove('lock');
  document.body.style.paddingRight = '';
  fixBlocks.forEach(el => {
    el.style.paddingRight = '';
  });
}

document.addEventListener('click', (event) => {

  const overlay = document.querySelector('.overlay');
  const navToggle = event.target.closest('#nav-toggle');
  const mobileMenu = document.getElementById('nav-menu');

  if (navToggle) {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('lock');
    overlay.hidden = !overlay.hidden;
  }

  if (!mobileMenu.classList.contains('hidden') && !navToggle) {
    mobileMenu.classList.add('hidden');
    overlay.hidden = true;
    enableScroll();
  }

  if (mobileMenu) {
    const mnuItem = event.target.closest('.nav-menu__item');
    if (!mnuItem) return;

    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
      mobileMenu.classList.add('hidden');
    }
  }
});


getPets('assets/json/pets.json')
.then((pets) => {
  const pagination = new Pagination('.pets__slider__wrapper', pets);
  pagination.render();
});

let message = `
1. Реализация burger menu на обеих страницах: +26

- при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2
- при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4
- высота адаптивного меню занимает всю высоту экрана: +2
- при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4
- бургер-иконка создана при помощи html+css, без использования изображений: +2
- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2
- при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2
- расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2
- область, свободная от бургер-меню, затемняется: +2
- страница под бургер-меню не прокручивается: +4

3. Реализация пагинации на странице Pets: +36

- при перезагрузке страницы всегда открывается первая страница пагинации: +2
- при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2
- при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2
- при открытии первой страницы кнопки << и < неактивны: +2
- при открытии последней страницы кнопки > и >> неактивны: +2
- в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2
- каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
- при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4
- при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4
- карточки питомцев не должны повторяться на одной странице: +4
- при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4
- при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2
- общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2
- при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4

4. Реализация попап на обеих страницах: +12
- попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2
- часть страницы вне попапа затемняется: +2
- при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2
- при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2
- кнопка с крестиком интерактивная: +2
- окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2
`;

console.log(message);
