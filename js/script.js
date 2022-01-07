// const jogoAdivinha = {
//   //colocar o numero que vem da API
//   semente: 1,
//   tentativa: 1,
//   numeroSorteado: function geraValorAleatorio() {
//     return Math.round(Math.random() * this.semente);
//   },
// };
const btnCheck = document.getElementById("btnCheck");
const tip = document.getElementById("tip");
const check = document.getElementById("check");
const restart = document.getElementById("restart");
let fullNumber;
let returnError;

function getNumber() {
  const url =
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
  fetch(url)
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((result) => {
      if (result.StatusCode == 502) {
        returnError = result.StatusCode;
        console.log("result", returnError);
      } else {
        fullNumber = result.value;
        console.log("Aquiiiii", fullNumber);
      }
    })
    .catch((error) => console.log("error", error));
}

window.onload = function () {
  getNumber();
};

var display_0 = document.getElementById("display-0");
var display_1 = document.getElementById("display-1");
var display_2 = document.getElementById("display-2");

function setdisplays() {
  var number = check.value ? check.value : 0;

  if (returnError) {
    number = returnError;
    tip.innerHTML = '<span style="color:#ff3d00">ERRO</span>';
  }

  let numberCharacthers = number.toString().split("");
  console.log("numberCharacthers", numberCharacthers);

  var baseClass = "display-container display-size-12 display-no-";

  display_0.className = number[0] ? baseClass + number[0] : baseClass + "none";
  display_1.className = number[1] ? baseClass + number[1] : baseClass + "none";
  display_2.className = number[2] ? baseClass + number[2] : baseClass + "none";
}

function reiniciar() {
  check.disabled = false;
  btnCheck.disabled = false;
  restart.innerHTML = "&nbsp";
  tip.innerHTML = "&nbsp";
  check.value = "";
  btnCheck.className = "button";
  check.className = "input";
  getNumber();
  setdisplays();
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("fullNumber", fullNumber);
  console.log("check.value", check.value);
  setdisplays();
  if (returnError) {
    tip.innerHTML = '<span style="color:#ff3d00">ERRO</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
  } else if (fullNumber == check.value) {
    tip.innerHTML = '<span style="color:#00C853">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
  } else if (fullNumber > check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É maior</span>';
  } else if (fullNumber < check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É menor</span>';
  }
  check.value = "";
});
