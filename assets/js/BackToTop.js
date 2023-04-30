export class BackToTop
{
  /**
   *
   * @param {Number} showOnPx
   */
  constructor(showOnPx = 100)
  {
    this.showOnPx = showOnPx;

    this.btnBackToTop = document.getElementById('back-to-top');
    this.headerMain = document?.getElementById('header-main');

    this.scrollHandler = this.scroll.bind(this);
    this.clickHandler = this.goToTop.bind(this);

    document.addEventListener('scroll', this.scrollHandler);
    this.btnBackToTop.addEventListener('click',  this.clickHandler);
  }

  goToTop(event)
  {
    event.preventDefault();

    document.body.scrollIntoView({
        behavior: "smooth",
      }
    );
  }

  scrollContainer()
  {
    return document.documentElement || document.body;
  }

  scroll()
  {
    if (this.scrollContainer().scrollTop > this.showOnPx) {
      this.btnBackToTop.classList.add('visible');

      if (this.headerMain !== null) {
        this.headerMain.classList.add('header-bg-dark');
      }
    } else {
      this.btnBackToTop.classList.remove('visible');

      if (this.headerMain !== null) {
        this.headerMain.classList.remove('header-bg-dark');
      }
    }
  }
}
