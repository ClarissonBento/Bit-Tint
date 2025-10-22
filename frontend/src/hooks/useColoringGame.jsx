import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useColoringGame(phaseData) {
  const navigate = useNavigate();
  const [mascotMessage, setMascotMessage] = useState("Clique em um pixel para colorir ou resolva a charada para uma dica!");
  const [charadaAnswer, setCharadaAnswer] = useState("");
  const [charadaLives, setCharadaLives] = useState(3);
  const [charadaSolved, setCharadaSolved] = useState(false);
  const [charadaFailed, setCharadaFailed] = useState(false);
  const [playerGrid, setPlayerGrid] = useState([]);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);

  useEffect(() => {
    if (phaseData) {
      setPlayerGrid(
        Array(phaseData.tamanhoMatriz[0])
          .fill(null)
          .map(() => Array(phaseData.tamanhoMatriz[1]).fill(null))
      );
      setIsDrawingComplete(false);
      setCharadaSolved(false);
      setCharadaLives(3);
      setMascotMessage("Clique em um pixel para colorir ou resolva a charada para uma dica!");
    }
  }, [phaseData]);

  const checkDrawingCompletion = useCallback(() => {
    if (!phaseData || !playerGrid.length) return false;
    const { matrizCorreta, tamanhoMatriz } = phaseData;
    const [rows, cols] = tamanhoMatriz;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const correctColorIndex = matrizCorreta[r]?.[c];
        const playerColorObject = playerGrid[r]?.[c];
        if (correctColorIndex !== null && correctColorIndex !== undefined && !playerColorObject) {
          return false;
        }
      }
    }
    return true;
  }, [playerGrid, phaseData]);

  useEffect(() => {
    if (checkDrawingCompletion()) {
      setIsDrawingComplete(true);
      setMascotMessage("Uau! O desenho ficou perfeito! Clique em Concluído!");
    }
  }, [playerGrid, checkDrawingCompletion]);

  const handlePixelClick = (rowIndex, colIndex) => {
    const correctColorIndex = phaseData.matrizCorreta[rowIndex]?.[colIndex];
    if (correctColorIndex !== null && correctColorIndex !== undefined) {
      setSelectedPixel({ row: rowIndex, col: colIndex });
      const correctColorName = phaseData.cores[correctColorIndex]?.nome || 'a cor correta';
      // --- CORREÇÃO AQUI ---
      // A mensagem agora volta a informar a cor correta para o jogador.
      setMascotMessage(`Pinte este pixel de ${correctColorName}!`);
    } else {
      setMascotMessage("Este pixel não precisa ser pintado. Tente outro!");
      setSelectedPixel(null);
    }
  };

  const handleColorSelect = (selectedColor, selectedColorIndex) => {
    if (!selectedPixel) {
      setMascotMessage("Primeiro, clique em um pixel na grade para selecionar!");
      return;
    }
    const { row, col } = selectedPixel;
    const newPlayerGrid = playerGrid.map(r => [...r]);
    newPlayerGrid[row][col] = selectedColor;
    setPlayerGrid(newPlayerGrid); 

    const correctColorIndex = phaseData.matrizCorreta[row]?.[col];
    if (correctColorIndex === selectedColorIndex) {
      setMascotMessage("Boa! A cor parece certa.");
    } else {
      setMascotMessage("Hmm, essa cor não parece a correta, mas continue tentando!");
    }
    setSelectedPixel(null);
  };
  
  const handleCharadaSubmit = (e) => {
    e.preventDefault();
    if (charadaSolved || charadaFailed) return;
    if (charadaAnswer.toLowerCase() === phaseData.respostaCharada.toLowerCase()) {
      setMascotMessage("Parabéns, acertou! A silhueta do desenho foi revelada como dica!");
      setCharadaSolved(true);
    } else {
      const newLives = charadaLives - 1;
      setCharadaLives(newLives);
      if (newLives > 0) {
        setMascotMessage(`Não foi dessa vez. Você tem mais ${newLives} chance(s).`);
      } else {
        setMascotMessage("Ah, que pena! Suas vidas acabaram para a charada.");
        setCharadaFailed(true);
      }
    }
    setCharadaAnswer("");
  };

  const handlePhaseComplete = () => {
    alert("Fase 1 de colorir concluída!");
    navigate('/Fase2_ColorirDesenho');
  };

  return {
    mascotMessage,
    charadaData: { 
      texto: phaseData?.textoCharada || '',
      resposta: phaseData?.respostaCharada || ''
    },
    charadaAnswer, setCharadaAnswer,
    charadaSolved, charadaFailed, charadaLives,
    handleCharadaSubmit,
    gridSize: { rows: phaseData?.tamanhoMatriz[0] || 0, cols: phaseData?.tamanhoMatriz[1] || 0 },
    playerGrid,
    correctGrid: phaseData?.matrizCorreta || [],
    handlePixelClick,
    paletteColors: phaseData?.cores || [],
    selectedPixel,
    handleColorSelect,
    navigate,
    isDrawingComplete,
    handlePhaseComplete,
  };
}

