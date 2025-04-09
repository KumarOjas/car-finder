import { useState } from 'react';
import CarCard from './CarCard';

import Pagination from './Pagination';

const CarList = ({ cars }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  // Get current cars
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid">
      {cars.length === 0 ? (
        <p className="text-center p-5">No cars found matching your criteria</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {currentCars.map((car) => (
              <div key={car.id} className="col">
                <CarCard car={car} />
              </div>
            ))}
          </div>
          <Pagination
            carsPerPage={carsPerPage}
            totalCars={cars.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default CarList;
