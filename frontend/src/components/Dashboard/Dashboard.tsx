import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import axios from 'axios';
import ModalDetails from '../ModalDetails/ModalDetails';

interface Alerta {
    id: number;
    local: string;
    problems: string; // Se problems vier do backend como a string "false", manter string
    component: string;
    description: string;
    solution: string;
    createdAt?: string; 
    updatedAt?: string;
}

const Dashboard: React.FC = () => {
    const [alertas, setAlertas] = useState<Alerta[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // modal
    const [selectedAlerta, setSelectedAlerta] = useState<Alerta | null>(null)

    const openDetails = (alerta: Alerta) => {
        console.log(alerta)
        setSelectedAlerta(alerta)
    }

    const closeDetails = () => {
        setSelectedAlerta(null)
    }

    // ... (useEffect e funções de carregamento permanecem iguais)
    useEffect(() => {
        const API_ENDPOINT = '/checkers'; 

        const fetchAlertas = async () => {
            try {
                const response = await api.get<Alerta[]>(API_ENDPOINT); 
                
                console.log('Requisição GET bem-sucedida. Resposta recebida:', response.data);

                if (Array.isArray(response.data)) {
                    setAlertas(response.data);
                } else {
                    console.warn('O formato da resposta não é um array (Esperado JSON). Conteúdo:', response.data);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error('Erro de Requisição Axios (Detalhamento):', err.message);
                    
                    if (err.response) {
                        console.error('Status do Servidor:', err.response.status);
                        console.error('Dados de Erro (Server Response Data):', err.response.data);
                        setError(`Erro ${err.response.status}: Falha no servidor.`);
                    } else if (err.request) {
                        console.error('Servidor não respondeu. Possível falha de rede ou CORS.');
                        setError('Erro de Rede: Não foi possível conectar ao servidor (Verifique CORS!).');
                    } else {
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

    if (loading) {
        return <div className='dashboardIsolated'>Carregando dados...</div>;
    }
    if (error) {
        return <div className='dashboardIsolated'>Erro ao carregar os dados: **{error}**</div>;
    }

    // Filtra apenas os alertas onde problems NÃO É "false" e não é vazio/nulo
    const alertasAtivos = Array.isArray(alertas) 
        ? alertas.filter(alerta => 
            alerta.problems && 
            alerta.problems.toLowerCase() !== 'false' &&
            alerta.solution == null // se for null, significa que está sem solução, logo deve aparecer
        ) 
        : [];
    
    
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
                    
                    {/* Título - Agora reflete apenas os alertas ATIVOS */}
                    <h2>Alertas Ativos ({alertasAtivos.length})</h2>
                    
                    <div className='alertGrid'> 
                        {alertasAtivos.length > 0 ? (
                            // Mapeia APENAS o array filtrado
                            alertasAtivos.map(alerta => (
                                <div className='alert' key={alerta.id}> 
                                    <h3>⚠️ Alerta em {alerta.local}</h3>
                                    <p>Componente: **{alerta.component}**</p>
                                    
                                    {alerta.createdAt && <small>Registrado em: {new Date(alerta.createdAt).toLocaleDateString()}</small>}
                                    
                                    <div> {/* Container interno dos botões */}
                                        <button onClick={() =>openDetails(alerta)}>Detalhes</button>
                                        <button>Solucionar</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>✅ Nenhum alerta encontrado. O sistema está limpo!</p>
                        )}
                    </div>
                    
                </div>
            </div>
            {selectedAlerta && (
                <ModalDetails 
                    id={selectedAlerta.id}
                    local={selectedAlerta.local}
                    problems={selectedAlerta.problems}
                    component={selectedAlerta.component}
                    description={selectedAlerta.description}
                    solution={selectedAlerta.solution}
                    onClose={closeDetails}
                />
            )}
        </div>

        
    );
}

export default Dashboard;