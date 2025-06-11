import React from 'react';

const SubscriptionCard = ({ sub, onDelete, onEdit }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      width: '250px',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3>{sub.name}</h3>
      <p><strong>Categoría:</strong> {sub.category}</p>
      <p><strong>Costo mensual:</strong> ${sub.cost}</p>
      <p><strong>Renovación:</strong> {sub.renewalDate}</p>
      <button onClick={onEdit} style={{ marginRight: '10px' }}>Editar</button>
      <button onClick={() => onDelete(sub.id)}>Eliminar</button>
    </div>
  );
};

export default SubscriptionCard;
