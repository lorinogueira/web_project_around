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

  updateProfile(url, item) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        authorization: "a1ae33fa-92c8-4fb4-90f3-3874e08185b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  postCard(url, item) {
    return fetch(url, {
      method: "POST",
      headers: {
        authorization: "a1ae33fa-92c8-4fb4-90f3-3874e08185b4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        isLiked: false,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  updateLike(url, item) {
    let method;

    if (!item.isLiked) {
      method = "PUT";
    } else {
      method = "DELETE";
    }

    return fetch(url, {
      method: method,
      headers: {
        authorization: "a1ae33fa-92c8-4fb4-90f3-3874e08185b4",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

export { Api };
