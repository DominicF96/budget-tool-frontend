import Cookies from "universal-cookie";
const axios = require("axios").default;

const BASE_URL = "http://localhost:2222"; // TODO: Environment variables to handle production base URL.

/**
 * JWT cookie to be used to authenticate requests to the server.
 */
const tokenCookie = new Cookies("token");
let jwt = tokenCookie.get("jwt");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

const axiosConfig = {
  headers: {Authorization: `Bearer ${jwt}`},
};

/**
 * Adds our BASE_URL to calls that do not contain http.
 *
 * @param {String} url URL of the endpoint
 * @returns true endpoint URL.
 */
const _handleUrl = url => {
  if (url.indexOf("http") === -1) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

/**
 * Sets the current token
 *
 * @param {String} token Token value
 */
export const setJWT = token => {
  jwt = token;
  // @todo Fix XSS vulnerability (use secure cookies with httpOnly)
  // See https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage#jwt-cookie-storage-security,
  // https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
  // and for next level fix: http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/
  tokenCookie.set("jwt", token, {sameSite: false, path: "/"});
};

export const clearJWT = () => {
  jwt = null;
  tokenCookie.remove("jwt", {path: "/"});
};

/**
 * Creates a GET request targetting the given URL.
 *
 * @param {String} url URL of the endpoint
 * @returns promise
 */
export const get = url => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(_handleUrl(url), axiosConfig)
      .then(res => resolve(res.data))
      .catch(err => {
        reject(err && err.response ? err.response.data : err);
      });
  });
};

/**
 * Creates an POST request targetting the given URL.
 *
 * @param {String} url URL of the endpoint
 * @param {JSON} body Content of the body (JSON)
 * @returns promise
 */
export const post = (url, body) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(_handleUrl(url), body, axiosConfig)
      .then(res => resolve(res.data))
      .catch(err => {
        reject(err && err.response ? err.response.data : err);
      });
  });
};

/**
 * Creates an UPDATE request targetting the given URL.
 *
 * @param {String} url URL of the endpoint
 * @param {JSON} body Content of the body (JSON)
 * @returns promise
 */
export const update = (url, body) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(_handleUrl(url), body, axiosConfig)
      .then(res => resolve(res.data))
      .catch(err => {
        reject(err && err.response ? err.response.data : err);
      });
  });
};

/**
 * Creates a DELETE request targetting the given URL.
 *
 * @param {String} url URL of the endpoint
 * @returns promise
 */
export const del = url => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(_handleUrl(url), axiosConfig)
      .then(res => resolve(res.data))
      .catch(err => {
        reject(err && err.response ? err.response.data : err);
      });
  });
};
