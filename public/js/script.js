// js/script.js
let is24HourFormat = false;

function updateClock() {
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');

  // Obtenemos la hora actual
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Obtener el formato de hora
  let ampm = '';
  if (!is24HourFormat) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Si la hora es 0, mostrar 12
  }

  // Añadimos ceros delante si es necesario
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Actualizamos el contenido del reloj
  clockElement.innerText = `${hours}:${minutes}:${seconds}${ampm}`;

  // Actualizamos la fecha
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  dateElement.innerText = now.toLocaleDateString('es-ES', options);
}

// Alternar formato de hora
document.getElementById('toggle-format').addEventListener('click', () => {
  is24HourFormat = !is24HourFormat;
  document.getElementById('toggle-format').innerText = is24HourFormat ? 'Cambiar a 12h' : 'Cambiar a 24h';
});

// Actualizamos el reloj cada segundo
setInterval(updateClock, 1000);

// Llamamos a la función inmediatamente para mostrar la hora al cargar la página
updateClock();