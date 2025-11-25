import api from '../../api/api'; 
import './LoginScreen.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
// 🛑 IMPORTAÇÃO NECESSÁRIA
import { useAuth } from '../../api/AuthContext'; // ⬅️ AJUSTE O CAMINHO CONFORME A SUA ESTRUTURA

// =================================================================
// INTERFACES DEFINIDAS NESTE ARQUIVO
// =================================================================

interface UserCredentials {
    email: string;
    password: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
}

interface ErrorResponse {
    message: string;
}

// =================================================================
// COMPONENTE LOGINSCREEN
// =================================================================

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    // 🛑 USO DO HOOK DE AUTENTICAÇÃO
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault(); 
        setError('');
        setLoading(true);

        const credentials: UserCredentials = { email, password };

        try {
            // A requisição GET com params está correta para seu backend
            const response = await api.get<UserResponse>('/loginUser', { 
                params: credentials 
            }); 

            const userData: UserResponse = response.data; 
            
            // 🛑 AÇÃO CRUCIAL: Salvar o usuário no estado global e localStorage
            login(userData); 
            
            console.log('Login bem-sucedido!', userData);
            
            // Redireciona para a rota protegida
            navigate('/formLocal'); 
            
        } catch (err) {
            console.error("Erro no login:", err);

            const axiosError = err as AxiosError<ErrorResponse>;

            if (axiosError.response) {
                // Se o backend retornar 500 ou 401, a mensagem será exibida.
                const errorData = axiosError.response.data; 
                setError(errorData?.message || 'Erro de autenticação ou servidor.'); 
            } else {
                setError('Não foi possível conectar ao servidor. Verifique se o backend está ativo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
           <div className='LoginContainer'>
               <form onSubmit={handleLogin}> 
                    <h1>Entrar</h1>
                    
                    <label htmlFor="email">Email:
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Seu Email'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    
                    <label htmlFor="senha">Senha:
                        <input 
                            type="password" 
                            name="senha" 
                            id="senha" 
                            placeholder='Senha'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    
                    {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                    
                    <a href="/cadUser">Cadastre-se clicando aqui</a>
                </form>
           </div>
        </>
    )
}

export default LoginScreen;