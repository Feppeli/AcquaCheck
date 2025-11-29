import './CadScreen.css'

const CadScreen = () => {
    return(
        <>
           <div className='CadContainer'>
                <form action="">
                    <h1>Cadastre-se</h1>
                    <label htmlFor="">Usuário:
                        <input type="text" name="usuario" id="usuario" placeholder='Usuário'/>
                    </label>
                    <label htmlFor="">Senha:
                        <input type="password" name="senha" id="senha" placeholder='Senha'/>
                    </label>
                    <label htmlFor=""> Repita a senha:
                        <input type="password" name="senha" id="senha" placeholder='Repita a Senha'/>
                    </label>
                    <label htmlFor=""> Email:
                        <input type="email" name="email" id="email" placeholder='Informe seu email institucional'/>
                    </label>
                    <button>Entrar</button>
                    <a href="/">Realize o seu Login clicando aqui</a>
                </form>
            </div>
        </>
    )
}

export default CadScreen;