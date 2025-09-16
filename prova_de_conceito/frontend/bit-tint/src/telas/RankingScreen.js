import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Ranking from "../componentes/Ranking";

function RankingScreen() {
  const navigate = useNavigate(); // Hook para navegação

  const handleRestart = () => {
    // Redireciona o usuário para a rota principal, a tela de Nickname
    navigate("/"); 
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>🏆 Ranking 🏆</h1>
      <Ranking />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleRestart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Novo Jogo
        </button>
      </div>
    </div>
  );
}

export default RankingScreen;