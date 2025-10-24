import React, { useState, useEffect } from 'react';
import ColoringUI from '../components/ColoringUI';
import { useColoringGame } from '../hooks/useColoringGame';
import useGameScreen from '../hooks/useGameScreen';

const MOCK_FASE_2_DATA = {
  tamanhoMatriz: [25, 25],
  textoCharada: "Pelos prédios de Nova Iorque, eu me balanço no ar. Com um traje preto e vermelho, a cidade eu vou salvar. Quem sou eu?",
  respostaCharada: "Homem Aranha",
  cores: [
    { nome: 'Azul Claro', r: 0, g: 255, b: 255 }, // 0
    { nome: 'Laranja',    r: 255, g: 128, b: 0 },   // 1
    { nome: 'Vermelho',   r: 255, g: 0, b: 0 },     // 2
    { nome: 'Preto',      r: 0, g: 0, b: 0 },       // 3
    { nome: 'Cinza',      r: 128, g: 128, b: 128 }, // 4
    { nome: 'Verde',      r: 0, g: 255, b: 0 }      // 5
  ],
  matrizCorreta: Array(25).fill(null).map(() => Array(25).fill(null))
};

function ColoringPhase2Screen() {
  const [phaseData, setPhaseData] = useState(null);
  const { handleMenuClick, MenuComponent } = useGameScreen();
  useEffect(() => { setPhaseData(MOCK_FASE_2_DATA); }, []);
  const gameLogic = useColoringGame(phaseData);
  if (!phaseData) return <div>Carregando fase 2...</div>;
  return (
    <>
      {/* 3. Renderiza o componente do menu que vem do Hook */}
      {MenuComponent}

      {/* 4. Passa a função onMenuClick para o componente da interface */}
      <ColoringUI {...gameLogic} onMenuClick={handleMenuClick} />
    </>
  );
}

export default ColoringPhase2Screen;