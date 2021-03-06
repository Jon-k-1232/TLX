import config from "../../config.js";

const AuthApiService = {
  postLogin({ email, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Origin: `${config.FRONT_WEB}`,
      },
      body: JSON.stringify({ email, password }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
