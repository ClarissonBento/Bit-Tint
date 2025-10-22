//Tela de Cadastro
/* Ao clicar no botão "Inscrição", esse código é responsável
por criar um save dos dados registrados do aluno no 
banco de dados */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CadastroScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_cadastro.png';

function CadastroScreen() {
    const navigate = useNavigate();
    const [nomeTurma, setNomeTurma] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleGoBack = () => {
        navigate(-1);
    };

    // --- FUNÇÃO handleCadastro COM A NOVA VALIDAÇÃO ---
    const handleCadastro = async (event) => {
        event.preventDefault();

        try {
            // --- PASSO 1 (NOVO): VERIFICAR SE A TURMA EXISTE ---
            console.log(`Passo 1: Verificando se a turma '${nomeTurma}' existe...`);
            const responseBuscaTurma = await fetch(`http://localhost:8080/turmas/porNome/${nomeTurma}`);

            if (!responseBuscaTurma.ok) {
                // Se a resposta não for 'ok' (ex: 404 Not Found), a turma não existe.
                // Interrompemos o processo aqui.
                throw new Error("A turma informada não existe. Verifique o nome ou peça para o admin criá-la.");
            }
            
            // Se a turma existe, pegamos os dados dela para usar depois.
            const turmaExistente = await responseBuscaTurma.json();
            const turmaId = turmaExistente.id;
            console.log(`Turma encontrada com ID: ${turmaId}`);


            // --- PASSO 2: CRIAR O ALUNO (Só executa se o Passo 1 foi bem-sucedido) ---
            console.log("Passo 2: Criando o aluno...");
            const responseAluno = await fetch('http://localhost:8080/alunos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname: nickname, senha: password })
            });

            if (!responseAluno.ok) {
                throw new Error('Falha ao criar o aluno. O nickname pode já estar em uso.');
            }
            const alunoCriado = await responseAluno.json();
            const alunoId = alunoCriado.id;
            console.log(`Aluno criado com sucesso! ID: ${alunoId}`);


            // --- PASSO 3: ASSOCIAR ALUNO E TURMA ---
            console.log(`Passo 3: Associando Aluno ID ${alunoId} com Turma ID ${turmaId}...`);
            const responseAssociacao = await fetch(`http://localhost:8080/turmas/${turmaId}/alunos/${alunoId}`, {
                method: 'POST'
            });

            if (!responseAssociacao.ok) throw new Error('Falha ao associar aluno à turma.');

            console.log("Associação realizada com sucesso!");

            // --- PASSO 4: SUCESSO E NAVEGAÇÃO ---
            alert("Cadastro realizado com sucesso! Basta Jogar!");
            navigate('/Fase1_ColorMixer');

        } catch (error) {
            console.error('Ocorreu um erro no processo de cadastro:', error);
            alert(`Erro no cadastro: ${error.message}`);
        }
    };

    return (
        <div 
            className="cadastro-screen-background" 
            style={{ backgroundImage: `url(${brickWallImage})` }}
        >
            <button onClick={handleGoBack} className="cadastro-back-button" />
            
            <div 
                className="cadastro-modal-container" 
                style={{ backgroundImage: `url(${modalImage})` }}
            >
                <form className="cadastro-form" onSubmit={handleCadastro}>
                    <input 
                        type="text"
                        className="cadastro-input input-turma"
                        placeholder="Digite sua turma..."
                        value={nomeTurma}
                        onChange={(e) => setNomeTurma(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        className="cadastro-input input-nickname"
                        placeholder="Digite seu nickname..."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        className="cadastro-input input-password"
                        placeholder="Digite sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="cadastro-submit-button">
                        <span className="cadastro-button-text">Cadastrar</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroScreen;