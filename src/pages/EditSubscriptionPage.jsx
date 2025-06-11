import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState({
    name: '',
    cost: '',
    category: '',
    renewalDate: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('subs') || '[]');
    const found = stored.find((sub) => sub.id === parseInt(id));
    if (found) {
      setSubscription(found);
    } else {
      Swal.fire('Error', 'Suscripción no encontrada.', 'error');
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.name === 'cost' ? parseFloat(e.target.value) : e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('subs') || '[]');
    const updated = stored.map((sub) =>
      sub.id === parseInt(id) ? subscription : sub
    );
    localStorage.setItem('subs', JSON.stringify(updated));

    Swal.fire('Actualizado', 'La suscripción ha sido modificada correctamente.', 'success');
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Editar Suscripción</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del servicio"
          value={subscription.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="cost"
          placeholder="Costo mensual"
          value={subscription.cost}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={subscription.category}
          onChange={handleChange}
          required
        /><br />
        <input
          type="date"
          name="renewalDate"
          value={subscription.renewalDate}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditSubscriptionPage;
