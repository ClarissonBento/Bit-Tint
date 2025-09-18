import React, { useState } from "react";

function ColorMixer() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const color = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎨 Misturador de Cores RGB</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>🔴 Vermelho: {red}</label>
        <input
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={(e) => setRed(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>🟢 Verde: {green}</label>
        <input
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={(e) => setGreen(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>🔵 Azul: {blue}</label>
        <input
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={(e) => setBlue(e.target.value)}
        />
      </div>

      {/* Quadrado mostrando a cor */}
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: color,
          border: "2px solid black",
          marginTop: "20px"
        }}
      />

      <p style={{ marginTop: "10px" }}>
        Cor atual: <b>{color}</b>
      </p>
    </div>
  );
}

export default ColorMixer;