import React, { useState } from "react";

function MiniGamePrototype() {
  const [arrastandoDe, setArrastandoDe] = useState(null);
  const [linhaTemp, setLinhaTemp] = useState(null);
  const [ligacoes, setLigacoes] = useState([]);

  const points = [
    { id: 1, x: 150, y: 50 },
    { id: 2, x: 75, y: 110 },
    { id: 3, x: 225, y: 110 },
    { id: 4, x: 100, y: 210 },
    { id: 5, x: 200, y: 210 },
  ];

  const handleMouseDown = (ponto) => {
    setArrastandoDe(ponto);
  };

  const handleMouseMove = (e) => {
    if (arrastandoDe) {
      const svg = e.currentTarget.getBoundingClientRect();
      setLinhaTemp({
        x1: arrastandoDe.x,
        y1: arrastandoDe.y,
        x2: e.clientX - svg.left,
        y2: e.clientY - svg.top,
      });
    }
  };

  const handleMouseUp = (ponto) => {
    if (arrastandoDe && ponto.id !== arrastandoDe.id) {
      setLigacoes([...ligacoes, { de: arrastandoDe, para: ponto }]);
    }
    setArrastandoDe(null);
    setLinhaTemp(null);
  };

  return (
    <div style={{ position: "relative", width: 300, height: 300 }}>
      <svg
        width="300"
        height="300"
        style={{ border: "1px solid black" }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => {
          setArrastandoDe(null);
          setLinhaTemp(null);
        }}
      >
        {/* Linhas confirmadas */}
        {ligacoes.map((l, i) => (
          <line
            key={i}
            x1={l.de.x}
            y1={l.de.y}
            x2={l.para.x}
            y2={l.para.y}
            stroke="red"
            strokeWidth="3"
          />
        ))}

        {/* Linha temporária */}
        {linhaTemp && (
          <line
            x1={linhaTemp.x1}
            y1={linhaTemp.y1}
            x2={linhaTemp.x2}
            y2={linhaTemp.y2}
            stroke="gray"
            strokeWidth="2"
            strokeDasharray="4"
          />
        )}

        {/* Pontos */}
        {points.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r="10"
            fill="black"
            onMouseDown={() => handleMouseDown(p)}
            onMouseUp={() => handleMouseUp(p)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>

    </div>
  );
}

export default MiniGamePrototype;