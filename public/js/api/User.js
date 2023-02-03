/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {

    console.log( current ); // объект { id: 12, name: 'Vlad' }
    localStorage.setItem('user', user);
    console.log( localStorage.user ); // строка "{"id":12,"name":"Vlad"}
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
    let current = User.current();
    console.log( current ); // объект { id: 12, name: 'Vlad' }

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const current = User.current();
    console.log( current ); // объект { id: 12, name: 'Vlad' }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback = ()=>{
    console.log( response.user.name ); // Vlad
    console.log( User.current().name );

    console.log( response.user ); // undefined
    console.log( response.success ); // false
    if (!response.success) User.unsetCurrent();
    console.log( User.current() ); // undefined
  }) {
    let option = {};
    option.data = '';
    option.callback = callback;
    option.method = 'GET';
    option.url = '/current'; // where is beginning???
    createRequest(option);
    
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = ()=>{
    console.log(response);
  }) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (err, response)=>{
      console.log(response);
  }) {
    let option = {};
    option.data = data;
    option.callback = callback;
    option.method = 'GET';
    option.url = Account.url;
    createRequest(option);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

  }
}
