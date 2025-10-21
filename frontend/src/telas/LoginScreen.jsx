//Tela de Login

/* Ao clicar no botão de login, ele deve direcionar a esse código,
que é responsável pelo visual da tela e de fazer solicitações ao 
banco de dados, que, caso os dados inseridos estejam corretos, o jogador
é direcionado a seleção de fases */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_login.png';

function LoginScreen() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login com Nickname:', nickname, 'e Senha:', password);
    navigate('/Fase1_ColorMixer'); 
  };

  return (
    <div 
      className="login-screen-background" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button onClick={handleGoBack} className="login-back-button" />
      
      <div 
        className="login-modal-container" 
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="text"
            className="login-input input-nickname"
            placeholder="Digite seu nickname..."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input 
            type="password"
            className="login-input input-password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit-button">
            <span className="login-button-text">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;