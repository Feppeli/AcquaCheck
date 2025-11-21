import './LoginScreen.css'

const LoginScreen = () => {
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
                    <button>Entrar</button>
                    <a href="/addUser">Cadastre-se clicando aqui</a>
                </form>
            </div>
        </>
    )
}

export default LoginScreen;