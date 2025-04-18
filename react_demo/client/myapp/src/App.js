import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ username: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', form);
      alert('User submitted successfully!');
      setForm({ username: '', email: '' });
    } catch (err) {
      alert('Submission failed.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
