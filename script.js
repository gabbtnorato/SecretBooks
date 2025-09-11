// Mapeamento Morse
const morseCode = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....",
  "I": "..", "J": ".---", "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
  "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-",
  "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  " ": "/"
};

// Mapa inverso Morse → Texto
const textCode = Object.fromEntries(Object.entries(morseCode).map(([k,v]) => [v,k]));

// Função para tocar beep
function tocarBeep(duracao) {
  return new Promise(resolve => {
    const beep = new Audio('sounds/censor-beep-1.mp3'); // nome correto
    beep.play();
    setTimeout(resolve, duracao);
  });
}

// Função para converter texto → Morse com atualização em tempo real
async function textToMorseComSom(text) {
  text = text.toUpperCase();
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.value = ""; // limpa antes de começar
  let resultado = "";

  for (let char of text) {
    const morseChar = morseCode[char] || '';
    
    for (let symbol of morseChar) {
      resultado += symbol; // adiciona símbolo
      resultadoElement.value = resultado; // atualiza textarea

      if (symbol === ".") await tocarBeep(200);
      else if (symbol === "-") await tocarBeep(600);

      await new Promise(r => setTimeout(r, 200)); // pausa entre símbolos
    }

    resultado += " "; // espaço entre letras
    resultadoElement.value = resultado; // atualiza textarea
    await new Promise(r => setTimeout(r, 400)); // pausa entre letras
  }
}

// Função para converter Morse → Texto (sem som)
function morseParaTexto(morse) {
  return morse.split(' ').map(code => textCode[code] || '').join('');
}

// Função chamada pelo botão
function converterMorse() {
  const input = document.getElementById("textoInput").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (tipo === "texto") {
    textToMorseComSom(input); // texto e beep em tempo real
  } else {
    const resultado = morseParaTexto(input);
    document.getElementById("resultado").value = resultado;
 }
}