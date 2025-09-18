import React, { useEffect, useState } from "react";

function Ranking() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/ranking")
      .then((res) => res.json())
      .then((data) => setRanking(data))
      .catch((err) => console.error("Erro ao carregar ranking:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>

      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "50%",
          backgroundColor: "#111",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: "18px",
          boxShadow: "0 0 20px #0f0"
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #0f0" }}>
            <th style={{ padding: "10px" }}>#</th>
            <th style={{ padding: "10px" }}>Jogador</th>
            <th style={{ padding: "10px" }}>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.length > 0 ? (
            ranking.map((player, index) => (
              <tr
                key={player.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#222" : "#000"
                }}
              >
                <td style={{ padding: "10px" }}>{index + 1}</td>
                <td style={{ padding: "10px" }}>{player.nickname}</td>
                <td style={{ padding: "10px" }}>{player.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: "20px" }}>
                Carregando ranking...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;