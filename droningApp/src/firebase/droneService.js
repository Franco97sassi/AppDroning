import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig.js';

// Coordenadas fijas para drones en Rosario
const droneLocations = [
  { latitude: -32.945, longitude: -60.655, hasBattery: true, isInRoute: false },
  { latitude: -32.946, longitude: -60.658, hasBattery: false, isInRoute: true },
  { latitude: -32.947, longitude: -60.660, hasBattery: true, isInRoute: false },
  { latitude: -32.944, longitude: -60.662, hasBattery: false, isInRoute: true },
  { latitude: -32.948, longitude: -60.657, hasBattery: true, isInRoute: false },
];

const addDrones = async () => {
  const dronesRef = collection(firestore, 'drones');

  // Obtener el ID más alto de los drones existentes
  const q = query(dronesRef, orderBy('id', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  let nextId = 1; // Valor predeterminado para el primer dron

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0];
    const lastId = parseInt(lastDoc.id.split('-')[1], 10);
    nextId = lastId + 1;
  }

  for (const location of droneLocations) {
    const droneId = `drone-${nextId++}`;
    const drone = { id: droneId, ...location };

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
