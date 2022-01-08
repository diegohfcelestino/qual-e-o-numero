// const jogoAdivinha = {
//   //colocar o numero que vem da API
//   semente: 1,
//   tentativa: 1,
//   numeroSorteado: function geraValorAleatorio() {
//     return Math.round(Math.random() * this.semente);
//   },
// };

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

//Função para validar se é numero negativo
function search() {
  if (check.value < 1) {
    alert("Digitar apenas números positivos de 1 a 300");
  } else if (check.value > 300) {
    alert("Não é possível adicionar números maiores que 300");
  }
}

//Função para setar o display
function setdisplays() {
  var number = check.value ? check.value : 0;
  //Variável declarada para injetar a classe no momento que receber o numero do input
  var baseClass = "display-container display-size-12 display-no-";

  console.log("number", number);
  if (returnError) {
    number = returnError;
    console.log("number-com erro", number);
    tip.innerHTML = '<span style="color:#bf3e21">ERRO</span>';
  }
  //Transformando o numero em string e depois em array
  let numberCharacthers = number.toString().split("");
  console.log("numberCharacthers", numberCharacthers);

  //Antes de injetar o numero na classe é feita uma verificação se possui numero ou não
  //Dessa forma só irá aparecer o led que contem numero
  display_0.className = number[0] ? baseClass + number[0] : baseClass + "none";
  display_1.className = number[1] ? baseClass + number[1] : baseClass + "none";
  display_2.className = number[2] ? baseClass + number[2] : baseClass + "none";
}

//Função para reiniciar a aplicação
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

//Variável que pega o form do html
const formAdivinha = document.getElementById("form");
//Função dispara quando há algum submit no form
formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("fullNumber", fullNumber);
  console.log("check.value", check.value);
  setdisplays();
  //Se o numero que veio na API for igual o numero digitado entra nessa condição
  if (fullNumber == check.value) {
    tip.innerHTML = '<span style="color:#65bf3b">Você acertou!!</span>';
    check.disabled = true;
    btnCheck.disabled = true;
    btnCheck.className = "button disable";
    check.className = "input disable";
    restart.innerHTML =
      '<button class="btn-restart"><span class="span-nova-partida"><img class="imgRestart" src="/img/undo.svg"/>Nova Partida</spam></button>';
    restart.addEventListener("click", reiniciar);
    //Se o numero que veio na API for maior que o numero digitado entra nessa condição
  } else if (fullNumber > check.value) {
    tip.innerHTML = '<span style="color:#bf3e21">É maior</span>';
    //Se o numero que veio na API for menor que o numero digitado entra nessa condição
  } else if (fullNumber < check.value) {
    tip.innerHTML = '<span style="color:#bf3e21">É menor</span>';
  }
  //O check.value é chamado para que toda vez que é feito o submit ele apaga o campo
  check.value = "";
});
