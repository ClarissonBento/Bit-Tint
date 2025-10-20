import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- PASSO 1: IMPORTE O HOOK useAuth
import './LoginScreen.css';
import brickWallImage from '../assets/parede_tijolo.png'; 
import modalImage from '../assets/modal_tela_login.png';

function LoginScreen() {
    const navigate = useNavigate();
    const auth = useAuth(); // <-- PASSO 2: PEGUE O CONTEXTO DE AUTENTICAÇÃO
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/alunos/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname: nickname, senha: password }),
            });

            if (response.ok) {
                // --- PASSO 3: CHAME A FUNÇÃO DE LOGIN DO CONTEXTO ---
                // Isso salva o nickname do usuário globalmente.
                auth.login({ nickname: nickname });

                //alert('Login realizado com sucesso!');
                navigate('/Fase1_ColorMixer');
            } else {
                const errorMessage = await response.text();
                alert(`Falha no login: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Erro de rede ao tentar fazer login:', error);
            alert('Erro de conexão. Verifique se o servidor está online.');
        }
    };

    return (
        <div 
            className="login-screen-background" 
            style={{ backgroundImage: `url(${brickWallImage})` }}
        >
            <button onClick={handleGoBack} className="login-back-button" />
            
            <div 
                className="login-modal-container" 
                style={{ backgroundImage: `url(${modalImage})` }}
            >
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="text"
                        className="login-input input-nickname"
                        placeholder="Digite seu nickname..."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        className="login-input input-password"
                        placeholder="Digite sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-submit-button">
                        <span className="login-button-text">Login</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;