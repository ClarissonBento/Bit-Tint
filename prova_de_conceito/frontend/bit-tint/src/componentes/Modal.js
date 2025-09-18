import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // se não estiver aberto, não renderiza nada

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)", // fundo esmaecido
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          minWidth: "300px",
          textAlign: "center"
        }}
      >
        {/* Conteúdo dinâmico */}
        {children}

        {/* Botão fechar padrão */}
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;