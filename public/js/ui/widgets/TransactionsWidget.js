/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element === undefined) throw new Error ('Передан пустой элемент!');
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const newIncome = document.querySelector('.create-income-button');
    const newExpense = document.querySelector('.create-expense-button');

    newIncome.addEventListener('click', (event) => {
      event.preventDefault();
      let inModal = App.getModal('newIncome');
      inModal.open();
    });

    newExpense.addEventListener('click', (event) => {
      event.preventDefault();
      let inModal = App.getModal('newExpense');
      inModal.open();
    });
  }
}
