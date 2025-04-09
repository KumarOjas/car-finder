import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Wishlist from './pages/Wishlist';
import { useContext } from 'react';
import { WishlistContext } from './context/WishlistContext';
import { ThemeContext } from './context/ThemeContext';
import { HeartFill, MoonFill, SunFill } from 'react-bootstrap-icons';

function App() {
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Car Finder</Link>
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="btn btn-outline-secondary"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <SunFill /> : <MoonFill />}
            </button>
            <Link to="/wishlist" className="btn btn-outline-primary position-relative">
              <HeartFill className="me-1" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
