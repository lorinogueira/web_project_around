class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(itemsArray) {
    itemsArray.forEach((item) => {
      const rendereditem = this._renderer(item);
      this.addItem(rendereditem);
    });
  }

  addItem(rendereditem) {
    this._container.prepend(rendereditem);
  }
}

export { Section };
