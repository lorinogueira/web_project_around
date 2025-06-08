class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const rendereditem = this._renderer(item);
      this.addItem(rendereditem);
    });
  }

  addItem(rendereditem) {
    this._container.prepend(rendereditem);
  }
}

export { Section };
