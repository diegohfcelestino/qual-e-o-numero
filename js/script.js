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

var display_0 = document.getElementById("display-0");
var display_1 = document.getElementById("display-1");
var display_2 = document.getElementById("display-2");

function setdisplays() {
  var number = jogoAdivinha();

  var baseClass = "display-container display-size-12 display-no-";

  display.className = baseClass + number[0];

  display_0.className = baseClass + number[0];
  display_1.className = baseClass + number[0];
  display_2.className = baseClass + number[0];

  document.body.style.backgroundColor = "#" + (s + m + h).toString(16);
}

function reiniciar() {
  check.disabled = false;
  restart.disabled = true;
  check.value = "";
  numeroSorteado = jogoAdivinha.numeroSorteado();
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (numeroSorteado == check.value) {
    tip.innerHTML = '<span style="color:#00C853">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    restart.innerHTML = '<button style="color:#5c5958">Nova Partida</button>';
    restart.addEventListener("click", reiniciar);
  } else if (numeroSorteado > check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É maior</span>';
  } else if (numeroSorteado < check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É menor</span>';
  }
});
