import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';
import { fetchCarById } from '../utils/api';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true);
        const data = await fetchCarById(id);
        setCar(data);
        setError(null);
      } catch (err) {
        setError('Failed to load car details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCar();
  }, [id]);


  if (loading) return <p className="text-center py-8">Loading car details...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!car) return <p className="text-center py-8">Car not found</p>;


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <WishlistButton car={car} />
          </div>
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold">Brand:</span> {car.brand}</p>
            <p><span className="font-semibold">Price:</span> ${car.price}</p>
            <p><span className="font-semibold">Fuel Type:</span> {car.fuelType}</p>
            <p><span className="font-semibold">Seating:</span> {car.seating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
