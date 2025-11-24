import './modalSolution.css'


interface Alerta {
    id: number;
    // local: string;
    // problems: string;
    // component: string;
    // description: string;
    // solution: string;
    onClose: () => void;
    solutioned: () => void;
}

const ModalSolution: React.FC<Alerta> =({id, solutioned, onClose}) => {
    return (
        <div className="modalSolutionContainer">
            <div className="modalSolution">
                <h2>Confirma a solução do caso: #{id}</h2>
                <div>
                    <button onClick={solutioned}>Confirmar</button>
                    <button onClick={onClose}>cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalSolution;