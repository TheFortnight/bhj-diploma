/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static url = '/account';
  
  static get(id, callback){
    let option = {};
    option.data = id;
    option.callback = (err, response) => {
      if (response && response.success) {
        console.log('ACCOUNT GET RESPONSE: '+JSON.stringify(response));
        callback(false, response);
      } else {
        console.error(response.error);
      }
    }
    option.method = 'GET';    
    option.url = this.url;
    console.log('ACCOUNT GET DATA: '+JSON.stringify(id));
    createRequest(option);

  }
}
