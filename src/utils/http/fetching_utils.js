const axios = require("axios").default;

const BASE_URL = "http://localhost:2222"; // TODO: Environment variables to handle production base URL.

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

/**
 * Adds our BASE_URL to calls that do not contain http.
 *
 * @param {String} url URL of the endpoint
 * @returns true endpoint URL.
 */
const _handleUrl = (url) => {
  if (url.indexOf("http") === -1) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

/**
 * Creates a GET request targetting the given URL.
 *
 * @param {String} url URL of the endpoint
 * @returns promise
 */
export const get = (url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(_handleUrl(url))
      .then((res) => resolve(res.data))
      .catch((err) => {
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
      .post(_handleUrl(url), body)
      .then((res) => resolve(res.data))
      .catch((err) => {
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
      .post(_handleUrl(url), body)
      .then((res) => resolve(res.data))
      .catch((err) => {
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
export const del = (url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(_handleUrl(url))
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err && err.response ? err.response.data : err);
      });
  });
};
