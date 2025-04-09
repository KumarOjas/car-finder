import { useState } from 'react';

const Filters = ({ filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="BMW">BMW</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
          <select
            value={filters.fuelType}
            onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seating</label>
          <select
            value={filters.seating}
            onChange={(e) => setFilters({ ...filters, seating: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Any</option>
            <option value="2">2 Seater</option>
            <option value="4">4 Seater</option>
            <option value="5">5 Seater</option>
            <option value="7">7 Seater</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
