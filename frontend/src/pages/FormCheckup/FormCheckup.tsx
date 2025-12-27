import './formCheckup.css'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import axios from 'axios'; // Importe o axios para usar o isAxiosError

// --- Tipagens (inalteradas) ---
interface FormItem {
    name: string;
    status: 'Funcionando' | 'Inoperante' | '';
}

interface PostPayload {
    local: string; // Este valor virá do localStorage
    problems: string; 
    component: string;
    description: string;
}

// --- Dados Iniciais ---
const initialItems: FormItem[] = [
    { name: 'Computador', status: '' },
    { name: 'GPOS', status: '' },
    { name: 'TEF', status: '' },
    { name: 'Rede Wifi', status: '' },
    { name: 'Sonorização', status: '' }
];

// --- Componente ---

const FormCheckup: React.FC = () => {
    const navigate = useNavigate();
    
    // 1. Estados para os campos do formulário
    const [itemsStatus, setItemsStatus] = useState<FormItem[]>(initialItems);
    const [description, setDescription] = useState<string>('');
    // O estado 'local' não é mais necessário, pois será lido diretamente do localStorage na submissão.
    
    // Handler para atualizar o status de um item
    const handleStatusChange = (name: string, newStatus: 'Funcionando' | 'Inoperante' | '') => {
        setItemsStatus(prevItems =>
            prevItems.map(item =>
                item.name === name ? { ...item, status: newStatus } : item
            )
        );
    };

    // Handler para submissão do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        // 2. RECUPERA O VALOR DO LOCAL STORAGE
        const storedLocal = localStorage.getItem('local_selecionado');
        
        if (!storedLocal) {
            alert("Erro: O local de checkup não foi encontrado no armazenamento local. Por favor, selecione um local primeiro.");
            return; 
        }

        // 3. Preparação dos dados para o POST (Payload)
        const problemsList = itemsStatus
            .filter(item => item.status === 'Inoperante')
            .map(item => item.name);

        const hasProblems: boolean = problemsList.length > 0;
        const problemsStatusString: string = hasProblems.toString();
            
        const payload: PostPayload = {
            // Usa o valor do localStorage
            local: storedLocal, 
            problems: problemsStatusString, 
            component: problemsList.join(', '), 
            description: description,
        };

        try {
            const response = await api.post('/postcheck', payload);
            console.log('Resposta do Servidor:', response.data);
            navigate('/'); 

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erro na requisição:", error.response?.data || error.message);
                alert(`Erro ao enviar relatório: ${error.response?.data?.message || 'Verifique o console.'}`);
            } else {
                console.error("Erro inesperado:", error);
                alert('Ocorreu um erro inesperado.');
            }
        }
    };

    return (
        <div className='formCheckupContainer'>
            <form className="formCheckup" onSubmit={handleSubmit}>
                <h1>Checkup</h1>
                <div className="formContainer">
                    {itemsStatus.map((item) => (
                        <label key={item.name} htmlFor={item.name}>
                            {item.name}:
                            <select
                                name={item.name}
                                id={item.name}
                                value={item.status} 
                                onChange={(e) => handleStatusChange(item.name, e.target.value as 'Funcionando' | 'Inoperante' | '')}
                                required 
                            >
                                <option value="" disabled hidden>Status</option>
                                <option value="Funcionando">Funcionando</option>
                                <option value="Inoperante">Inoperante</option>
                            </select>
                        </label>
                    ))}
                    
                    {/* Campo Descrição */}
                    <label htmlFor="description">Descrição:
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Descreva a situação que se encontra a área."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <button className="successButton" type="submit">Enviar Relatório</button>
            </form>
        </div>
    );
};

export default FormCheckup;