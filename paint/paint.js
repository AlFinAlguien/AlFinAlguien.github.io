var d = document.getElementById("area_dibujo");
var papel = d.getContext("2d");
d.addEventListener("mouseout", salioDelCanvas); //para saber cuando el mouse sale del canvas

var lapiz = document.getElementById("boton_lapiz");
lapiz.addEventListener("click", activarLapiz);
var borrador = document.getElementById("boton_borrador");
borrador.addEventListener("click", activarBorrador); //botones para activar lapiz o borrador, con sus respetivos escuchadores

var color_linea = document.getElementById("color_linea");
var grueso_linea = document.getElementById("grueso_linea");
var tamaño_borrador = document.getElementById("tamaño_borrador"); //propiedades en el lapiz y borrador

document.addEventListener("mousedown", mouseAbajo);
document.addEventListener("mouseup", mouseArriba);
document.addEventListener("mousemove", mouseMover); //escuchadores de eventos para el mouse

var limpiar = document.getElementById("limpiar_todo");
limpiar.addEventListener("click", limpiarTodo);     //boton para limpiar todo el canvas

var x, y;
var controladorMouse, controladorLapizBorrador;

function salioDelCanvas () {
  controladorMouse = 0;//cuando se sale del canvas se desactiva todo para no tener problemas por el offsetX y Y
}
function activarLapiz () {
  controladorLapizBorrador = 1;
}
function activarBorrador () {
  controladorLapizBorrador = 0;
} //estas funiones serviran para saber cuando se precionaron los botones de lapiz o borrador y poner condicionales para saber que dibujar

var desface = 7;
function mouseAbajo(evento) {
  controladorMouse = 1;
  x = evento.offsetX;
  y = evento.offsetY;
}

function mouseArriba(evento) {
  controladorMouse = 0;
}

function mouseMover(evento) {
  let grosorLapiz = parseInt(grueso_linea.value);
  let grosorBorrador = parseInt(tamaño_borrador.value);
   //traigo el valor y lo convierto en entero

  if (controladorMouse == 1) {
    //si se presionó el botón de activar el lapiz
    if (controladorLapizBorrador == 1) {
      dibujarLinea(color_linea.value, x, y, evento.offsetX, evento.offsetY, papel, grosorLapiz);
      x = evento.offsetX;
      y = evento.offsetY;
    }
    //si se presionó el botón de activar el borrador
    if (controladorLapizBorrador == 0) {
      dibujarLinea("white", x, y, evento.offsetX, evento.offsetY, papel, grosorBorrador);
      x = evento.offsetX;
      y = evento.offsetY;
    }
  }
  //.layer da la posición respecto a un objeto por lo que si mantengo presionado sobre un objeto como el título dibujaría en el canvas según coordenadas en el titulo por las ue pase el mouse
}





function dibujarLinea(color, xin, yin, xfi, yfi, lienzo, grueso) //doy más variables a las funiones
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grueso; //con esto doy más ancho a la linea (3 pixeles en este caso)
  lienzo.moveTo(xin, yin);
  lienzo.lineTo(xfi, yfi);
  lienzo.stroke();
  lienzo.closePath();
}

function limpiarTodo () {
  papel.clearRect(0, 0, 690, 690); //borra un cuadrado: 500, 500 es el ancho y el largo. Los dos primero es la ubicación del vértice superio izuierdo
}
