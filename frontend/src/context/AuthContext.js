import React, { createContext, useState, useContext } from 'react';

// 1. Cria o contexto
const AuthContext = createContext(null);

// 2. Cria o "Provedor" que vai gerenciar o estado do usuário
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // O estado inicial é 'ninguém logado'

    // Função para fazer o login
    const login = (userData) => {
        setUser(userData);
        // Opcional: Salvar no localStorage para manter o login após recarregar a página
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Função para fazer o logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Cria um "hook" personalizado para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
};