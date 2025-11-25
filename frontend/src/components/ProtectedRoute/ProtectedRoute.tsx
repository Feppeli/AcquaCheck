

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../api/AuthContext'; // 🛑 Ajuste o caminho se necessário

const ProtectedRoute: React.FC = () => {
    // 1. Acessa o estado de autenticação global
    const { isAuthenticated } = useAuth();
    
    // 2. Verifica a autenticação
    if (isAuthenticated) {
        // Se estiver autenticado, renderiza o componente filho da rota (FormSelector, Dashboard, etc.)
        return <Outlet />;
    } else {
        // Se NÃO estiver autenticado, redireciona para a página de login (path="/").
        // O 'replace' garante que o usuário não consiga voltar usando o botão 'Voltar' do navegador.
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;