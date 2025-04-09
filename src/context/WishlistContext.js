import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('carWishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (car) => {
    if (!wishlist.some(item => item.id === car.id)) {
      setWishlist([...wishlist, car]);
    }
  };

  const removeFromWishlist = (carId) => {
    setWishlist(wishlist.filter(item => item.id !== carId));
  };

  const isInWishlist = (carId) => {
    return wishlist.some(item => item.id === carId);
  };

  return (
    <WishlistContext.Provider 
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
