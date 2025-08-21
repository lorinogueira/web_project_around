class Api {
  constructor() {}

  getInfoFromApi(url) {
    return fetch(url, {
      headers: {
        authorization: "a1ae33fa-92c8-4fb4-90f3-3874e08185b4",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

export { Api };
