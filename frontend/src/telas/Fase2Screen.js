//Primeira parte da Fase 2 do Jogo

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorMixer from '../components/ColorMixer';
import MascotTutorial from '../components/MascotTutorial';
import './ColorMixerScreen.css'; 

// --- DADOS DA FASE 2 ---
const TUTORIAL_DIALOGUES = [
  "Você mandou bem na primeira fase! Hora de dificultar um pouco.",
  "Agora vamos misturar cores secundárias. A lógica é a mesma.",
  "Fique de olho na dica de cor ali em cima. Boa sorte, artista!"
];

const FASE_2_CORES = [
  { nome: 'Azul Claro', r: 0, g: 255, b: 255 },
  { nome: 'Laranja',    r: 255, g: 128, b: 0 },
  { nome: 'Vermelho',   r: 255, g: 0, b: 0 },
  { nome: 'Preto',      r: 0, g: 0, b: 0 },
  { nome: 'Cinza',      r: 128, g: 128, b: 128 },
  { nome: 'Verde',      r: 0, g: 255, b: 0 }
];

const TOLERANCIA = 25;
const TEMPO_DICA_MS = 8000;

function Fase2Screen() {
  const navigate = useNavigate();
  // A lógica de estados é idêntica à da Fase 1
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

  const targetColor = FASE_2_CORES[currentColorIndex];

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
    if (nextIndex < FASE_2_CORES.length) {
      setCurrentColorIndex(nextIndex);
    } else {
      alert("Fase 2 Concluída! Você é um expert!");
      navigate('/Fase3_ColorMixer'); 
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
        // Nova prop para o total de cores na fase
        totalColors={FASE_2_CORES.length}
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

export default Fase2Screen;