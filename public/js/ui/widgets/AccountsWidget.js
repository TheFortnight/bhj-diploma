/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === undefined) throw new Error ('Передан пустой элемент!');
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let newAccBtn = this.element.querySelector('.create-account');
    newAccBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const newAccForm = App.getModal('createAccount');
      newAccForm.open();      
    });
    
    let currAccBtns = this.element.querySelectorAll('.account');
    currAccBtns.forEach(elem => {
      elem.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.onSelectAccount(elem);
      })      
    });
}

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currUser = User.current();
    console.log('CURR USER: '+JSON.stringify(currUser));
    if(currUser !== false) {
      Account.list(currUser, (response) => {
        if (response.length > 0) {
          console.log('ACCS LENGTH IS: '+response.length);
          this.clear();
          this.renderItem(response);
          this.registerEvents(); // Не по ТЗ!!!
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(el => el.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let activeAcc = document.querySelector('.account.active');
    if (activeAcc !== null) activeAcc.classList.remove('active');
    element.classList.add('active');
    const id = element.getAttribute('data-id');
    console.log('ONSELECT ACCOUNT')
    App.showPage( 'transactions', id) // Specify structure!!!
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
</li>`
    
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach(el => {
      const html = this.getAccountHTML(el);
      this.element.innerHTML += html;
    })
  }
}
