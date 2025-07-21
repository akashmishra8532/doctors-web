import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Sign Up') {
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

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white p-8 w-full max-w-sm rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl flex flex-col gap-5">
                
                {/* Optional Logo */}
                <div className="flex justify-center mb-2">
                    <img src={assets.logo} alt="logo" className="w-28" />
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    {state === 'Sign Up' ? 'Create Account' : 'Welcome Back!'}
                </h2>
                <p className="text-center text-gray-500 text-sm mb-4">
                    {state === 'Sign Up' ? 'Sign up to book appointments' : 'Login to continue'}
                </p>

                {state === 'Sign Up' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="yourname@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition text-sm"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>

                <div className="mt-3 text-center text-gray-600 text-sm">
                    {state === 'Sign Up' ? (
                        <p>
                            Already have an account?{' '}
                            <span
                                onClick={() => setState('Login')}
                                className="text-primary font-medium cursor-pointer hover:underline"
                            >
                                Log in here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Need an account?{' '}
                            <span
                                onClick={() => setState('Sign Up')}
                                className="text-primary font-medium cursor-pointer hover:underline"
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
