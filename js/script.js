//Declarando as variáveis vinculando ao Id do html
const btnCheck = document.getElementById("btnCheck");
const tip = document.getElementById("tip");
const check = document.getElementById("check");
const restart = document.getElementById("restart");
const display_0 = document.getElementById("display-0");
const display_1 = document.getElementById("display-1");
const display_2 = document.getElementById("display-2");
//Declarando variáveis globais
var returnError;
var fullNumber;

//Fazendo requisição na api e armazenando nas variáveis declaradas
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
        check.value = returnError;
        tip.innerHTML = '<span class="wrong">ERRO</span>';
        check.disabled = true;
        btnCheck.disabled = true;
        btnCheck.className = "button disable";
        check.className = "input disable";
        restart.innerHTML =
          '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
        restart.addEventListener("click", reiniciar);
        setdisplays();

        console.log("returnError - fetch", returnError);
      } else {
        fullNumber = result.value;
        console.log("fullNumber - fetch", fullNumber);
      }
    })
    .catch((error) => console.log("error", error));
}

//Função para fazer a requisição no momento que carrega a página
window.onload = function () {
  getNumber();
};

//Função para setar o display
function setdisplays() {
  var number = check.value ? check.value : 0;
  //Variável declarada para injetar a classe no momento que receber o numero do input
  var baseClass = "display-container display-size-12 display-no-";

  console.log("number", number);

  //Transformando o numero em string e depois em array
  let numberCharacthers = number.toString().split("");
  console.log("numberCharacthers", numberCharacthers);

  //Antes de injetar o numero na classe é feita uma verificação se possui numero ou não
  //Dessa forma só irá aparecer o led que contem numero
  display_0.className = numberCharacthers[0]
    ? baseClass + numberCharacthers[0]
    : baseClass + "none";
  display_1.className = numberCharacthers[1]
    ? baseClass + numberCharacthers[1]
    : baseClass + "none";
  display_2.className = numberCharacthers[2]
    ? baseClass + numberCharacthers[2]
    : baseClass + "none";
}

//Função para reiniciar a aplicação
function reiniciar() {
  check.disabled = false;
  btnCheck.disabled = false;
  restart.innerHTML = "&nbsp";
  tip.innerHTML = "&nbsp";
  check.value = ""; //setando inicial
  btnCheck.className = "button";
  check.className = "input";
  getNumber();
  setdisplays();
}

//Variável que pega o form do html
const formAdivinha = document.getElementById("form");
//Função dispara quando há algum submit no form
formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("fullNumber", fullNumber);
  console.log("check.value", check.value);
  console.log("event", event.target.elements.check.value);
  setdisplays();
  //Se o numero que veio na API for igual o numero digitado entra nessa condição

  if (fullNumber == check.value) {
    tip.innerHTML = '<span class="correct">Você acertou!!!!</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
    //Se o numero que veio na API for maior que o numero digitado entra nessa condição
  } else if (fullNumber > check.value) {
    tip.innerHTML = '<span class="tip-game">É maior</span>';
    //Se o numero que veio na API for menor que o numero digitado entra nessa condição
  } else if (fullNumber < check.value) {
    tip.innerHTML = '<span  class="tip-game">É menor</span>';
  }
  //O check.value é chamado para que toda vez que é feito o submit ele apaga o campo
  check.value = "";
});
