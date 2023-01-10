class ErroHttp extends Error {
  constructor(message, codigoDeErro) {
    super(message);
    this.codigo = codigoDeErro;
  }
}

module.exports = ErroHttp;
