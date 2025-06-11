import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSubscriptionPage = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();

    const newSub = {
      id: Date.now(),
      name,
      cost: parseFloat(cost),
      category,
      renewalDate,
    };

    const stored = JSON.parse(localStorage.getItem('subs') || '[]');
    stored.push(newSub);
    localStorage.setItem('subs', JSON.stringify(stored));

    alert('Suscripción agregada ✅');
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Agregar Nueva Suscripción</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Costo mensual"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        /><br />
        <input
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          required
        /><br />
        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate('/dashboard')}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddSubscriptionPage;
