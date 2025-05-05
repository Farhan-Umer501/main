import React, { useState, useEffect } from 'react';
import '../login.css';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const usernameInput = form.username.value;
    const passwordInput = form.password.value;

    // Basic validations
    if (!usernameInput || !passwordInput) {
      setErrorMessage('Username and password are required!');
      return;
    }

    if (passwordInput.length < 6) {
      setErrorMessage('Password must be at least 6 characters long!');
      return;
    }

    if (!isLogin) {
      // Sign-up flow
      const nameInput = form.name.value;
      const confirmPasswordInput = form.confirmPassword.value;

      if (!nameInput || !confirmPasswordInput) {
        setErrorMessage('Full name and confirm password are required!');
        return;
      }

      if (passwordInput !== confirmPasswordInput) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      // Save user data
      localStorage.setItem(
        usernameInput,
        JSON.stringify({ passwordInput, todo: [] })
      );

      alert(`Welcome, ${nameInput}! You've signed up successfully.`);
    }
     else {
      // Login flow
      const storedData = localStorage.getItem(usernameInput);
      if (!storedData) {
        setErrorMessage('User not found!');
        return;
      }

      try {
        const parsedUser = JSON.parse(storedData);
       
        if (parsedUser.passwordInput === passwordInput) {
          setErrorMessage('Login successfully');
          localStorage.setItem('username', usernameInput); // For session tracking
          navigate('/todo'); // 👈 Update with your route after login
        } else {
          setErrorMessage('Incorrect password!');
        }
      } catch (err) {
        setErrorMessage('User data corrupted!');
      }
    }

    setUsername(usernameInput);
    form.reset();
  };

  return (
    <div className="image-bg" >
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="auth-container max-w-sm w-full">
        <h3 className="text-yellow-400 text-2xl text-center mb-6">
       
        </h3>

        <form id="authForm" onSubmit={handleSubmit}>
          <h1 className="login-h1"><strong>{isLogin ? 'Login' : 'Sign Up'}</strong></h1>

          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                <p className="p">Full name</p>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                className="auth-input mb-4"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-white mb-2">
              <p className="p">Username</p>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              className="auth-input mb-4"
              required
            />

            <label htmlFor="password" className="block text-white mb-2">
              <p className="p">Password</p>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="auth-input mb-4"
              required
            />

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-white mb-2">
                  <p className="p">Confirm Password</p>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  className="auth-input mb-4"
                  required
                />
              </div>
            )}
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>

          {errorMessage && (
            <div id="message" className="auth-error">
              <p className="text-red-500 mt-4">{errorMessage}</p>
            </div>
          )}
        </form>

        <div className="flex items-center justify-center mt-6 space-x-2">
          <p className="text-center" style={{ color: '#fffc', padding: '5px' }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <p>
              <strong>
                <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </strong>
            </p>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Authentication;
