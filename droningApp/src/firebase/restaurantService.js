import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig.js';

// Datos fijos para restaurantes en Rosario, incluyendo direcciones predeterminadas
const restaurantLocations = [
  { name: 'Restaurante A', cuisine: 'Italiana', address: 'Córdoba 1234', latitude: -32.945, longitude: -60.655, isOpen: true },
  { name: 'Restaurante B', cuisine: 'Japonesa', address: 'Santa Fe 5678', latitude: -32.946, longitude: -60.658, isOpen: false },
  { name: 'Restaurante C', cuisine: 'Mexicana', address: 'San Lorenzo 9101', latitude: -32.947, longitude: -60.660, isOpen: true },
  { name: 'Restaurante D', cuisine: 'Argentina', address: 'Pellegrini 1121', latitude: -32.944, longitude: -60.662, isOpen: false },
  { name: 'Restaurante E', cuisine: 'Francesa', address: 'Rivadavia 3141', latitude: -32.948, longitude: -60.657, isOpen: true },
];

const addRestaurants = async () => {
  const restaurantsRef = collection(firestore, 'restaurants');

  // Obtener el ID más alto de los restaurantes existentes
  const q = query(restaurantsRef, orderBy('id', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);

  let nextId = 1; // Valor predeterminado para el primer restaurante

  if (!querySnapshot.empty) {
    const lastDoc = querySnapshot.docs[0];
    const lastId = parseInt(lastDoc.id.split('-')[1], 10);
    nextId = lastId + 1;
  }

  for (const location of restaurantLocations) {
    const restaurantId = `restaurant-${nextId++}`;
    const restaurant = { id: restaurantId, ...location };

    try {
      await addDoc(restaurantsRef, restaurant);
      console.log(`Restaurante ${restaurant.id} agregado`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

// Ejecutar la función para agregar restaurantes
addRestaurants().catch(console.error);
