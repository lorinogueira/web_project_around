class UserInfo {
  constructor({ nameSelector, aboutmeSelector }) {
    this._name = document.querySelector(nameSelector);
    this._aboutme = document.querySelector(aboutmeSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      aboutme: this._aboutme.textContent,
    };
  }

  setUserInfo({ name, aboutme }) {
    this._name.textContent = name;
    this._aboutme.textContent = aboutme;
  }
}

export { UserInfo };
