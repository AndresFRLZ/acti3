import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import RestaurantCard from '../components/RestaurantCard';

const SearchRestaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); 

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults([]);
    setSearched(true);

    if (!searchTerm.trim()) {
      setError("Por favor, ingresa un nombre para buscar.");
      setLoading(false);
      return;
    }

    try {

      const lowerSearchTerm = searchTerm.toLowerCase();
      const restaurantsRef = collection(db, "restaurants");

      const q = query(restaurantsRef, where("nombreLowerCase", ">=", lowerSearchTerm), where("nombreLowerCase", "<=", lowerSearchTerm + '\uf8ff'));

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSearchResults(results);
    } catch (err) {
      setError("Error al buscar restaurantes.");
      console.error("Error searching restaurants: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Buscar Restaurantes</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de restaurante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Buscar</button>
        </div>
      </form>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Buscando...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {searched && !loading && !error && searchResults.length === 0 && (
        <p className="text-center mt-3">No se encontraron restaurantes con ese nombre.</p>
      )}

      <div className="row mt-4">
        {searchResults.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchRestaurants;