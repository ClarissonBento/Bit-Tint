import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NicknameScreen() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (nickname.trim() !== "") {
      // no futuro podemos salvar no backend
      localStorage.setItem("nickname", nickname);
      navigate("/colormixer");
    } else {
      alert("Digite um nickname!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎮 Bem-vindo ao Jogo!</h1>
      <p>Digite seu nickname para começar:</p>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <br /><br />
      <button
        onClick={handleStart}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Iniciar
      </button>
    </div>
  );
}

export default NicknameScreen;