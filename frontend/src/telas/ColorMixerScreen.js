import React, { useState } from "react";
import './ColorMixerScreen.css';
import gameInterfaceImage from '../assets/spray-smile-lab.png'; 
// MUDANÇA AQUI: Importamos a imagem de tijolos para usar no novo div de fundo
import brickWallImage from '../assets/parede_tijolo.png'; // Verifique a extensão correta (.png, .jpeg, etc.)

function ColorMixerScreen() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const mixedColor = `rgb(${red}, ${green}, ${blue})`;
  const redColor = `rgb(${red}, 0, 0)`;
  const greenColor = `rgb(0, ${green}, 0)`;
  const blueColor = `rgb(0, 0, ${blue})`;

  return (
    // NOVO DIV AQUI: Este será o fundo de tijolos APENAS para esta tela
    <div className="game-screen-background" style={{ backgroundImage: `url(${brickWallImage})` }}>

      {/* O mixer-container e seus filhos permanecem como estão */}
      <div className="mixer-container" style={{ backgroundImage: `url(${gameInterfaceImage})` }}>
        
        {/* Círculos de Cores */}
        <div className="color-circle circle-1" style={{ backgroundColor: redColor }}></div>
        <div className="color-circle circle-2" style={{ backgroundColor: greenColor }}></div>
        <div className="color-circle circle-3" style={{ backgroundColor: blueColor }}></div>
        <div className="color-circle result-circle" style={{ backgroundColor: mixedColor }}></div>

        {/* Sliders de Controle */}
        <input
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={(e) => setRed(parseInt(e.target.value, 10))}
          className="slider slider-red"
        />
        <input
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={(e) => setGreen(parseInt(e.target.value, 10))}
          className="slider slider-green"
        />
        <input
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={(e) => setBlue(parseInt(e.target.value, 10))}
          className="slider slider-blue"
        />
      </div>

    </div> // Fim do novo div de fundo
  );
}

export default ColorMixerScreen;