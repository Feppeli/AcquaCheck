import "./formSelector.css";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react"; // O React precisa ser importado para o tipo React.MouseEvent

const Form = () => {
  const navigate = useNavigate();

  // 1. A Ref está definida corretamente aqui
  const selectRef = useRef<HTMLSelectElement>(null);

  interface Local {
    name: string;
  }

  const Locals: Local[] = [
    { name: "Restaurante" },
    { name: "Barco Bar" },
    { name: "Bar molhado" },
    { name: "Waffle" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectRef.current) {
      const valorSelecionado = selectRef.current.value;

      localStorage.clear();
      if (valorSelecionado) {
        localStorage.setItem("local_selecionado", valorSelecionado);
        console.log(`Valor salvo no LocalStorage: ${valorSelecionado}`);
      } else {
        console.error("Nenhum local válido foi selecionado.");
        return;
      }
    } else {
      console.error("Referência do elemento select não encontrada.");
      return;
    }

    navigate("/form");
  };

  return (
    <>
      <form className="formLocalSelection" action="">
        <h1>Checkup</h1>
        <div>
          <label htmlFor="local">
            <p>Local:</p>
            <select name="local" id="local" ref={selectRef} defaultValue="">
              <option value="" disabled hidden>
                Selecione aqui o local
              </option>
              {Locals.map((local) => (
                <option key={local.name} value={local.name}>
                  {local.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="nextButton" onClick={handleClick}>
          Próximo
        </button>
      </form>
    </>
  );
};

export default Form;
