/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  } 

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accList = this.element.querySelector('.accounts-select');
    accList.innerHTML = '';
    //let inAccList = document.querySelector('#income-accounts-list');
   // const currUser = User.current();
    Account.list('', (list) => {
      if (list.length > 0) {
       
       list.forEach(elem => { 
       
        //this.element.innerHTML += `<option value="${elem.id}">${elem.name}</option>`;
        accList.innerHTML += `<option value="${elem.id}">${elem.name}</option>`;
       }) 
      }
    }); 

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close(); // пока не могу понять, в каком месте передается тип транзакции, чтобы закрывать конкретную форму
      } else {
        this.element.reset();
        console.error(response.error)
      }
    });
  }
}