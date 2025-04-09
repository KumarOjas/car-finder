import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';

const CarCard = ({ car }) => {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/car/${car.id}`}>
        <div style={{
          height: '200px',
          width: '100%',
          position: 'relative',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={car.image}
            alt={car.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              position: 'relative',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: 2
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', car.image);
              e.target.style.opacity = 1;
              const loader = e.target.parentElement.querySelector('.img-loader');
              if (loader) loader.style.display = 'none';
            }}
            onError={(e) => {
              console.error('Image failed to load:', car.image);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Car+Image';
              e.target.style.opacity = 1;
              e.target.style.objectFit = 'contain';
              const loader = e.target.parentElement.querySelector('.img-loader');
              if (loader) loader.style.display = 'none';
            }}
          />
          <div className="img-loader" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            color: '#999',
            fontSize: '14px',
            zIndex: 1
          }}>
            Loading image...
          </div>
        </div>
      </Link>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <Link to={`/car/${car.id}`} className="text-decoration-none">
            <h5 className="card-title mb-0">{car.name}</h5>
          </Link>
          <WishlistButton car={car} />
        </div>
        <div className="mt-2 text-muted small">
          <p className="mb-1">{car.brand}</p>
          <p className="text-primary fw-bold">${car.price.toLocaleString()}</p>
          <div className="d-flex justify-content-between mt-2">
            <span>{car.fuelType}</span>
            <span>{car.seating} Seats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
