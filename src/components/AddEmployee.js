import React, { useState } from 'react';
import { createRecord } from '../services/recordService';

function AddEmployee({ onAdded }) {
  const [form, setForm] = useState({ name: '', email: '', position: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createRecord({ ...form, role: form.position }) // Map position to role
      .then(res => {
        onAdded(); // refresh list after adding
        setForm({ name: '', email: '', position: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="position" value={form.position} onChange={handleChange} placeholder="Position" />
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployee;
