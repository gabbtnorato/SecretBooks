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

// Unidade de tempo em ms
const unidade = 200;

function converterMorse() {
  const textoInput = document.getElementById("textoInput").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const resultado = document.getElementById("resultado");

  if(tipo === "texto") {
    let morse = textoInput.toLowerCase().split("").map(c => tabelaMorse[c] || "").join(" ");
    resultado.value = ""; // limpa o textarea
    tocarMorseDigitando(morse);
  } else {
    // Morse → Texto
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
      delay += unidade * 2; // ponto + pausa
    } else if (simbolo === "-") {
      setTimeout(() => {
        beep.currentTime = 0;
        beep.play();
        resultado.value += "-";
      }, delay);
      delay += unidade * 4; // traço + pausa
    } else if (simbolo === " ") {
      setTimeout(() => {
        resultado.value += " ";
      }, delay);
      delay += unidade * 3; // pausa entre letras
    } else if (simbolo === "/") {
      setTimeout(() => {
        resultado.value += " / ";
      }, delay);
      delay += unidade * 7; // pausa entre palavras
    }
  }
}
