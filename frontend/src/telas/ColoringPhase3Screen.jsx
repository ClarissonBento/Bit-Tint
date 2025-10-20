import React, { useState, useEffect } from 'react';
import ColoringUI from '../components/ColoringUI';
import { useColoringGame } from '../hooks/useColoringGame';
import useGameScreen from '../hooks/useGameScreen';

const MOCK_FASE_3_DATA = {
  tamanhoMatriz: [35, 35],
  textoCharada: "Uso um laço vermelho e não tenho boca para falar, mas espalho amizade por todo lugar. Quem sou eu?",
  respostaCharada: "Hello Kitty",
  cores: [
    { nome: 'Rosa Claro',   r: 255, g: 191, b: 191 }, // 0
    { nome: 'Cinza',        r: 128, g: 128, b: 128 }, // 1
    { nome: 'Azul Turquesa',r: 128, g: 191, b: 191 }, // 2
    { nome: 'Lilás',        r: 191, g: 128, b: 191 }, // 3
    { nome: 'Salmão',       r: 191, g: 64,  b: 64  },  // 4
    { nome: 'Marrom',       r: 153, g: 102, b: 38  }   // 5
  ],
  matrizCorreta: Array(35).fill(null).map(() => Array(35).fill(null))
};

function ColoringPhase3Screen() {
  const [phaseData, setPhaseData] = useState(null);
  const { handleMenuClick, MenuComponent } = useGameScreen();
  useEffect(() => { setPhaseData(MOCK_FASE_3_DATA); }, []);
  const gameLogic = useColoringGame(phaseData);
  if (!phaseData) return <div>Carregando fase 3...</div>;
  return (
    <>
      {/* 3. Renderiza o componente do menu que vem do Hook */}
      {MenuComponent}

      {/* 4. Passa a função onMenuClick para o componente da interface */}
      <ColoringUI {...gameLogic} onMenuClick={handleMenuClick} />
    </>
  );
}

export default ColoringPhase3Screen;