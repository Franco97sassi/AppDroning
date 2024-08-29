// import { getDistance, interpolate } from 'geolib';

// // Función para calcular la distancia en metros entre dos puntos
// const calculateDistance = (pointA, pointB) => {
//   return getDistance(pointA, pointB);
// };

// // Función para dividir el trayecto en fragmentos y simular el movimiento
// const simulateFlightPath = (startCoords, endCoords, stepSize = 0.001) => {
//   const path = [];
//   const distance = calculateDistance(startCoords, endCoords);
  
//   let currentCoords = startCoords;
//   let remainingDistance = distance;

//   while (remainingDistance > stepSize) {
//     const nextCoords = interpolate(currentCoords, endCoords, stepSize / distance);
//     path.push(nextCoords);
    
//     currentCoords = nextCoords;
//     remainingDistance = calculateDistance(currentCoords, endCoords);
//   }
  
//   // Añadir la última coordenada (fin del trayecto)
//   path.push(endCoords);

//   return path;
// };

// // Ejemplo de uso
// const startCoords = { latitude: 40.712776, longitude: -74.005974 }; // Ejemplo: Nueva York
// const endCoords = { latitude: 34.052235, longitude: -118.243683 }; // Ejemplo: Los Ángeles

// const flightPath = simulateFlightPath(startCoords, endCoords);

// console.log(flightPath);
