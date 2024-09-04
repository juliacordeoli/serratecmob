import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await fetch('YOUR_REGISTER_ENDPOINT', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          setMessage('Cadastro realizado com sucesso!');
          setTimeout(() => navigate('/login'), 2000); // Redirecionar após 2 segundos
        } else {
          console.error('Erro ao cadastrar');
        }
      } catch (error) {
        console.error('Erro ao registrar', error);
      }
    } else {
      setMessage('As senhas não coincidem');
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar-se</h2>
      <form onSubmit={handleRegister}>
        <label>
          Login:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
          </button>
        </label>
        <label>
          Confirmar Senha:
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
          </button>
        </label>
        <button type="submit">Salvar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
