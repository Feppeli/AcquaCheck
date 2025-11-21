import './Dashboard.css'

const Dashboard = () => {
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
                {/* realizar validação com map, assim que conseguir puxar as informações com o axios */}
                <div className='alert'>
                    <h2>Alert</h2>
                    <p>Local: Waffle</p>
                    <button>Detalhes</button>
                    <button>solucionado</button>
                </div>
                
            </div>

        </div>

        </div>
    )
}

export default Dashboard