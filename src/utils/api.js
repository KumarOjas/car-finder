import axios from 'axios';
import { mockCars } from './mockCars';

const API_URL = 'https://my-json-server.typicode.com/your-repo/car-finder-api/cars';

const filterCars = (cars, filters) => {
  const { brand, priceRange, fuelType, seating, q } = filters;
  const searchTerm = q?.toLowerCase() || '';
  
  return cars.filter(car => {
    const matchesBrand = !brand || car.brand.toLowerCase() === brand.toLowerCase();
    const matchesPrice = (!priceRange || 
      (car.price >= (priceRange[0] || 0) && 
       car.price <= (priceRange[1] || Infinity)));
    const matchesFuel = !fuelType || car.fuelType.toLowerCase() === fuelType.toLowerCase();
    const matchesSeating = !seating || car.seating.toString() === seating.toString();
    const matchesSearch = !searchTerm || 
      car.name.toLowerCase().includes(searchTerm) || 
      car.brand.toLowerCase().includes(searchTerm);

    return matchesBrand && matchesPrice && matchesFuel && matchesSeating && matchesSearch;
  });
};

export const fetchCars = async (filters = {}) => {
  try {
    const { brand, priceRange, fuelType, seating, q } = filters;
    const response = await axios.get(API_URL, {
      params: {
        brand: brand || undefined,
        price_gte: priceRange?.[0] || undefined,
        price_lte: priceRange?.[1] || undefined,
        fuelType: fuelType || undefined,
        seating: seating || undefined,
        q: q || undefined
      }
    });
    return response.data;
  } catch (error) {
    console.error('Using mock data due to API error:', error);
    return filterCars(mockCars, filters);
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Using mock data due to API error:', error);
    return mockCars.find(car => car.id.toString() === id.toString()) || null;
  }
};
