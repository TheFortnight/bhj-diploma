/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    if(this.element == undefined) {
      throw new Error('No ELEMENT!');
      //registerEvents();
  }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let elArr = this.element.querySelectorAll("[data-dismiss]='modal'");
    elArr = Array.from(elArr);
    elArr.array.forEach(elem => elem.onclick = function(event){
      this.onClose();
      event.preventDefault();
    });
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.close();
    e.preventDefault();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    console.log('ELEMENT: '+this.element);
    //et el = document.querySelector(this.element);
    //el.style.dispaly = "block";
    //el.style.dispaly = 'block';
    

  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    let el = this.element;
    el.style.dispaly  = '';
  }
}