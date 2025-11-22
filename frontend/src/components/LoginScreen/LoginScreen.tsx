import './LoginScreen.css'

import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {

    const navigate = useNavigate()

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        navigate('/formLocal')
    }
    return(
        <>
           <div className='LoginContainer'>
                <form action="">
                    <h1>Entrar</h1>
                    <label htmlFor="">Usuário:
                        <input type="text" name="usuario" id="usuario" placeholder='Usuário'/>
                    </label>
                    <label htmlFor="">Senha:
                        <input type="password" name="senha" id="senha" placeholder='Senha'/>
                    </label>
                    <button onClick={handleLogin}>Entrar</button>
                    <a href="/cadUser">Cadastre-se clicando aqui</a>
                </form>
            </div>
        </>
    )
}

export default LoginScreen;