/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    let userObj = JSON.stringify({id: user.id, name: user.name});
    localStorage.setItem('user', userObj);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    let current = User.current();
    console.log('CURRENT USER AFTER DELETE: ' + current ); // объект { id: 12, name: 'Vlad' }

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const current = localStorage.getItem('user');
    if(typeof(current) === 'string' && current.includes('name')) return JSON.parse(current);
    else return false;
  }
   

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    let option = {};
    option.data = '';
    option.callback = callback; 
    option.method = 'GET';
    option.url = this.url + '/current';
    createRequest(option);
    
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    let option = {};
    option.data = data;
    option.callback = callback;
    option.method = 'POST';
    option.url = this.url + "/login";   
    let userReg = createRequest(option);
    return userReg;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    
    let option = {};
    option.data = data;
    option.callback = callback;      
    option.method = 'POST';
    option.url = this.url + "/register";   
    let userReg = createRequest(option);
    return userReg;   
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    let options = {};
    options.url = this.url + '/logout';
    options.method = 'POST';
    options.callback = callback;
    createRequest(options);
  }
}



