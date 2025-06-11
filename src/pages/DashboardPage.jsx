import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DashboardPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('subs') || '[]');
    setSubscriptions(stored);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta suscripción será eliminada permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = subscriptions.filter((s) => s.id !== id);
        localStorage.setItem('subs', JSON.stringify(updated));
        setSubscriptions(updated);
        Swal.fire('Eliminado', 'La suscripción ha sido eliminada.', 'success');
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  return (
    <div>
      <h2>Mis Suscripciones</h2>
      <button onClick={() => navigate('/add')}>Agregar nueva</button>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <div style={{ marginTop: '1rem' }}>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="subscription-card">
              <p><strong>Servicio:</strong> {sub.name}</p>
              <p><strong>Categoría:</strong> {sub.category}</p>
              <p><strong>Costo:</strong> ${sub.cost}</p>
              <p><strong>Renovación:</strong> {sub.renewalDate}</p>
              <button onClick={() => navigate(`/edit/${sub.id}`)} style={{ marginRight: '8px' }}>Editar</button>
              <button onClick={() => handleDelete(sub.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No tienes suscripciones guardadas.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
