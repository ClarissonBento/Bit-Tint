//Tela Criar Turma
/*Ao clicar no botão de criar turma, esse código é resposável 
por aplicar a lógica de criação da turma e registrar no banco de dados */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CriarTurmaScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_criar_turma.png';

function CriarTurmaScreen() {
    const navigate = useNavigate();
    const [nomeTurma, setNomeTurma] = useState('');
    const [senhaAdmin, setSenhaAdmin] = useState('');

    const handleGoBack = () => {
        navigate(-1); 
    };

    // --- FUNÇÃO handleCriarTurma MODIFICADA ---
    const handleCriarTurma = async (event) => {
        event.preventDefault();
        
        try {
            console.log('Criando nova turma:', { nomeTurma, senhaAdmin });

            const response = await fetch('http://localhost:8080/turmas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nomeTurma, senhaAdmin })
            });

            if (response.ok) {
                const turmaCriada = await response.json();
                console.log('Turma criada com sucesso:', turmaCriada);
                alert("Turma criada com sucesso!");
                navigate('/turma'); // Volta para o menu de turmas após criar
            } else {
                // Trata erros, como nome da turma já existente
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao criar a turma.');
            }
        } catch (error) {
            console.error('Erro ao criar turma:', error);
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div 
            className="criar-turma-screen-background" 
            style={{ backgroundImage: `url(${brickWallImage})` }}
        >
            <button onClick={handleGoBack} className="criar-turma-back-button" />
            
            <div 
                className="criar-turma-modal-container" 
                style={{ backgroundImage: `url(${modalImage})` }}
            >
                <form className="criar-turma-form" onSubmit={handleCriarTurma}>
                    <input 
                        type="text"
                        className="criar-turma-input input-nome-turma"
                        placeholder="Digite o nome da turma..."
                        value={nomeTurma}
                        onChange={(e) => setNomeTurma(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        className="criar-turma-input input-senha-admin"
                        placeholder="Digite a senha do admin..."
                        value={senhaAdmin}
                        onChange={(e) => setSenhaAdmin(e.target.value)}
                        required
                    />
                    <button type="submit" className="criar-turma-submit-button">
                        <span className="criar-turma-button-text">Criar turma</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CriarTurmaScreen;