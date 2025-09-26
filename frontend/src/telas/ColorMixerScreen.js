import React, { useState } from "react";
import './ColorMixerScreen.css';
import PaintSplash from '../assets/paint_splash.jsx';
import gameInterfaceImage from '../assets/spray-smile-lab.png'; 
import brickWallImage from '../assets/parede_tijolo.png';

function ColorMixerScreen() {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const mixedColor = `rgb(${red}, ${green}, ${blue})`;
  const redColor = `rgb(${red}, 0, 0)`;
  const greenColor = `rgb(0, ${green}, 0)`;
  const blueColor = `rgb(0, 0, ${blue})`;

  return (
    <div 
      className="game-screen-background" 
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      {/* Container principal ocupando tela cheia */}
      <div 
        className="mixer-container" 
        style={{ backgroundImage: `url(${gameInterfaceImage})` }}
      >
        {/* Círculos de cores */}
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

        {/* Sliders */}
        <input
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={(e) => setRed(parseInt(e.target.value, 10))}
          className="slider slider-red"
          style={{ '--thumb-color': redColor }}
        />
        <input
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={(e) => setGreen(parseInt(e.target.value, 10))}
          className="slider slider-green"
          style={{ '--thumb-color': greenColor }}
        />
        <input
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={(e) => setBlue(parseInt(e.target.value, 10))}
          className="slider slider-blue"
          style={{ '--thumb-color': blueColor }}
        />
      </div>
    </div>
  );
}

export default ColorMixerScreen;
