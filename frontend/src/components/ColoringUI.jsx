import React from 'react';
import PixelGrid from './PixelGrid';
import CharadeInput from './CharadeInput';
import './ColoringScreen.css';

// Importa as artes
import brickWallImage from '../assets/parede_tijolo.png';
import mascotImage from '../assets/mascote_rosto_conversando.png'; 
import speechBubbleImage from '../assets/balao_fala_tela_desenho.png';
import charadaBubbleImage from '../assets/balao_charada.png';
import titleImage from '../assets/titulo_pint.png';
import menuButtonImage from '../assets/botao_menu.png';
import lifeImage from '../assets/vida.png';
import concluidoButtonImage from '../assets/concluido_cor_LAB.png'; // Garanta que esta imagem esteja na pasta assets

function ColoringUI({
  mascotMessage, charadaData, charadaAnswer, setCharadaAnswer,
  charadaSolved, charadaFailed, charadaLives, handleCharadaSubmit,
  gridSize, playerGrid, correctGrid, handlePixelClick,
  paletteColors, selectedPixel, handleColorSelect, onMenuClick,
  isDrawingComplete, handlePhaseComplete // Recebe as novas props do Hook
}) {
  return (
    <div className="coloring-screen-background" style={{ backgroundImage: `url(${brickWallImage})` }}>
      <div className="coloring-main-content">
        <div className="drawing-grid-container">
          <PixelGrid
            rows={gridSize.rows}
            cols={gridSize.cols}
            playerGrid={playerGrid}
            correctGrid={correctGrid}
            onPixelClick={handlePixelClick}
            charadaSolved={charadaSolved}
            selectedPixel={selectedPixel}
            paletteColors={paletteColors}
          />
        </div>

        <div className="ui-panel">
          <div className="charada-box" style={{ backgroundImage: `url(${charadaBubbleImage})` }}>
            <div className="charada-content">
              <p>{charadaData.texto}</p>
              <div className="lives-container">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img key={i} src={lifeImage} alt="Vida" className={`life-heart ${i < charadaLives ? 'full' : 'empty'}`} />
                ))}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleCharadaSubmit} className="charada-form">
            <CharadeInput
              correctAnswer={charadaData.resposta || ''}
              currentInput={charadaAnswer}
              onInputChange={setCharadaAnswer}
              isDisabled={charadaSolved || charadaFailed}
            />
          </form>

          {/* --- MUDANÇA PRINCIPAL --- */}
          {/* Mostra o botão de concluído OU o diálogo do mascote */}
          <div className="mascot-dialogue-container">
            {isDrawingComplete ? (
              <button onClick={handlePhaseComplete} className="concluido-button">
                <img src={concluidoButtonImage} alt="Concluir Fase" />
              </button>
            ) : (
              <>
                <img src={mascotImage} alt="Mascote LilTint" className="dialogue-mascot-image" />
                <div className="dialogue-speech-bubble" style={{ backgroundImage: `url(${speechBubbleImage})` }}>
                  <p>{mascotMessage}</p>
                </div>
              </>
            )}
          </div>

          <div className="color-palette">
            {paletteColors.map((color, index) => (
              <button
                key={index}
                className="color-swatch"
                style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                onClick={() => handleColorSelect(color, index)}
                disabled={!selectedPixel}
              />
            ))}
          </div>

          <div className="action-buttons-container">
            <img src={titleImage} alt="Desenho" className="action-title-image" />
            <button className="home-button" onClick={onMenuClick} style={{ backgroundImage: `url(${menuButtonImage})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColoringUI;

