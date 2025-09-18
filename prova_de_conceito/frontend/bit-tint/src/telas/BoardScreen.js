import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelArtBoard from "../componentes/PixelArtBoard";
import AbreMinigame from "../componentes/AbreMinigame";

function BoardScreen() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    // Puxa o nickname do localStorage quando o componente é montado
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    } else {
      // Opcional: Redireciona para a tela de nickname se não houver um salvo
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🖼️ Pixel Board</h1>
      {nickname ? (
        <PixelArtBoard nickname={nickname} size={16} />
      ) : (
        <p>Carregando jogador...</p>
      )}
      <AbreMinigame />
      <button
        onClick={() => navigate("/ranking")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Ir para Ranking ➡️
      </button>
    </div>
  );
}

export default BoardScreen;