import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuModal from '../components/MenuModal'; // Importamos o modal que já criamos

// Este é o nosso Hook personalizado
export default function useGameScreen() {
  const navigate = useNavigate();

  // 1. A lógica de estado do menu agora vive aqui, de forma centralizada.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. As funções de controle também estão aqui.
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleContinueGame = () => {
    setIsMenuOpen(false);
  };

  const handleExitGame = () => {
    navigate('/');
  };

  // 3. O Hook retorna um componente já pronto para ser renderizado.
  //    Ele só renderiza o MenuModal se isMenuOpen for verdadeiro.
  const MenuComponent = isMenuOpen ? (
    <MenuModal 
      onContinue={handleContinueGame} 
      onExit={handleExitGame} 
    />
  ) : null;

  // 4. Retornamos a função para abrir o menu e o componente do menu.
  return { 
    handleMenuClick, // A função que será passada para o botão no ColorMixer
    MenuComponent      // O componente do menu para ser renderizado na tela da fase
  };
}
