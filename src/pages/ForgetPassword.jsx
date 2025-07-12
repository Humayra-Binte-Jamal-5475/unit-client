
import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      return Swal.fire('Error', 'Please enter your email.', 'error');
    }

    resetPassword(email)
      .then(() => {
        Swal.fire('Success', 'Password reset email sent!', 'success');
        navigate("/auth/login")
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 shadow-md rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;