import React from 'react';
import './MenuModal.css'; // Criaremos este arquivo de estilo a seguir
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_menu.png';

// Este componente recebe duas funções como props:
// onContinue: para fechar o modal e continuar o jogo.
// onExit: para sair da fase e voltar à tela inicial.
function MenuModal({ onContinue, onExit }) {
  return (
    // O overlay escurece a tela de fundo para dar foco ao menu
    <div 
      className="menu-overlay" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <div 
        className="menu-modal-container" 
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        {/* Botão para continuar o jogo */}
        <button onClick={onContinue} className="menu-action-button continue-button">
          <span className="menu-button-text">Continuar</span>
        </button>

        {/* Botão para sair da fase */}
        <button onClick={onExit} className="menu-action-button exit-button">
          <span className="menu-button-text">Sair</span>
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
