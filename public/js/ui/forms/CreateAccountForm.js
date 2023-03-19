/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (response) => {
      if (response.success) {
        this.element.reset();
        let parent = this.element.parentElement;
        parent = parent.parentElement;
        parent = parent.parentElement;
        parent = parent.parentElement;
        const modEl = new Modal(parent);
        modEl.close();        
        App.update();
      }
    })
  }
}