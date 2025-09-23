import React, { useState } from "react";
import Modal from "./Modal";
import MiniGamePrototype from "./MiniGamePrototype";

function AbreMinigame() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          margin: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Minigame
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>🎮 Protótipo Minigame</h2>
        <MiniGamePrototype />
      </Modal>
    </div>
  );
}

export default AbreMinigame;