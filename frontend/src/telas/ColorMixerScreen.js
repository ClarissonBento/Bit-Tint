import React, { useState } from "react";
import './ColorMixerScreen.css';
import PaintSplash from '../assets/paint_splash.jsx';
import gameInterfaceImage from '../assets/spray-smile-lab.png'; 
import brickWallImage from '../assets/parede_tijolo.png';

function ColorMixerScreen() {
  const [red, setRed] = useState(255); // Valor inicial para vermelho
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const mixedColor = `rgb(${red}, ${green}, ${blue})`;
  const redColor = `rgb(${red}, 0, 0)`;
  const greenColor = `rgb(0, ${green}, 0)`;
  const blueColor = `rgb(0, 0, ${blue})`;

  return (
    <div className="game-screen-background" style={{ backgroundImage: `url(${brickWallImage})` }}>
      {/* Mantemos seu container original com a imagem da interface como fundo */}
      <div className="mixer-container" style={{ backgroundImage: `url(${gameInterfaceImage})` }}>
        
        {/* --- MUDANÇA 1: Círculos trocados por SVGs --- */}
        {/* Usamos as mesmas divs e classes para manter o posicionamento exato */}
        <div className="color-circle circle-1">
          <PaintSplash color={redColor} />
        </div>
        <div className="color-circle circle-2">
          <PaintSplash color={greenColor} />
        </div>
        <div className="color-circle circle-3">
          <PaintSplash color={blueColor} />
        </div>
        <div className="color-circle result-circle">
          <PaintSplash color={mixedColor} />
        </div>

        {/* --- MUDANÇA 2: Sliders recebem o estilo para a cor da bolinha --- */}
        <input
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={(e) => setRed(parseInt(e.target.value, 10))}
          className="slider slider-red"
          style={{ '--thumb-color': redColor }} // Adicionado
        />
        <input
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={(e) => setGreen(parseInt(e.target.value, 10))}
          className="slider slider-green"
          style={{ '--thumb-color': greenColor }} // Adicionado
        />
        <input
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={(e) => setBlue(parseInt(e.target.value, 10))}
          className="slider slider-blue"
          style={{ '--thumb-color': blueColor }} // Adicionado
        />
      </div>
    </div>
  );
}

export default ColorMixerScreen;