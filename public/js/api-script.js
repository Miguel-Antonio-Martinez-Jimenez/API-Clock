let is24HourFormat = false;

// Función para actualizar el reloj
async function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    try {
        // Llamada a la API para obtener la hora actual
        const response = await fetch('/api/clock');

        if (!response.ok) {
            throw new Error('Error al obtener la hora');
        }

        const time = await response.json();

        // Asegúrate de verificar qué datos estás recibiendo
        console.log('Hora obtenida:', time); // Añadir esto para ver la respuesta

        // Formato de la hora
        let hours = time.hours < 10 ? '0' + time.hours : time.hours; // Cambia response.body.hours a time.hours
        const minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes;
        const seconds = time.seconds < 10 ? '0' + time.seconds : time.seconds;
        const ampm = is24HourFormat ? '' : time.ampm;

        // Actualiza el contenido del reloj
        clockElement.innerText = `${hours}:${minutes}:${seconds}${ampm}`;

        // Actualiza la fecha
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        dateElement.innerText = now.toLocaleDateString('es-ES', options);
    } catch (error) {
        console.error('Error al obtener la hora:', error);
        clockElement.innerText = 'Error al cargar hora';
    }
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