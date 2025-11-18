import "./formCheckup.css"
import { useNavigate } from "react-router-dom";

interface Item {
    name: string;
}

const Items: Item[] = [
  {name: 'Computador'},
  {name: 'GPOS'},
  {name: 'TEF'},
  {name: 'Rede Wifi'},
  {name: 'Sonorização'}
]

const FormCheckup = () => {

  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <form className="formCheckup" action="">
        <h1>Checkup</h1>
        <div className="formContainer">
            {Items.map((item) => (
              <label htmlFor={item.name}>{item.name}: 
              <select name={item.name} id={item.name}>
                <option value="" disabled selected hidden>Status</option>
                <option value="true">Funcionando</option>
                <option value="true">Inoperante</option>
              </select>
              </label>
            ))}
            <label htmlFor="description">Descrição:
              <textarea name="descricao" id="descricao" placeholder="Descreva a situação que se encontra a área."></textarea>
            </label>
        </div>
        <button className="successButton" onClick={handleClick}>Enviar Relatório</button>
      </form>
    </>
  );
};

export default FormCheckup;
