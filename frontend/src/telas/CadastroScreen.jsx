//Tela de Cadastro

/* Ao clicar no botão "Inscrição", esse código é responsável
por criar um save dos dados registrados do aluno no 
banco de dados */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CadastroScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_cadastro.png';

function CadastroScreen() {
  const navigate = useNavigate();
  const [turma, setTurma] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCadastro = (event) => {
    event.preventDefault();
    /*Esse console serve apenas para verificar se o código está sendo executado
    corretamente, precisa ser alterado para fazer as solicitações do backend */
    console.log('Novo Cadastro:', { turma, nickname, password });
    
    alert("Cadastro realizado com sucesso! Basta Jogar!");
    navigate('/Fase1_ColorMixer'); 
  };

  return (
    <div 
      className="cadastro-screen-background" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button onClick={handleGoBack} className="cadastro-back-button" />
      
      <div 
        className="cadastro-modal-container" 
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        <form className="cadastro-form" onSubmit={handleCadastro}>
          <input 
            type="text"
            className="cadastro-input input-turma"
            placeholder="Digite sua turma..."
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            required
          />
          <input 
            type="text"
            className="cadastro-input input-nickname"
            placeholder="Digite seu nickname..."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <input 
            type="password"
            className="cadastro-input input-password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="cadastro-submit-button">
            <span className="cadastro-button-text">Cadastrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroScreen;