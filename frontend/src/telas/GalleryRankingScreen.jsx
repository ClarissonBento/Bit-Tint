//Tela Galeria-Ranking

/* Essa código é responsável pela tela de mostrar a galeria
e o ranking dos alunos da turma, ele deve solicitar ao banco
de dados a pontuação dos alunos e colocá-los em ordem descrecente,
assim como a arte feita por cada aluno após concluirem as fases
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryRankingScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalGaleriaImage from '../assets/modal_tela_galeria.png';
import modalRankingImage from '../assets/modal_tela_ranking.png';
import goldMedalImage from '../assets/medalha_ouro.png';
import silverMedalImage from '../assets/medalha_prata.png';
import bronzeMedalImage from '../assets/medalha_bronze.png';


// --- DADOS DE EXEMPLO ---
//Esses dados são apenas para podermos vizualizar se as artes que serão colocadas no modal funcionarão corretamente
const galleryItems = [ { id: 1, author: 'Aluno 1', imageUrl: 'https://placehold.co/400x300/EAD2AC/333?text=Arte+1' }, { id: 2, author: 'Aluno 2', imageUrl: 'https://placehold.co/400x300/A3D5E0/333?text=Arte+2' }, { id: 3, author: 'Aluno 3', imageUrl: 'https://placehold.co/400x300/F6BD60/333?text=Arte+3' }, { id: 4, author: 'Aluno 4', imageUrl: 'https://placehold.co/400x300/F28482/333?text=Arte+4' }, { id: 5, author: 'Aluno 5', imageUrl: 'https://placehold.co/400x300/84A59D/333?text=Arte+5' }, { id: 6, author: 'Aluno 6', imageUrl: 'https://placehold.co/400x300/F5CAC3/333?text=Arte+6' }, { id: 7, author: 'Aluno 7', imageUrl: 'https://placehold.co/400x300/8E8D8A/333?text=Arte+7' }, { id: 8, author: 'Aluno 8', imageUrl: 'https://placehold.co/400x300/E0BBE4/333?text=Arte+8' } ];
const rankingItems = [ { position: 1, name: 'Artista Alfa' }, { position: 2, name: 'Mestre das Cores' }, { position: 3, name: 'Pincel Veloz' }, { position: 4, name: 'Aluno A' }, { position: 5, name: 'Aluno B' }, { position: 6, name: 'Aluno C' }, { position: 7, name: 'Aluno D' } ];
// --- FIM DOS DADOS DE EXEMPLO ---

// Um "mapa" para associar a posição à imagem correta
const medalImages = {
  1: goldMedalImage,
  2: silverMedalImage,
  3: bronzeMedalImage
};

function GalleryRankingScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('galeria');

  const handleGoBack = () => {
    navigate(-1);
  };
  
  const modalImage = activeTab === 'galeria' ? modalGaleriaImage : modalRankingImage;

  return (
    <div
      className="gallery-ranking-background"
      style={{ backgroundImage: `url(${brickWallImage})` }}
    >
      <button onClick={handleGoBack} className="gallery-ranking-back-button" />

      <div 
        className="gallery-ranking-modal"
        style={{ backgroundImage: `url(${modalImage})` }}
      >
        <div className="clickable-tabs-container">
          <div className="tab-hitbox" onClick={() => setActiveTab('galeria')}></div>
          <div className="tab-hitbox" onClick={() => setActiveTab('ranking')}></div>
        </div>

        <div className="content-container">
          {activeTab === 'galeria' && (
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <div key={item.id} className="gallery-item">
                  <img src={item.imageUrl} alt={`Arte de ${item.author}`} />
                  <p>{item.author}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ranking' && (
            <div className="ranking-list">
              <div className="ranking-podium">
                {rankingItems.slice(0, 3).map((item) => (
                  <div key={item.position} className="podium-item">
                    <img 
                      src={medalImages[item.position]} 
                      alt={`Medalha de ${item.position}º lugar`} 
                      className="podium-medal-img" 
                    />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
              <div className="ranking-others">
                {rankingItems.slice(3).map((item) => (
                  <p key={item.position} className="other-item">
                    <span>{item.position}.</span> {item.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryRankingScreen;