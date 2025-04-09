import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import { MoonFill, SunFill } from 'react-bootstrap-icons';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Profile Analyzer</Link>
          <button 
            className="btn btn-outline-secondary ms-auto"
            onClick={toggleTheme}
          >
            {darkMode ? <SunFill /> : <MoonFill />}
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
