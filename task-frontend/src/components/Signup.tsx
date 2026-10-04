import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import type { SignupData } from '../types/auth';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = await signup(form);

      alert(data.message);

      if (data.message === ' user created successfully') {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h2>Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};

export default Signup;