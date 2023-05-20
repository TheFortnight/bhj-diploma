/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (response) => {
      if (response.success) {      
      App.setState( 'user-logged' );
      this.element.reset();
      let el = this.element.parentElement;
      el = el.parentElement;
      el = el.parentElement;
      el = el.parentElement;
      el = new Modal(el);
      el.close();
      }
    });

  }
}