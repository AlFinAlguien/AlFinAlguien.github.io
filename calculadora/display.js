//Clase para controlar la cálculadora, interactuar con los botones y mostrar cosas en el display

class Display{
  constructor(displayValorAnterior, displayValorActual){
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = ''; //distinto al del display(son los números que se están guardando)
    this.valorAnterior = ''; //strings vacías
    this.signos = {
            sumar: '+',
            dividir: '/',
            multiplicar: 'x',
            restar: '-',
        }
  }
  borrar (){
    this.valorActual = this.valorActual.toString().slice(0, -1);
    //para borrar el último string. Toma todos los carácteres menos el último.
    this.imprimirValores(); //actualiza el display
  }

  borrarTodo(){
    this.valorActual = '';
    this.valorAnterior = '';
    this.tipoOperacion = undefined;
    this.imprimirValores();
    //lo recetea
  }

  computar(tipo) {
    if(this.tipoOperacion !== 'igual') {this.calcular()};
    //otra sintaxis: this.tipoOperacion !== 'igual' && this.calcular
    //solo se ejecuta calcular() si la operacion anterior es diferente de igual
    this.tipoOperacion = tipo;
    //se actualiza el tipo de operacion
    this.valorAnterior = this.valorActual || this.valorAnterior;
    //si hay valor actual lo mete en el anterior, sinó lo deja igual(pone el mismo(this.valorAnterior))
    this.valorActual = '';
    //se vacía el valor atual
    this.imprimirValores();
    //imprime el resultado
  }
  /*
  Funcionamiento:
  1. presiono numeros y se guardan en valor actual.
  2. presiono un operador diferente de "=" y se ejecuta computar, y de ahí calcular pero en esta vez no hay un valorAnterior(al ejecutar calcular)
  por lo que calcular no hace nada(se queda en el if porque obtiene un NaN). La operacion cambia, el valor actual se pone en el anterior(porque si hay valor actual),
  se vacía el valor actual y se imprimen los valores. Se llama a imprimir valores lo cual hace que se imprima solo el valor anterior(el valor actual está vacío), y al
  él se le agrega el operador (ya que sí hay operador).
  3. se escribe el segundo número el cual se guarda en el valor actual y como la operación anterior fue diferente de "=" se calcula(calcular()) porque están los dos
  argumentos definidos y como algo que se puede pasar a número Float. Se cambia el tipo de operacion a "=" (por lo que la proxima que se presione un operador no entra en calcular()), el resultado
  de la operacion que se guardó en valor actual pasa a ser valor anterior y se repite el proceso. Como el "igual" no está en el objeto signos, no se puede agregar esa parte a la plantilla
  por lo que se agrega el string vacío despues del ||(o).

  El this.valorActual || this.valorAnterior de asignar sirve para cuando no hay un valor actual. Por ejemplo cuando do repetidas veces al igual.
  */
  agregarNumero(numero){
    if(numero === '.' && this.valorActual.includes('.')) {return}
    //si quiero poner un punto y ya hay un punto, no retorna nada y dejande ejecutar el método
    this.valorActual = this.valorActual.toString() + numero.toString();
    //el número se guardará en valorActual y se concatenarán todos los que clickeados
    //toString() devuelve el string que representa al objeto(a cada innerHTML que se pase). Sirve para "pasar" todo a string aunque sean numeros.
    this.imprimirValores();//actualiza el display
  }

  imprimirValores (){
    this.displayValorActual.textContent = this.valorActual;
    //el texto que tiene en el html se convierte en this.valorActual, o sea, el innerHTML del botón resectivo al activar el evento
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
  }

  calcular(){
    const valorActual = parseFloat(this.valorActual);
    const valorAnterior = parseFloat(this.valorAnterior);
    //paso a Float los strings
    //si los valores no son un numero parse devolverá NaN(no es un número[Not-A-Number]). isNaN() devuelve true si su argumento es NaN.
    //Entonces si los valores no son un número ahí frena la ejecución del método
    if( isNaN(valorActual) || isNaN(valorAnterior) ) {return}
    this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);//pasa si no entra a if(si se retorna algo deja de ejecutarse el método)
    //"un objeto literal es un array asociativo" sería como poner calculador.thisOperacion?.this.tipoOperacion tiene el value asignado a la
    //etiqueta de la operacion al dar click, la cual coincide con el nombre del método (dependiendo de la operación), en la nueva instacia de la clase Claculadora(calculador).

  }
}
