// ==========================
// Mostrar/Ocultar resenhas
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".detalhes-btn");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const livro = botao.closest(".livro");
      const resenha = livro.querySelector(".resenha-livro");

      if (resenha.style.display === "none" || resenha.style.display === "") {
        resenha.style.display = "block";
        botao.textContent = "Ocultar detalhes";
      } else {
        resenha.style.display = "none";
        botao.textContent = "Ver mais detalhes";
      }
    });
  });
});

// ==========================
// Conversor de Código Morse
// ==========================
const tabelaMorse = {
  "a": ".-","b": "-...","c": "-.-.","d": "-..","e": ".",
  "f": "..-.","g": "--.","h": "....","i": "..","j": ".---",
  "k": "-.-","l": ".-..","m": "--","n": "-.","o": "---",
  "p": ".--.","q": "--.-","r": ".-.","s": "...","t": "-",
  "u": "..-","v": "...-","w": ".--","x": "-..-","y": "-.--",
  "z": "--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-",
  "5":".....","6":"-....","7":"--...","8":"---..","9":"----.",
  " ":"/"
};
const unidade = 200; // tempo base em ms

function converterMorse() {
  const textoInput = document.getElementById("textoInput").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const resultado = document.getElementById("resultado");

  if(tipo === "texto") {
    let morse = textoInput.toLowerCase().split("").map(c => tabelaMorse[c] || "").join(" ");
    resultado.value = ""; 
    tocarMorseDigitando(morse);
  } else {
    let texto = textoInput.split(" ").map(c => {
      for(let key in tabelaMorse){
        if(tabelaMorse[key] === c) return key;
      }
      return "";
    }).join("");
    resultado.value = texto;
  }
}

function tocarMorseDigitando(morse) {
  const beep = document.getElementById("beepAudio");
  const resultado = document.getElementById("resultado");
  let delay = 0;

  for (let i = 0; i < morse.length; i++) {
    const simbolo = morse[i];

    if (simbolo === ".") {
      setTimeout(() => {
        beep.currentTime = 0;
        beep.play();
        resultado.value += ".";
      }, delay);
      delay += unidade * 2;
    } else if (simbolo === "-") {
      setTimeout(() => {
        beep.currentTime = 0;
        beep.play();
        resultado.value += "-";
      }, delay);
      delay += unidade * 4;
    } else if (simbolo === " ") {
      setTimeout(() => {
        resultado.value += " ";
      }, delay);
      delay += unidade * 3;
    } else if (simbolo === "/") {
      setTimeout(() => {
        resultado.value += " / ";
      }, delay);
      delay += unidade * 7;
    }
  }
}
