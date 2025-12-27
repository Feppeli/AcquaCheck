import {useState, type ChangeEvent, type FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import './CadScreen.css'

interface FormData {
    usuario: string;
    email: string;
    senha: string;
    confirmSenha: string;
}
const CadScreen: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        usuario: '',
        email: '',
        senha:'',
        confirmSenha:''
    });
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmSenha){
            alert("As senhas não coincidem!");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: formData.usuario,
                email: formData.email,
                password: formData.senha
            };

            const response = await api.post('/user', payload);

            if (response.status === 201) {
                alert("Usuário cadastrado com sucesso!");
                navigate('/')
            }
        }catch(err: any){
            console.error('Erro ao cadastrar:', err);
            const errorMsg = err.response.data?.message || 'Erro ao realizar cadastro.';
            alert(errorMsg);
        }finally{
            setLoading(false);
        }
    }

    return(
        <>
           <div className='CadContainer'>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastre-se</h1>
 <label htmlFor="usuario">Usuário:
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario" 
                        placeholder='Usuário' 
                        required
                        value={formData.usuario}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="email">Email:
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Informe seu email institucional' 
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="senha">Senha:
                    <input 
                        type="password" 
                        name="senha" 
                        id="senha" 
                        placeholder='Senha' 
                        required
                        value={formData.senha}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="confirmSenha">Repita a senha:
                    <input 
                        type="password" 
                        name="confirmSenha" 
                        id="confirmSenha" 
                        placeholder='Repita a Senha' 
                        required
                        value={formData.confirmSenha}
                        onChange={handleChange}
                    />
                </label>
                    <button type='submit' disabled={loading}>{loading ? 'Processando...' : 'Cadastrar'}</button>
                    <a href="/">Realize o seu Login clicando aqui</a>
                </form>
            </div>
        </>
    )
}

export default CadScreen;