class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    this.getUserInfo();
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
  });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
  });
  }

  editUserAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    });
  }


  editUserInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  deleteCard (id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  toggleLike (id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    Promise.reject(`Error: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
}

export default Api;