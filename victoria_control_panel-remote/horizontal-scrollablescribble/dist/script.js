class SliderUI {
  constructor(rootNode, scrollByItems) {
    this._rootClassName = rootNode.className;
    this._scrollContainerNode = rootNode.querySelector(`.${this._rootClassName}__scrollWrapper`);
    this._scrollByItems = scrollByItems;
    this._nextNode = rootNode.querySelector(`.${this._rootClassName}__button--next`);
    this._prevNode = rootNode.querySelector(`.${this._rootClassName}__button--prev`);
    if (typeof Element.prototype.scrollBy !== 'function') {
      Element.prototype.scrollBy = function (settings) {
        this.scrollLeft = this.scrollLeft + settings.left;
      };
    }
  }

  initScrollWidth() {
    this._setScrollWidth();
  }

  addItems(itemsArray) {
    const fragment = document.createDocumentFragment();
    itemsArray.forEach(item => {
      fragment.appendChild(this._createItem(item));
    });
    this._scrollContainerNode.appendChild(fragment);
  }

  showScrollbar() {
    this._scrollContainerNode.classList.add(`${this._rootClassName}__scrollWrapper--hasScrollbar`);
  }

  showNextButton() {
    this._showElement(this._nextNode);
  }

  hideNextButton() {
    this._hideElement(this._nextNode);
  }

  showPrevButton() {
    this._showElement(this._prevNode);
  }

  hidePrevButton() {
    this._hideElement(this._prevNode);
  }

  addNextButtonEventHandler(fn) {
    this._nextNode.addEventListener('click', fn);
  }

  addPrevButtonEventHandler(fn) {
    this._prevNode.addEventListener('click', fn);
  }

  addScrollHandler(fn) {
    this._scrollContainerNode.addEventListener('scroll', fn);
  }

  slideRight() {
    this._scrollContainerNode.scrollBy({ left: this.scrollWidth, behavior: 'smooth' });
  }

  slideLeft() {
    this._scrollContainerNode.scrollBy({ left: -this.scrollWidth, behavior: 'smooth' });
  }

  isScrollable() {
    return this._scrollContainerNode.offsetWidth < this._scrollContainerNode.scrollWidth;
  }

  isStart() {
    return this._scrollContainerNode.scrollLeft === 0;
  }

  isEnd() {
    return this._scrollContainerNode.scrollLeft >= this._scrollContainerNode.scrollWidth - this._scrollContainerNode.offsetWidth;
  }

  _createItem(item) {
    const div = document.createElement('div');
    div.className = `${this._rootClassName}__itemWrapper`;
    div.appendChild(item);

    return div;
  }

  _setScrollWidth() {
    this.scrollWidth = this._scrollContainerNode.children[this._scrollByItems].offsetLeft - this._scrollContainerNode.children[0].offsetLeft;
  }

  _showElement(element) {
    if (element.hidden)
    element.hidden = 0;
  }

  _hideElement(element) {
    if (!element.hidden)
    element.hidden = 1;
  }}


class Slider {
  constructor(rootNode, supportsTouch, scrollByItems) {
    this._isScrolling = false;
    this._scrollTimeout;
    this._supportsTouch = supportsTouch;
    this._ui = new SliderUI(rootNode, scrollByItems);
    this._initUi(this._supportsTouch);
  }

  addItems(elementsArray) {
    this._ui.addItems(elementsArray);
    this._initUi(this._supportsTouch);
  }

  _initUi(needsScrollbar) {
    if (this._ui.isScrollable()) {
      this._ui.initScrollWidth();
      this._setButtonStates();
      this._ui.addNextButtonEventHandler(() => this._handleNextClick());
      this._ui.addPrevButtonEventHandler(() => this._handlePrevClick());
      this._ui.addScrollHandler(() => this._handleScroll());
      needsScrollbar && this._ui.showScrollbar();
    }
  }

  _handleNextClick() {
    !this._isScrolling && this._ui.slideRight();
  }

  _handlePrevClick() {
    !this._isScrolling && this._ui.slideLeft();
  }

  _setButtonStates() {
    if (this._ui.isEnd()) {
      this._ui.hideNextButton();
    } else {
      this._ui.showNextButton();
    }

    if (this._ui.isStart()) {
      this._ui.hidePrevButton();
    } else {
      this._ui.showPrevButton();
    }
  }

  _handleScroll() {
    this._isScrolling = true;
    window.clearTimeout(this._scrollTimeout);
    this._scrollTimeout = setTimeout(() => {
      this._isScrolling = false;
      this._setButtonStates();
    }, 100);
  }}


const supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
const slider = document.querySelector('.sweet-slider');
const scrollByItems = 1;
const slideShow = new Slider(slider, supportsTouch, scrollByItems);



