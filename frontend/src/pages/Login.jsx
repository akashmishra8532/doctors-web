import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white p-6 w-full max-w-sm rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-1">
          {state === 'Sign Up' ? 'Create Account' : 'Welcome Back!'}
        </h2>
        <p className="text-center text-gray-500 mb-4 text-sm">{state === 'Sign Up' ? 'Sign up to book an appointment' : 'Log in to continue'}</p>

        {state === 'Sign Up' && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-1.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full px-3 py-1.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 w-full px-3 py-1.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className="mt-4 text-center text-gray-600 text-sm">
          {state === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Log in here
              </span>
            </p>
          ) : (
            <p>
              Need an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
