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
    option.data = '';
    option.callback = callback;
    option.method = 'GET';
    option.url = Account.url + id;
    createRequest(option);

  }
}
