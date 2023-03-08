import React, { useState } from 'react';
import classes from './NovaTarefa.module.css';

interface NovaTarefaProps {
  adicionarTarefa: (textoTarefa: string) => void;
  buscou: boolean;
}

const NovaTarefa: React.FC<NovaTarefaProps> = (props) => {
  const [descricaoTarefa, setDescricaoTarefa] = useState<string>('');

  const digitaTarefaHandler = (evento: any) => {
    setDescricaoTarefa(evento.target.value);
  }

  const cadastroTarefaHandler = (evento: any) => {
    evento.preventDefault();
    props.adicionarTarefa(descricaoTarefa);
    setDescricaoTarefa('');
  };

  const mensagemEntrada = props.buscou
    ? 'Cadastre novas Tarefas:'
    : 'Busque tarefas existentes no banco antes de cadastrar novas tarefas:';

  return (
    <form className={classes.formulario} onSubmit={cadastroTarefaHandler}>
      <div className={classes.formulario__adicionar}>
        <label className={classes.formulario__label} htmlFor='texto-tarefa'>
          {mensagemEntrada}
        </label>
        <input
          className={classes.formulario__texto}
          type='text'
          id='texto-tarefa'
          value={descricaoTarefa}
          onChange={digitaTarefaHandler}
        />
        <button
          className={`${
            props.buscou
              ? classes.formulario__botao
              : classes.formulario__desabilita
          }`}
          type='submit'
          disabled={!props.buscou}
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default NovaTarefa;
