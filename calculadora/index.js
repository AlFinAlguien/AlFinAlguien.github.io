const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");//todos los números
const botonesOperadores = document.querySelectorAll(".operador");//todos los botonesOperadores

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
  boton.addEventListener("click", () => display.agregarNumero(boton.innerHTML));
});
//se poe un escuchador de eventos en cada botón. Al presionarlo se pasa como argumento al método
//"agregarNumero()" el inner.HTML del bóton respectivo (el contenido de la etiqueta)

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
});
//utilizo values y no innerHTML porque necesito que el nombre sea igual al que está en la clase de "Calculadora.js"
