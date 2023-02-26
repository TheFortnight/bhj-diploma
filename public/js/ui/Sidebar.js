/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let btn = document.querySelector('.sidebar-toggle');
    btn.onclick = function(event){
      let bar = document.querySelector('.sidebar-mini');
      bar.classList.toggle('sidebar-open');
      bar.classList.toggle('sidebar-collapse');
      event.preventDefault();
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let regBtn = document.querySelector('.menu-item_register');
    let logInBtn = document.querySelector('.menu-item_login');
    let logOutBtn = document.querySelector('.menu-item_logout');

    regBtn.onclick = function(event){
      
      let modal = App.getModal('register'); 
      modal.open();
      event.preventDefault();
    }

    logInBtn.onclick = function(event){
      let modal = App.getModal('login');
      modal.open();
      event.preventDefault();
    }

    logOutBtn.onclick = function(event){
      User.logout().then(()=> App.setState('init'));
      event.preventDefault();
    }
  }
}