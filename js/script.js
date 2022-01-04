const jogoAdivinha = {
  //colocar o numero que vem da API
  semente: 3,
  tentativa: 0,
  numeroSorteado: function geraValorAleatorio() {
    return Math.round(Math.random() * this.semente);
  },
};

const btnCheck = document.getElementById("btnCheck");
const status = document.getElementById("status");
const check = document.getElementById("check");

let numeroSorteado = jogoAdivinha.numeroSorteado();

var currentdisplayNo = 0;
var display = document.getElementById("display");

function setdisplays() {
  var number = jogoAdivinha();

  var baseClass = "display-container display-size-12 display-no-";

  display.className = baseClass + number[0];

  document.body.style.backgroundColor = "#" + (s + m + h).toString(16);
}

function reiniciar() {
  btnCheck.innerText = "Enviar";
  check.disabled = false;
  check.value = 0;
  numeroSorteado = jogoAdivinha.numeroSorteado();
  btnCheck.removeEventListener("click", reiniciar);
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (numeroSorteado == check.value) {
    status.innerHTML = '<span style="color:#00C853">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.innerText = "Nova Partida";
    btnCheck.addEventListener("click", reiniciar);
  } else if (numeroSorteado > check.value) {
    status.innerText = "É maior";
  } else if (numeroSorteado < check.value) {
    status.innerText = "É menor";
  }
});
