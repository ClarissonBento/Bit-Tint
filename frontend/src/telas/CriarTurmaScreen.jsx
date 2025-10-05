//Tela Criar Turma

/*Ao clicar no botão de criar turma, esse código é resposável 
por aplicar a lógica de criação da turma e registrar no banco de dados */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CriarTurmaScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_criar_turma.png';

function CriarTurmaScreen() {
  const navigate = useNavigate();
  const [nomeTurma, setNomeTurma] = useState('');
  const [senhaAdmin, setSenhaAdmin] = useState('');

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleCriarTurma = (event) => {
    event.preventDefault();
    console.log('Nova Turma:', { nomeTurma, senhaAdmin });
    
    alert("Turma criada com sucesso!");
    navigate('/turma'); // Volta para o menu de turmas após criar
  };

  return (
    <div 
      className="criar-turma-screen-background" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button onClick={handleGoBack} className="criar-turma-back-button" />
      
      <div 
        className="criar-turma-modal-container" 
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        <form className="criar-turma-form" onSubmit={handleCriarTurma}>
          <input 
            type="text"
            className="criar-turma-input input-nome-turma"
            placeholder="Digite o nome da turma..."
            value={nomeTurma}
            onChange={(e) => setNomeTurma(e.target.value)}
            required
          />
          <input 
            type="password"
            className="criar-turma-input input-senha-admin"
            placeholder="Digite a senha do admin..."
            value={senhaAdmin}
            onChange={(e) => setSenhaAdmin(e.target.value)}
            required
          />
          <button type="submit" className="criar-turma-submit-button">
            <span className="criar-turma-button-text">Criar turma</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CriarTurmaScreen;