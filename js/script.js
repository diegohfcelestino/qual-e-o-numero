const jogoAdivinha = {
  //colocar o numero que vem da API
  semente: 3,
  tentativa: 0,
  numeroSorteado: function geraValorAleatorio() {
    return Math.round(Math.random() * this.semente);
  },
};

const btnCheck = document.getElementById("btnCheck");
const tip = document.getElementById("tip");
const check = document.getElementById("check");
const restart = document.getElementById("restart");

let numeroSorteado = jogoAdivinha.numeroSorteado();

var currentdisplayNo = 0;

var display = document.getElementById("display");

var display_0 = document.getElementById("display-0");
var display_1 = document.getElementById("display-1");
var display_2 = document.getElementById("display-2");

function setdisplays() {
  var number = jogoAdivinha();

  var baseClass = "display-container display-size-12 display-no-";

  display_0.className = baseClass + number[0];
  display_1.className = baseClass + number[0];
  display_2.className = baseClass + number[0];
}

function reiniciar() {
  btnCheck.innerText = "Enviar";
  check.disabled = false;
  check.value = "";
  numeroSorteado = jogoAdivinha.numeroSorteado();
  btnCheck.removeEventListener("click", reiniciar);
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (numeroSorteado == check.value) {
    tip.innerHTML = '<span style="color:#00C853">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.innerText = "Nova Partida";
    btnCheck.addEventListener("click", reiniciar);
  } else if (numeroSorteado > check.value) {
    tip.innerText = "É maior";
  } else if (numeroSorteado < check.value) {
    tip.innerText = "É menor";
  }
});
