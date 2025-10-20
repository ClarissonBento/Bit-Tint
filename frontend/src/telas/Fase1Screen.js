import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorMixer from '../components/ColorMixer';
import MascotTutorial from '../components/MascotTutorial';
import './ColorMixerScreen.css';

// Constantes do Jogo
const TUTORIAL_DIALOGUES = [
  "Olá -nickname- eu sou o LilTint, que bom que você chegou pra me ajudar com meus grafites.",
  "Minhas tintas acabaram, nessa primeira parte você pode me ajudar a misturar novas cores?",
  "Tenho essas tintas Vermelha, Azul e Verde, as tintas que formam as cores no seu computador, misturando elas podemos criar qualquer cor!",
  "Construa a cor azul, colocando sua tonalidade no máximo e zerando as outras duas cores, vermelho e verde."
];

const FASE_1_CORES = [ 
  { nome: 'Azul', r: 0, g: 0, b: 255 }, 
  { nome: 'Verde', r: 0, g: 255, b: 0 }, 
  { nome: 'Rosa Magenta', r: 255, g: 0, b: 255 }, 
  { nome: 'Preto', r: 0, g: 0, b: 0 } 
];

const TOLERANCIA = 25;
const TEMPO_DICA_MS = 10000; 

function Fase1Screen() {
  const navigate = useNavigate();
  const [isTutorialActive, setIsTutorialActive] = useState(true);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [completedColors, setCompletedColors] = useState([]);
  const [isColorMatch, setIsColorMatch] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hintDirections, setHintDirections] = useState({ red: null, green: null, blue: null });
  const hintTimerRef = useRef(null);
  const [interstitialDialogue, setInterstitialDialogue] = useState(null);

  const targetColor = FASE_1_CORES[currentColorIndex];

  useEffect(() => {
    clearTimeout(hintTimerRef.current);
    setShowHints(false);
    if (!isTutorialActive && !isColorMatch && !interstitialDialogue) {
      hintTimerRef.current = setTimeout(() => { setShowHints(true); }, TEMPO_DICA_MS);
    }
    return () => clearTimeout(hintTimerRef.current);
  }, [red, green, blue, currentColorIndex, isTutorialActive, isColorMatch, interstitialDialogue]);

  useEffect(() => {
    if (showHints && targetColor) {
      const directions = {};
      if (red < targetColor.r - TOLERANCIA) directions.red = 'right'; else if (red > targetColor.r + TOLERANCIA) directions.red = 'left'; else directions.red = null;
      if (green < targetColor.g - TOLERANCIA) directions.green = 'right'; else if (green > targetColor.g + TOLERANCIA) directions.green = 'left'; else directions.green = null;
      if (blue < targetColor.b - TOLERANCIA) directions.blue = 'right'; else if (blue > targetColor.b + TOLERANCIA) directions.blue = 'left'; else directions.blue = null;
      setHintDirections(directions);
    } else { setHintDirections({ red: null, green: null, blue: null }); }
  }, [showHints, targetColor, red, green, blue]);
  
  const handleTutorialEnd = () => setIsTutorialActive(false);
  const mixedColor = `rgb(${red}, ${green}, ${blue})`;
  const redColor = `rgb(${red}, 0, 0)`;
  const greenColor = `rgb(0, ${green}, 0)`;
  const blueColor = `rgb(0, 0, ${blue})`;

  useEffect(() => {
    if (!isTutorialActive && targetColor) {
      const redMatch = (red >= targetColor.r - TOLERANCIA) && (red <= targetColor.r + TOLERANCIA);
      const greenMatch = (green >= targetColor.g - TOLERANCIA) && (green <= targetColor.g + TOLERANCIA);
      const blueMatch = (blue >= targetColor.b - TOLERANCIA) && (blue <= targetColor.b + TOLERANCIA);
      if (redMatch && greenMatch && blueMatch) setIsColorMatch(true); else setIsColorMatch(false);
    }
  }, [red, green, blue, targetColor, isTutorialActive]);

  const handleCloseDialogue = () => {
    setInterstitialDialogue(null);
    const nextIndex = currentColorIndex + 1;
    if (nextIndex < FASE_1_CORES.length) {
      setCurrentColorIndex(nextIndex);
    }
  };

  const handleNextColor = () => {
    setCompletedColors([...completedColors, targetColor]);
    setIsColorMatch(false);
    
    if (currentColorIndex === 0) {
      setInterstitialDialogue("Muito bem! Agora construa as cores que aparecem aqui no topo, começando pelo verde!");
      return;
    }
    
    const nextIndex = currentColorIndex + 1;
    if (nextIndex < FASE_1_CORES.length) {
      setCurrentColorIndex(nextIndex);
    } else {
      alert("Parabéns, você completou a Fase 1!");
      navigate('/fase-2');
    }
  };

  return (
    <>
      <ColorMixer
        red={red} setRed={setRed} green={green} setGreen={setGreen} blue={blue} setBlue={setBlue}
        redColor={redColor} greenColor={greenColor} blueColor={blueColor} mixedColor={mixedColor}
        completedColors={completedColors} targetColor={targetColor}
        isColorMatch={isColorMatch && !isTutorialActive && !interstitialDialogue}
        onNextColor={handleNextColor}
        currentColorIndex={currentColorIndex}
        hintDirections={hintDirections}
        totalColors={FASE_1_CORES.length}
      />
      
      {isTutorialActive && (
        <MascotTutorial 
          dialogues={TUTORIAL_DIALOGUES} 
          onTutorialEnd={handleTutorialEnd} 
        />
      )}
      {interstitialDialogue && (
        <MascotTutorial 
          dialogues={[interstitialDialogue]}
          onTutorialEnd={handleCloseDialogue}
        />
      )}
    </>
  );
}

export default Fase1Screen;