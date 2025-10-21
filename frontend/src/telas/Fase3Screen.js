//Primeira parte da Fase 3 do Jogo

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorMixer from '../components/ColorMixer';
import MascotTutorial from '../components/MascotTutorial';
import './ColorMixerScreen.css'; // Reutilizamos o mesmo estilo

// --- DADOS DA FASE 3 ---
const TUTORIAL_DIALOGUES = [
  "Incrível! Você já domina as cores primárias e secundárias.",
  "Agora o desafio é maior. Vamos trabalhar com tons e nuances.",
  "Preste atenção nas porcentagens. Você consegue!"
];

// Convertendo as porcentagens para valores RGB (0-255)
const FASE_3_CORES = [
  { nome: 'Rosa Claro',   r: 255, g: 191, b: 191 }, // R:100%, G:75%, B:75%
  { nome: 'Cinza',        r: 128, g: 128, b: 128 }, // R:50%, G:50%, B:50%
  { nome: 'Azul Turquesa',r: 128, g: 191, b: 191 }, // R:50%, G:75%, B:75%
  { nome: 'Lilás',        r: 191, g: 128, b: 191 }, // R:75%, G:50%, B:75%
  { nome: 'Salmão',       r: 191, g: 64,  b: 64  }, // R:75%, G:25%, B:25%
  { nome: 'Marrom',       r: 153, g: 102, b: 38  }  // R:60%, G:40%, B:15%
];

const TOLERANCIA = 25;
const TEMPO_DICA_MS = 8000;

function Fase3Screen() {
  const navigate = useNavigate();
  // A lógica de estados é idêntica às fases anteriores
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

  const targetColor = FASE_3_CORES[currentColorIndex];

  // Todos os useEffects e funções de handle são idênticos
  useEffect(() => {
    clearTimeout(hintTimerRef.current);
    setShowHints(false);
    if (!isTutorialActive && !isColorMatch) {
      hintTimerRef.current = setTimeout(() => {
        setShowHints(true);
      }, TEMPO_DICA_MS);
    }
    return () => clearTimeout(hintTimerRef.current);
  }, [red, green, blue, currentColorIndex, isTutorialActive, isColorMatch]);

  useEffect(() => {
    if (showHints && targetColor) {
      const directions = {};
      if (red < targetColor.r - TOLERANCIA) directions.red = 'right'; else if (red > targetColor.r + TOLERANCIA) directions.red = 'left'; else directions.red = null;
      if (green < targetColor.g - TOLERANCIA) directions.green = 'right'; else if (green > targetColor.g + TOLERANCIA) directions.green = 'left'; else directions.green = null;
      if (blue < targetColor.b - TOLERANCIA) directions.blue = 'right'; else if (blue > targetColor.b + TOLERANCIA) directions.blue = 'left'; else directions.blue = null;
      setHintDirections(directions);
    } else {
      setHintDirections({ red: null, green: null, blue: null });
    }
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
      if (redMatch && greenMatch && blueMatch) setIsColorMatch(true);
      else setIsColorMatch(false);
    }
  }, [red, green, blue, targetColor, isTutorialActive]);

  const handleNextColor = () => {
    setCompletedColors([...completedColors, targetColor]);
    const nextIndex = currentColorIndex + 1;
    if (nextIndex < FASE_3_CORES.length) {
      setCurrentColorIndex(nextIndex);
    } else {
      alert("VOCÊ VENCEU! Você é um verdadeiro artista!");
      navigate('/'); 
    }
  };

  return (
    <>
      <ColorMixer
        red={red} setRed={setRed} green={green} setGreen={setGreen} blue={blue} setBlue={setBlue}
        redColor={redColor} greenColor={greenColor} blueColor={blueColor} mixedColor={mixedColor}
        completedColors={completedColors} targetColor={targetColor}
        isColorMatch={isColorMatch && !isTutorialActive} onNextColor={handleNextColor}
        currentColorIndex={currentColorIndex}
        hintDirections={hintDirections}
        totalColors={FASE_3_CORES.length}
      />
      {isTutorialActive && (
        <MascotTutorial 
          dialogues={TUTORIAL_DIALOGUES} 
          onTutorialEnd={handleTutorialEnd} 
        />
      )}
    </>
  );
}

export default Fase3Screen;