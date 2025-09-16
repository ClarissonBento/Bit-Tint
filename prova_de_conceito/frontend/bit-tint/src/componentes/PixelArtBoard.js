import React, { useState } from "react";

function PixelArtBoard({ nickname }) {
  const rows = 10;
  const cols = 10;
  const [grid, setGrid] = useState(
    Array(rows).fill(null).map(() => Array(cols).fill(null))
  );

  const [currentColor, setCurrentColor] = useState("red");
  const [paintedCells, setPaintedCells] = useState(0);
  const [usedColors, setUsedColors] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const handleCellClick = (row, col) => {
    if (gameOver) return; // não permite pintar após o fim de jogo

    if (!grid[row][col]) {
      setPaintedCells((prev) => prev + 1);
    }

    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentColor : cell))
    );
    setGrid(newGrid);

    setUsedColors((prev) => new Set([...prev, currentColor]));
  };

  const score = paintedCells * usedColors.size;

  const sendScore = async (nickname, score) => {
    try {
      const response = await fetch("http://localhost:8080/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, score })
      });
      const data = await response.json();
      console.log("Score salvo no backend:", data);
    } catch (error) {
      console.error("Erro ao enviar score:", error);
    }
  };

  const endGame = () => {
    setGameOver(true);
    setFinalScore(score);
    sendScore(nickname, score);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        {/* tabuleiro */}
        {grid.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cell, j) => (
              <div
                key={j}
                onClick={() => handleCellClick(i, j)}
                style={{
                  width: 30,
                  height: 30,
                  border: "1px solid black",
                  backgroundColor: cell || "white",
                  cursor: gameOver ? "not-allowed" : "pointer"
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div>
        {/* seletor de cores */}
        <h3>Selecione uma cor:</h3>
        {["red", "green", "blue"].map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            disabled={gameOver}
            style={{
              backgroundColor: color,
              width: 50,
              height: 30,
              margin: "5px",
              border:
                currentColor === color ? "3px solid black" : "1px solid gray",
              opacity: gameOver ? 0.5 : 1,
              cursor: gameOver ? "not-allowed" : "pointer"
            }}
          />
        ))}

        {/* placar */}
        <h3 style={{ marginTop: "20px" }}>Placar</h3>
        <p>Quadradinhos pintados: {paintedCells}</p>
        <p>Cores diferentes usadas: {usedColors.size}</p>
        <p><b>Pontuação atual: {score}</b></p>

        {/* fim de jogo */}
        {!gameOver ? (
          <button
            onClick={endGame}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Fim de jogo
          </button>
        ) : (
          <h3 style={{ color: "red" }}>
            🎉 Jogo encerrado! Pontuação final: {finalScore}
          </h3>
        )}
      </div>
    </div>
  );
}

export default PixelArtBoard;