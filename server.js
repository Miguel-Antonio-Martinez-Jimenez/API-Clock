const express = require('express');
const path = require('path');
const app = express();
const port = 4008;

// Middleware para servir archivos estáticos (js y css)
app.use(express.static('public')); // Asegúrate de que 'public' contenga los archivos js y css

// Endpoint para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para obtener la hora actual
app.get('/api/clock', (req, res) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const time = {
        hours: hours % 12 || 12, // Convierte a formato de 12 horas
        minutes: minutes,
        seconds: seconds,
        ampm: ampm
    };

    res.json(time);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});