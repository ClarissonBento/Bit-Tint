import React from 'react';

function PixelGrid({ rows, cols, playerGrid, correctGrid, onPixelClick, charadaSolved, selectedPixel, paletteColors }) {
  if (!rows || !cols || playerGrid.length === 0) {
    return <div className="loading-grid">Carregando desenho...</div>;
  }

  return (
    <div className="drawing-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const rowIndex = Math.floor(i / cols);
        const colIndex = i % cols;
        const pixelColorObject = playerGrid[rowIndex]?.[colIndex];
        const correctColorIndex = correctGrid[rowIndex]?.[colIndex];
        const correctColorObject = paletteColors[correctColorIndex];
        
        let className = 'pixel';
        if (charadaSolved && correctColorIndex !== null && correctColorIndex !== undefined && !pixelColorObject) {
          className += ' pixel-hint';
        }
        
        if (selectedPixel && selectedPixel.row === rowIndex && selectedPixel.col === colIndex) {
          className += ' pixel-selected';
        }

        if (pixelColorObject && correctColorObject && (pixelColorObject.r !== correctColorObject.r || pixelColorObject.g !== correctColorObject.g || pixelColorObject.b !== correctColorObject.b)) {
          className += ' pixel-incorrect';
        }

        const backgroundColor = pixelColorObject ? `rgb(${pixelColorObject.r}, ${pixelColorObject.g}, ${pixelColorObject.b})` : 'white';

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={className}
            style={{ backgroundColor }}
            onClick={() => onPixelClick(rowIndex, colIndex)}
          />
        );
      })}
    </div>
  );
}

export default PixelGrid;