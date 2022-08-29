var valorA = document.getElementById("a");
var valorB = document.getElementById("b");
var valorC = document.getElementById("c");
var solu = document.getElementById("solu");
var calcular = document.getElementById("boton");
calcular.addEventListener("click", calculando);
var a,b,c; //para tener los valores por fuera. pd: se actulizan al dar click
var discriminante;

function calculando () {
  a = Number(valorA.value);
  b = Number(valorB.value);
  c = Number(valorC.value);
  discriminante = (b*b) - 4*a*c;

  if (discriminante>0){
    //soluciones reales
    let x1 = ((-1)*b/2*a) + Math.sqrt(discriminante)/(2*a);
    let x2 = ((-1)*b/2*a) - Math.sqrt(discriminante)/(2*a);

    //para redondear a dos cifras y de una vez convierto a texto
    let x1red = `${Math.round((x1 + Number.EPSILON) * 100) / 100}`;
    let x2red = `${Math.round((x2 + Number.EPSILON) * 100) / 100}`;

    solu.innerHTML = "SOLUCIONES REALES diferentes <br/>"+"x1 = "+x1red+"<br/>x2 = "+x2red;


  }
  else if(discriminante==0){
    //solucionres reales iguales
    let x = ((-1)*b/2*a);

    let xred = `${Math.round((x + Number.EPSILON) * 100) / 100}`;

    solu.innerHTML = "SOLUCIONES REALES iguales <br/> X = "+xred+" : multiplicidad 2 ";
  }
  else{
    //soluciones imaginarias
    let r = (-1*b/2*a);
    let i = Math.sqrt((-1)*discriminante)/(2*a);

    //para redondear a dos cifras
    let rred = `${Math.round((r + Number.EPSILON) * 100) / 100}`;
    let ired = `${Math.round((i + Number.EPSILON) * 100) / 100}`;

    solu.innerHTML = "SOLUCIONES COMPLEJAS <br/> C1 = "+rred+" + "+ired+"<b>i</b> <br/> C2 = "+rred+" - "+ired+"<b>i</b>";

  }
}
