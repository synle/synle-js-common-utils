import axios from 'axios';
import qs from 'qs';

function _decorate(_instance): SendbloomUtils.RestClient {
  // this is strictly used to post on url encoded form data...
  _instance.postEncoded = (url, data, config) => {
    // NOTE: this is how we do post body with `application/x-www-form-urlencoded`
    const params = new URLSearchParams();
    Object.keys(data || {}).forEach((fieldKey) => {
      const fieldValue = data[fieldKey];
      params.append(fieldKey, fieldValue);
    });
    return _instance.post(url, params, config);
  };

  // special methods that handle get with query param
  const _oldGetMethod = _instance.get;
  _instance.get = (url, data = {}, config) => {
    if (Object.keys(data).length === 0) {
      return _oldGetMethod(url, null, config);
    }
    const queryString = qs.stringify(data);
    return _oldGetMethod(`${url}?${queryString}`, null, config);
  };

  return _instance;
}


/**
 * singleton instance of our axios used for FE at the moment
 */
const _singletonInstance = _decorate(
  axios.create({
    baseURL: '/',
    timeout: 30000, // timeout at 30 secs
  }),
);


export default () => {
  return _singletonInstance;
}
