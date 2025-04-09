import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import CarCard from '../components/CarCard';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="container py-5">
      <h1 className="display-5 mb-5 text-center">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {wishlist.map((car) => (
            <div key={car.id} className="col">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
