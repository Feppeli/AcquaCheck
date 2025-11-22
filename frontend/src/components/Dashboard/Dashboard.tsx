import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Alerta {
    id: number;
    local: string;
    problems: string;
    component: string;
    description: string;
    data: string;
}

const Dashboard: React.FC = () => {
    const [alertas, setAlertas] = useState<Alerta[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 🚨 PASSO DE DEBUG 1: Use a URL completa da sua API aqui.
        // Se a sua API estiver em 'http://localhost:8080/api/checkers', use o caminho completo.
        // Se o Axios já está configurado globalmente, você pode manter '/checkers'.
        const API_ENDPOINT = '/checkers'; 
        // Exemplo: const API_ENDPOINT = 'http://localhost:8080/checkers'; 

        const fetchAlertas = async () => {
            try {
                const response = await axios.get<Alerta[]>(API_ENDPOINT);
                
                // 🚨 PASSO DE DEBUG 2: Imprime a resposta no console para inspeção.
                console.log('Requisição GET bem-sucedida. Resposta recebida:', response.data);

                // Garante que o que recebemos é, de fato, um array antes de setar
                if (Array.isArray(response.data)) {
                    setAlertas(response.data);
                } else {
                    // Trata o caso de a API retornar um objeto único ou algo inesperado
                    console.warn('O formato da resposta não é um array. Conteúdo:', response.data);
                    // Se for um objeto único, você pode tentar tratá-lo aqui:
                    // setAlertas([response.data] as Alerta[]);
                }
            } catch (err) {
                // 🚨 PASSO DE DEBUG 3: Log mais detalhado em caso de erro.
                if (axios.isAxiosError(err)) {
                    console.error('Erro de Requisição Axios (Detalhamento):', err.message);
                    
                    if (err.response) {
                        // Erro de Resposta (Status 4xx ou 5xx)
                        console.error('Status do Servidor:', err.response.status);
                        console.error('Dados de Erro (Server Response Data):', err.response.data);
                        setError(`Erro ${err.response.status}: Falha no servidor.`);
                    } else if (err.request) {
                        // Erro de Rede (Ex: Servidor Offline, CORS Bloqueado)
                        console.error('Servidor não respondeu. Possível falha de rede ou CORS.');
                        setError('Erro de Rede: Não foi possível conectar ao servidor.');
                    } else {
                        // Erro de Configuração
                        setError(`Erro na configuração da requisição: ${err.message}`);
                    }
                } else {
                    console.error('Erro Desconhecido ao buscar dados:', err);
                    setError('Ocorreu um erro desconhecido.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAlertas();
    }, []);

    // 7. Renderização Condicional (Loading e Error)
    if (loading) {
        return <div className='dashboardIsolated'>Carregando dados...</div>;
    }

    if (error) {
        // Mostra a mensagem de erro detalhada definida no catch
        return <div className='dashboardIsolated'>Erro ao carregar os dados: **{error}**</div>;
    }
    
    // 8. Renderização Principal do Dashboard
    return (
        <div className='dashboardIsolated'>
            <nav>
                <h1>AcquaCheck</h1>
                <a href="/">Sair</a>
            </nav>
            <div className='mainContainer'>
                <div className='sideBar'>
                    {/* configuração da side bar */}
                </div>
                <div className='mainContent'>
                    
                    {/* Renderização Corrigida: Usa Array.isArray() para evitar o TypeError */}
                    {Array.isArray(alertas) && alertas.length > 0 ? (
                        alertas.map(alerta => (
                            <div className='alert' key={alerta.id}> {/* Key na div pai do map */}
                                <h2>Alerta!</h2>
                                <p>Local: **{alerta.local}**</p>
                                <p>Problema: {alerta.problems}</p>
                                <button>Detalhes</button>
                                <button>Solucionado</button>
                            </div>
                        ))
                    ) : (
                        // Mensagem quando a requisição funcionou, mas não retornou dados
                        <p>Nenhum alerta encontrado.</p>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;