/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) throw new Error ('Передан пустой элемент!');
    this.element = element;
    this.registerEvents();
    this.lastOptions;
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const page = document.querySelector('.content-wrapper');

    const remAccBtn = document.querySelector('.remove-account');
    page.addEventListener('click', (event) => {
      const target = event.target.closest('.btn-danger');
     
      if (target.classList.contains('remove-account')) this.removeAccount();
      if (target.classList.contains('transaction__remove')) this.removeTransaction(target.getAttribute('data-id'));
    });

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) return;
    const conf = confirm('Delete account?');
   
    if (conf) {
      Account.remove({id: this.lastOptions.account_id}, ((response) => {
        if (response && response.success) {
          App.updateWidgets();
          App.updateForms();
        } else {
          console.error(response.error);
        }
      }))
      this.clear([]);
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    const conf = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (conf) {
      Transaction.remove({id}, ((response)=> { 
        if (response && response.success) {
          App.update();
        } else {
          console.error(response.error);
        }
      }))
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
   
    if (!options) return;
    this.lastOptions = options;
    const callback = (err, response) => {
      if(response && response.success) {
      
        const actAcc = response.data.find(el => el.id === options.account_id);
        const name = actAcc.name;
        this.renderTitle(name);
      } else {
        console.error(response.error);
      }
    };   
    Account.get(options, callback);
   
    Transaction.list(options, ((data)=> {
      
      if (data) {        
        this.renderTransactions(data);
      }
    }))
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    
    this.renderTransactions([]);
    let title = this.element.querySelector('.content-title');
    title.innerHTML = 'Название счёта';
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    
    let title = this.element.querySelector('.content-title');
    title.innerHTML = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const recDate = new Date(date);
    const year = recDate.getFullYear();
    const month = recDate.getMonth();
    let day = recDate.getDate();
    day = day < 10 ? '0' + day : day;
    let hour = recDate.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute = recDate.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    const monthsArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа'];
    return (`${day} ${monthsArr[month]} ${year} г. в ${hour}:${minute}`);


  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * {
  "account_id": "1",
  "created_at": "2019-09-19 20:12:02",
  "id": "3",
  "name": "Копилка",
  "sum": 1500,
  "type": "income",
  "user_id": "1"
}
   * 
   * */
  getTransactionHTML(item){
   
    const actDate = this.formatDate(item.created_at);
   
      return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${actDate}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
      ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
    
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    let trans = this.element.querySelector('.content');
    trans.innerHTML = '';
    data.forEach(opts => {
      trans.innerHTML += this.getTransactionHTML(opts);
    })
  }
}