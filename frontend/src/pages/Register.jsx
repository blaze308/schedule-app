import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userType: '',
    skills: '',
    professionalTitle: '',
    hourlyRate: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUser({
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      });
      setMessage(`User ${user.user.firstName} created successfully!`);
      setError('');

    
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full border p-2"
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full border p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full border p-2"
        />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
          required
          className="w-full border p-2"
        >
          <option value="" disabled>
            Select User Type
          </option>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>
        <input
          name="skills"
          type="text"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <input
          name="professionalTitle"
          type="text"
          placeholder="Professional Title"
          value={formData.professionalTitle}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <input
          name="hourlyRate"
          type="number"
          placeholder="Hourly Rate"
          value={formData.hourlyRate}
          onChange={handleInputChange}
          className="w-full border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
