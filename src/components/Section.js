export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  //public method named addItem() that takes a DOM element and adds it to
  //the container. this method should be called when adding an individual
  //card to the DOM
  addItem(element) {
    this._container.prepend(element);
  }
}