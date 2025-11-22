import type React from 'react';
import './modaDetails.css'

interface Alerta {
    id: number;
    local: string;
    problems: string;
    component: string;
    description: string;
    solution: string;
    onClose: () => void;
}


const ModalDetails: React.FC<Alerta> =({
    id, local, problems, component, description, onClose
})=> {
    return(
        <div className='backgroundOutFocused'> {/* Clicar fora fecha */}
            <div className='modalContent' onClick={(e) => e.stopPropagation()}> 
                <h2>Detalhes do Alerta: {id}</h2>
                <p><strong>Local:</strong> {local}</p>
                <p><strong>Componente:</strong> {component}</p>
                <p><strong>Problema Reportado:</strong> {problems}</p>
                <p><strong>Descrição Completa:</strong> {description}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ModalDetails;