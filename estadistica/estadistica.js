var dato = document.getElementById("dato");
var datosEti = document.getElementById("datosEti");
var resultado =document.getElementById("resultado");

(document.getElementById("desviacion")).addEventListener("click", desviacion);
(document.getElementById("promedio")).addEventListener("click", promedio);
(document.getElementById("moda")).addEventListener("click", moda);
(document.getElementById("max")).addEventListener("click", max);
(document.getElementById("min")).addEventListener("click", min);
(document.getElementById("nuevosDatos")).addEventListener("click", reiniciar);

document.addEventListener("keydown", nuevoDato);

var datos = new Array(0);
var i=0;

function nuevoDato(evento){
  if(evento.keyCode==13){
    let datoNum = Number(dato.value);
    datos.push(datoNum);

    i=i+1;
    let a = `${i}`;
    datosEti.innerHTML = datosEti.innerHTML +"<br/><b>#"+a+".</b>  "+dato.value;

    dato.value=""; //para que se limpie el cuadro de texto otra vez
  }
}

function desviacion () {
  //media
  let suma=0;
  for(let i of datos){
    suma = suma +i;
  }
  let xpro = suma/datos.length;

  let sumatoria=0;
  for(let i of datos){
    sumatoria = sumatoria + Math.pow(i-xpro,2);
  }

  let desviacionNum = Math.sqrt(sumatoria/datos.length);
  let desviacionAprox = `${Math.round((desviacionNum + Number.EPSILON) * 100) / 100}`;

  resultado.innerHTML = desviacionAprox;
  dato.value="";//limpia el cuadro de texto
}
function promedio () {
  let suma=0;

  for(let i of datos){
    suma = suma + i;
  }

  let promedioNum = suma/datos.length;
  let promedioApox = `${Math.round((promedioNum + Number.EPSILON) * 100) / 100}`;

  resultado.innerHTML = promedioApox;
  dato.value="";
}
function moda (){
  var frec = new Array(0);

  //lleno de ceros el arreglo de frecuencias
  for (let i in datos){
    frec.push(0);
  }
  console.log(frec[0]);
  for(let i in datos){
    for(let j in datos){
      if(datos[i]==datos[j]){
        frec[i]=frec[i]+1;
      }
    }
  }
  let frecMax = Math.max(...frec);

  let posMax1 = frec.indexOf(frecMax); //primera aparicion de un elemento
  let posMax2 = frec.lastIndexOf(frecMax); //ultima aparicion de un elemento


  if(datos[posMax1]==datos[posMax2]){
    //si no hay modas repetidas
    let modav = `${datos[posMax1]}`;
    let repeticiones = `${frec[posMax1]}`;

    resultado.innerHTML = "la moda es: "+modav+"  repeticiones: "+repeticiones;
    dato.value="";

  }
  else{
    //si hay modas repetidas
    resultado.innerHTML = "hay más de una moda";
    dato.value="";
  }
}
function max () {
  let maximo = `${Math.max(...datos)}`;
  resultado.innerHTML = "El m&aacute;ximo es: "+maximo;
  dato.value="";
}
function min () {
  let minimo = `${Math.min(...datos)}`;
  resultado.innerHTML = "El m&iacute;nimo es: "+minimo;
  dato.value="";
}
function reiniciar (){
  datos = []; //vacia el array
  datosEti.innerHTML = "";  //limpia la visualización de datos
  dato.value=""; //para que se limpie el cuadro de texto otra vez
  i = 0; //reinicia el contador;

}
