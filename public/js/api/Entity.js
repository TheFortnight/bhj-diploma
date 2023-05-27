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
    option.data = '';
    option.callback = (response) => {
      if (response.success) {
        callback(response.data);
      }
    };
    option.method = 'GET';
    option.url = this.url+'/'+data;
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
    option.callback = callback;
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
    let formData = new FormData();
    formData.append('id', data);
    option.data = formData;
    option.callback = callback;
    option.method = 'DELETE';
    option.url = this.url;
    createRequest(option);
  }
}
