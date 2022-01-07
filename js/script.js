const jogoAdivinha = {
  //colocar o numero que vem da API
  semente: 1,
  tentativa: 1,
  numeroSorteado: function geraValorAleatorio() {
    return Math.round(Math.random() * this.semente);
  },
};

let error = false;
const btnCheck = document.getElementById("btnCheck");
const tip = document.getElementById("tip");
const check = document.getElementById("check");
const restart = document.getElementById("restart");

async function getNumber() {
  const url =
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";
  fetch(url)
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((result) => {
      if (result.StatusCode == 502) {
        error = true;
        console.log("result", result);
      } else {
        let fullNumber = result;
        console.log("Aquiiiii", fullNumber);
      }
    })
    .catch((error) => console.log("error", error));
}

let numeroSorteado = jogoAdivinha.numeroSorteado();

var currentdisplayNo = 0;

var display_0 = document.getElementById("display-0");
var display_1 = document.getElementById("display-1");
var display_2 = document.getElementById("display-2");

function setdisplays() {
  var number = check.value ? check.value : 0;

  // let numberCharacthers = fullNumber.split("");
  // numberCharacthers.forEach((number) => {
  //   const display = `display_${number}`;
  //   const el = document.getElementById(`display-${number}`);
  //   console.log("display", display);
  //   console.log("el", el);

  //   // const el = document.getElementById(`display-${index}`)
  // });

  var baseClass = "display-container display-size-12 display-no-";

  display_0.className = baseClass + number;
  display_1.className = baseClass + number;
  display_2.className = baseClass + number;
}

function reiniciar() {
  check.disabled = false;
  btnCheck.disabled = false;
  restart.innerHTML = "&nbsp";
  tip.innerHTML = "&nbsp";
  check.value = "";
  btnCheck.className = "button";
  check.className = "input";
  numeroSorteado = getNumber();
  setdisplays();
}

const formAdivinha = document.getElementById("form");

formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  setdisplays();
  console.log("numeroSorteado", numeroSorteado);
  if (error) {
    tip.innerHTML = '<span style="color:#ff3d00">ERRO</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
  } else if (numeroSorteado == check.value) {
    tip.innerHTML = '<span style="color:#00C853">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
  } else if (numeroSorteado > check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É maior</span>';
  } else if (numeroSorteado < check.value) {
    tip.innerHTML = '<span style="color:#ff3d00">É menor</span>';
  }
  check.value = "";
});
