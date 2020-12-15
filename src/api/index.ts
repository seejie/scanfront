import { Api } from './../constant/types';
import http from './http';
import urls from './api';

const api: Api = {};

Object.entries(urls).forEach(([key, urlItem]) => {
  if (typeof urlItem === 'string') {
    api[key] = (params = {}, additionalConfig = {}) => {
      return http.get(urlItem, params, {
        ...additionalConfig
      })
    }
  } else {
    const { url, method = 'get' } = urlItem;
    api[key] = (params = {}, additionalConfig = {}) => {

      return http[method](url, params, {
        ...additionalConfig
      });
    };
  }
});

export default api;
