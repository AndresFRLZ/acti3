import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={restaurant.imagen} className="card-img-top" alt={restaurant.nombre} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <h5 className="card-title">{restaurant.nombre}</h5>
          <p className="card-text">{restaurant.descripcion}</p>
          <p className="card-text"><small className="text-muted">{restaurant.direccion}</small></p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;