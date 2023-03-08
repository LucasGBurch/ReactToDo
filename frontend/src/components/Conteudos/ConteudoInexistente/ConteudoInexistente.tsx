import classes from './ConteudoInexistente.module.css';

const ConteudoInexistente: React.FC = () => {
  return (
    <div className={classes.container}>
      <section className={classes.inicio}>
        <div className={classes['texto-container']}>
          <h1>Lamentamos ;/</h1>
          <p>A página que você tentou acessar não existe.</p>
        </div>
      </section>
    </div>
  )
}

export default ConteudoInexistente;