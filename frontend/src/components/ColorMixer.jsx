import React from 'react';
import PaintSplash from '../assets/paint_splash.jsx';
import HintArrow from './HintArrow';
import brickWallImage from '../assets/parede_tijolo.png';
import gameInterfaceImage from '../assets/spray-smile-lab.png'; 
import proximaCorImage from '../assets/proxima_cor_LAB.png';

// --- MUDANÇA 1: Importa as novas imagens ---
import concluidoImage from '../assets/concluido_cor_LAB.png';
import menuButtonImage from '../assets/botao_menu.png';


function ColorMixer({
  red, setRed, green, setGreen, blue, setBlue,
  redColor, greenColor, blueColor, mixedColor,
  completedColors, targetColor, isColorMatch, onNextColor, currentColorIndex,
  hintDirections,
  totalColors,
  // --- MUDANÇA 2: Recebe as novas props ---
  isLastColor,
  onMenuClick
}) {
  return (
    <div className="game-screen-background" style={{ backgroundImage: `url(${brickWallImage})` }}>
      <div className="mixer-container" style={{ backgroundImage: `url(${gameInterfaceImage})` }}>

        {/* --- MUDANÇA 3: Adiciona o botão de menu no canto superior direito --- */}
        <button onClick={onMenuClick} className="menu-button">
            <img src={menuButtonImage} alt="Menu Principal" />
        </button>

        <div className="completed-colors-container">
          {Array(totalColors).fill(null).map((_, index) => {
            const isActive = index === currentColorIndex;
            const completedColor = completedColors[index];

            if (isActive && targetColor) {
              return (
                <div key={index} className="completed-color-circle active" style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} title={targetColor.nome} />
              );
            }
            if (completedColor) {
              return (
                <div key={index} className="completed-color-circle" style={{ backgroundColor: `rgb(${completedColor.r}, ${completedColor.g}, ${completedColor.b})` }} title={completedColor.nome} />
              );
            }
            return (
              <div key={index} className="completed-color-circle placeholder" />
            );
          })}
        </div>
        
        {targetColor && ( <div className="target-color-display"> Misture para criar: <strong>{targetColor.nome}</strong> </div> )}
        
        {/* --- MUDANÇA 4: Lógica para mostrar "Próxima Cor" ou "Concluir" --- */}
        {isColorMatch && ( 
          <button onClick={onNextColor} className="next-button"> 
            <img 
              src={isLastColor ? concluidoImage : proximaCorImage} 
              alt={isLastColor ? "Concluir Fase" : "Próxima Cor"} 
            /> 
          </button> 
        )}

        <div className="color-circle circle-1"><PaintSplash color={redColor} /></div>
        <div className="color-circle circle-2"><PaintSplash color={greenColor} /></div>
        <div className="color-circle circle-3"><PaintSplash color={blueColor} /></div>
        <div className="color-circle result-circle"><PaintSplash color={mixedColor} /></div>
        
        <div className="slider-container slider-red-container"> <input type="range" min="0" max="255" value={red} onChange={(e) => setRed(parseInt(e.target.value))} className="slider" style={{ '--thumb-color': redColor }}/> <HintArrow direction={hintDirections.red} /> </div>
        <div className="slider-container slider-green-container"> <input type="range" min="0" max="255" value={green} onChange={(e) => setGreen(parseInt(e.target.value))} className="slider" style={{ '--thumb-color': greenColor }}/> <HintArrow direction={hintDirections.green} /> </div>
        <div className="slider-container slider-blue-container"> <input type="range" min="0" max="255" value={blue} onChange={(e) => setBlue(parseInt(e.target.value, 10))} className="slider" style={{ '--thumb-color': blueColor }}/> <HintArrow direction={hintDirections.blue} /> </div>

      </div>
    </div>
  );
}

export default ColorMixer;