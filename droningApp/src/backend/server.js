const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

let droneState = {
  status: 'Esperando',
  distance: 0,
  remainingTime: 0,
  traveledPath: [],
  remainingPath: []
};

app.get('/drone/status', (req, res) => {
  res.json(droneState);
});

app.post('/drone/start', (req, res) => {
  // Inicia la simulación del viaje
  droneState = {
    status: 'En camino',
    distance: 1000,
    remainingTime: 1200,
    traveledPath: [{ latitude: -32.94682, longitude: -60.63932 }],
    remainingPath: [{ latitude: -32.94682, longitude: -60.63932 }]
  };

  // Simulación simple de actualización del estado
  const interval = setInterval(() => {
    if (droneState.remainingTime <= 0) {
      clearInterval(interval);
      droneState.status = 'Completado';
      return;
    }

    droneState.remainingTime -= 1;
    droneState.distance -= 1;
    // Actualiza el traveledPath y remainingPath aquí si es necesario
  }, 1000); // Actualiza cada 1 segundo

  res.status(200).send('Simulación iniciada');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
