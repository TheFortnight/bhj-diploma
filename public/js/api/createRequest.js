/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {   
 const func = function () {},
  { method = 'GET',
  callback = func,
  responseType,
  async = true,
  data = {}
  } = options;
  const xhr = new XMLHttpRequest();
  let formData = new FormData();

if(method === 'GET'){
         options.url += '?';
          for (let param in data) {
          options.url += (param+'='+options.data[param]+'&');
          }
}
  else {
    for (let key in data) {
      formData.append(key, options.data[key]);
    }
  }

  try {
    xhr.open(method, options.url);
    xhr.send(formData);
  } catch (e) {
    callback(e);
  }
       
  xhr.addEventListener('readystatechange', () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      callback(false, JSON.parse(xhr.response));
    }
  });        
};

