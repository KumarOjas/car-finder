import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CarList from '../components/CarList';
import { fetchCars } from '../utils/api';


const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: [0, 100000],
    fuelType: '',
    seating: ''
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const searchQuery = searchParams.get('q') || '';
        const data = await fetchCars({
          ...filters,
          q: searchQuery
        });
        setCars(data);
        setError(null);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters, searchParams]);



  return (
    <div className="container py-5">
      <h1 className="display-5 mb-5 text-center">Car Finder</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <SearchBar />
        </div>
      </div>
      <Filters filters={filters} setFilters={setFilters} />
      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading cars...</p>
        </div>
      ) : (
        <CarList cars={cars} />
      )}
    </div>
  );
};

export default Home;
