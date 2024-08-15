// Importa los métodos necesarios de Firebase
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig.js';

// Coordenadas fijas para drones en Rosario
const droneLocations = [
  { id: 'drone-1', latitude: -32.945, longitude: -60.655, hasBattery: true, isInRoute: false },
  { id: 'drone-2', latitude: -32.946, longitude: -60.658, hasBattery: false, isInRoute: true },
  { id: 'drone-3', latitude: -32.947, longitude: -60.660, hasBattery: true, isInRoute: false },
  { id: 'drone-4', latitude: -32.944, longitude: -60.662, hasBattery: false, isInRoute: true },
  { id: 'drone-5', latitude: -32.948, longitude: -60.657, hasBattery: true, isInRoute: false },
];

const addDrones = async () => {
  const dronesRef = collection(firestore, 'drones');
  
  for (const drone of droneLocations) {
    try {
      await addDoc(dronesRef, drone);
      console.log(`Dron ${drone.id} agregado`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

// Ejecutar la función para agregar drones
addDrones().catch(console.error);
