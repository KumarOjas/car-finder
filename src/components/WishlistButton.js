import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { Heart, HeartFill } from 'react-bootstrap-icons';

const WishlistButton = ({ car }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const inWishlist = isInWishlist(car.id);

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="btn btn-link p-0"
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {inWishlist ? (
        <HeartFill color="red" size={20} />
      ) : (
        <Heart color="gray" size={20} />
      )}
    </button>
  );
};

export default WishlistButton;
