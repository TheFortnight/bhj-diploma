/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    
    User.register(data, (response) => {
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