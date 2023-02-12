/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if(element == undefined) throw new Error('No element!');
    this.element = element;
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.onclick = function(event){ 
      event.preventDefault();
      this.element.submit(); //???????????????
    }
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const form = document.getElementById('myform');
    console.log('FORM: '+form);
    let asyncForm = new AsyncForm( form ); // not properly declared?

    console.log( asyncForm.getData());
    return asyncForm; // reuiqred???
  }

  onSubmit(options){
    console.log(options);
    createRequest(options);
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let data = this.getData();
    const form = document.getElementById('myform');
    form.reset();
    this.onSubmit(data); //??? Получает данные формы из метода getData и передаёт в метод onSubmit
  }
}