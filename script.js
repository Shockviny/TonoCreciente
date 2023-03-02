const notasMusicales = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5,
  "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11,
  "Cm": 12, "C#m": 13, "Dbm": 13, "Dm": 14, "D#m": 15, "Ebm": 15, "Em": 16, "Fm": 17,
  "F#m": 18, "Gbm": 18, "Gm": 19, "G#m": 20, "Abm": 20, "Am": 21, "A#m": 22, "Bbm": 22, "Bm": 23
};


let semiTono = 1;
let secuenciasGuardadas = [];

const subirOrebajarTono = (incremento) => {
  const secuenciaInput = document.getElementById("secuenciaInput");
  const resultadoOutput = document.getElementById("resultadoOutput");
  const secuencia = secuenciaInput.value;
  const notas = secuencia.split(" ").map(nota => {
    nota = nota.trim();
    const primeraLetra = nota.charAt(0).toUpperCase();
    const notaMayuscula = primeraLetra + nota.slice(1);
    const valorNota = notasMusicales[notaMayuscula];
    if (valorNota !== undefined) {
      let nuevoValorNota = valorNota + incremento;
      if (nuevoValorNota > 23) {
        nuevoValorNota -= 12;
      } else if (nuevoValorNota < 0) {
        nuevoValorNota += 12;
      }
      let nuevaNota = Object.keys(notasMusicales)[Object.values(notasMusicales).indexOf(nuevoValorNota)];
      if (notaMayuscula.endsWith("#")) {
        nuevaNota += "m"; // Agrega "m" si la nota original tenía "m"
      }
      return nuevaNota;
    }
    return nota;
  });
  const nuevaSecuencia = notas.join(", ");
  resultadoOutput.value = nuevaSecuencia;
};


const subirTono = () => {
  subirOrebajarTono(semiTono);
};

const bajarTono = () => {
  subirOrebajarTono(-semiTono);
};

const guardarSecuencia = () => {
  const secuenciaInput = document.getElementById("secuenciaInput");
  const secuencia = secuenciaInput.value;
  if (secuencia !== "") {
    secuenciasGuardadas.push(secuencia);
    localStorage.setItem("secuenciasGuardadas", JSON.stringify(secuenciasGuardadas)); // Guarda la lista en el almacenamiento local
    const secuenciasGuardadasSelect = document.getElementById("secuenciasGuardadasSelect");
    const option = document.createElement("option");
    option.text = secuencia;
    secuenciasGuardadasSelect.add(option);
    secuenciaInput.value = "";
    document.getElementById("resultadoOutput").value = "";
  }
};


const cargarSecuenciasGuardadas = () => {
  secuenciasGuardadas = JSON.parse(localStorage.getItem("secuenciasGuardadas")) || [];
  const secuenciasGuardadasSelect = document.getElementById("secuenciasGuardadasSelect");
  secuenciasGuardadasSelect.innerHTML = "";
  secuenciasGuardadas.forEach(secuencia => {
    const option = document.createElement("option");
    option.text = secuencia;
    secuenciasGuardadasSelect.add(option);
  });
};


const crearOtraSecuencia = () => {
  const secuenciaInput = document.getElementById("secuenciaInput");
  const resultadoOutput = document.getElementById("resultadoOutput");
  const secuencia = secuenciaInput.value;
  if (secuencia !== "") {
    guardarSecuencia();
}



const secuenciasGuardadasSelect = document.getElementById("secuenciasGuardadasSelect");
const secuenciaSeleccionada = secuenciasGuardadasSelect.options[secuenciasGuardadasSelect.selectedIndex];
const nuevaSecuencia = secuenciaSeleccionada.text;
if (nuevaSecuencia !== "") {
secuenciaInput.value = nuevaSecuencia;
resultadoOutput.value = nuevaSecuencia;
}
};



const cambiarSemitono = (valor) => {
semiTono += valor;
semiTono = Math.max(1, Math.min(11, semiTono));
document.getElementById("semiTonoOutput").innerHTML = semiTono;
};

function eliminarSecuencia() {
  var select = document.getElementById("secuenciasGuardadasSelect");
  var index = select.selectedIndex;
  if (index !== -1) {
    select.remove(index)
    const secuenciasGuardadasSelect = document.getElementById("secuenciasGuardadasSelect");
const secuencias = Array.from(secuenciasGuardadasSelect.options).map(option => option.text);
localStorage.setItem("secuenciasGuardadas", JSON.stringify(secuencias));
;
  }
}


window.addEventListener('load', () => {
  cargarSecuenciasGuardadas();

});
