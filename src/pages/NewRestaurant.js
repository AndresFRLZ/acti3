import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const NewRestaurant = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!nombre || !descripcion || !direccion || !imagen) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "restaurants"), {
        nombre,
        nombreLowerCase: nombre.toLowerCase(), 
        descripcion,
        direccion,
        imagen,
        createdAt: new Date()
      });
      setSuccess(true);
      setNombre('');
      setDescripcion('');
      setDireccion('');
      setImagen('');
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (err) {
      setError("Error al agregar el restaurante.");
      console.error("Error adding document: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Agregar Nuevo Restaurante</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del Restaurante</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
            <input
              type="url"
              className="form-control"
              id="imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
            <small className="form-text text-muted">Por favor, ingresa una URL de imagen válida (ej: https://ejemplo.com/imagen.jpg)</small>
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {' Agregando...'}
              </>
            ) : (
              'Agregar Restaurante'
            )}
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-3" role="alert">
              ¡Restaurante agregado con éxito! Redirigiendo...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewRestaurant;