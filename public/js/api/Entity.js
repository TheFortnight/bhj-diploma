/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static url = '';
  
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){ 
    let option = {};
    option.data = data;
    option.callback = (err, response) => {
      if (response && response.success) {
        callback(response.data);
      } else {
        console.error(response.error);
      }
    };
    option.method = 'GET';
    option.url = this.url;
    createRequest(option);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    let option = {};
    option.data = data;
    option.callback = (err, response) => {
      if (response && response.success) {
        callback (false, response)
      } else {
        console.error(response.error);
      }
    }
    option.method = 'PUT';
    option.url = this.url;
    createRequest(option);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    let option = {};
   // let formData = new FormData();
   // formData.append('id', data);
    option.data = data;
    option.callback = (err, response) => {
      if (response && response.success) {
        callback (response)
      } else {
        console.error(response.error);
      }
    }
    option.method = 'DELETE';
    option.url = this.url;
    createRequest(option);
  }
}
