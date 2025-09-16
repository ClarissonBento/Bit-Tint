import React from "react";
import { useNavigate } from "react-router-dom";
import ColorMixer from "../componentes/ColorMixer";

function ColorMixerScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🎨 Mistura de Cores</h1>
      <ColorMixer />
      <button
        onClick={() => navigate("/board")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Ir para Pixel Board ➡️
      </button>
    </div>
  );
}

export default ColorMixerScreen;