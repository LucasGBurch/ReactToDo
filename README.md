# Desafios do Projeto Impulsionar da South System.

- Este projeto contém os cinco desafios construídos e acumulados ao longo do treinamento do projeto Impulsionar.

# Instruções para rodar:

- Ao Baixar/Abrir o projeto, é recomendável fazê-lo no VSCode, já que essa IDE foi utilizada para o desenvolvimento do desafio;

- É preciso ter instalado na sua máquina uma versão LTS do Node ( https://nodejs.org/pt-br/ ), para poder executar os comandos npm (node package manager). **ATENÇÃO! As instruções abaixo podem ser substituídas pelos comandos do DOCKER, NA ÚLTIMA SESSÃO DESTE DOCUMENTO, a partir do Desafio do Módulo 5**. A função do Docker é justamente rodar as duas partes do projeto descritas abaixo. Primeiro com instalação de dependências, caso não estejam instaladas, e depois rodando a aplicação. Caso prefira rodar sem o Docker, siga os passos abaixo:

    - Para instalar as dependências necessárias para rodar a aplicação, é preciso executar o comando "npm install" ou a abreviação "npm i". Isso se deve ao fato de que a pasta de node_modules com as configurações necessárias para a aplicação não costumam ir para os repositórios devido ao seu peso no commit;

    - Agora essa instrução vale para as duas pastas de projeto que temos: a de frontend, onde fica o material criado até o Desafio 3; e a de server, onde fica o código novo introduzido no desafio 4, para a parte backend;

    - Ao ter a pasta node_modules adicionada ao projeto, abrir aplicacao, clicando com botão direito do mouse nas pastas para abrir terminal integrado no diretório de cada parte ("...\solucao_modulo5\frontend" e "...\solucao_modulo5\server") e executar o comando "npm start" em cada uma.

# Estrutura até o Desafio 3:

- Através da biblioteca React Router (react-router-dom), a aplicação simula diferentes páginas para navegar com diferentes componentes e funções. São estas cinco:

    - Página Inicial (<PaginaInicial />) - basicamente, um "dumb component" (sem estado, só apresenta algo). Apresenta mensagem de boas vindas e mostra apenas os botões da sua página/rota no logo à esquerda e o de login à direita. Ambos se localizam no Cabeçalho que há acima da mensagem de boas-vindas;

    - Página Inexistente (<PaginaInexistente />) - outro dumb component. A aplicação redirecionará o usuário para essa página sempre que uma rota inexistente for colocada no navegador. Por exemplo, se a rota "/auth", do componente anterior, tiver um erro de digitação como "/aute", o usuário que digitou e tentou navegar para esse endereço será redirecionado para o desse componente, qual seja, "/not-found";

    - Página Não Autorizada (<PaginaNaoAutorizada />) - é mais um "dumb component". Ela impede que um usuário que já logou em "/auth" acesse essa mesma rota, porque não faz sentido precisar da página de login se você já está logado. Da mesma forma, o usuário que ainda não realizou o seu cadastro e login não poderá acessar a rota "/todo", referente ao sistema de cadastro de tarefas. Inclusive, essas tentativas de acesso indevidas só poderão ocorrer ou ser testadas manualmente (mudando endereço na url), pois os dados dos componentes foram manipulados para não exibir os botões/links para essas rotas caso não seja necessário. Por exemplo, o botão de Logout e o link para as tarefas em "/todo" só aparecem para usuários que já realizaram o login;

    - Página de Autenticação (<PaginaAuth />) - onde o usuário pode cadastrar um e-mail e senha e/ou utilizá-los para realizar o login na aplicação, podendo assim acessar a página de Tarefas implementada inicialmente no desafio 1:
        
        - Esse sistema de cadastro funciona através de um serviço de Context API, ideal para dados que mudam pouco, combinados com banco de dados locais (localStorage) do navegador, fazendo uso de JavaScript para sua manipulação;
        
        - Além disso, foi criado um hook com o nome useLogin() para processar o serviço de banco de dados do Firebase, fazendo uso de 2 métodos "POST" de Rest API: um para o cadastro da conta e outro para enviar os dados e validar o login na aplicação. Maiores informações em: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password;
        
        - O hook useLogin() recebe em seu método de requisição os parâmetros: email e senha digitados, a url com referência ao serviço do Firebase e um booleano ehLogin para trabalhar as duas diferentes URL's - de cadastro ou de login.
        
        - O Firebase nos fornece uma chave que, por segurança, passou a ser guardada em um arquivo .env, que fornece a chave para a url de forma segura (sem ela ficar exposta no código-fonte).
        
        - Toda essa interação conta com a criação de um "token" também, que mantém o usuário que logou validado na página durante quase 1h, a menos que ele clique em Logout e saia manualmente antes.
        
        - Tudo isso é integrado através de um componente de formulário de autenticação, exibido pela Página de Autenticação; e, por fim temos a:

    - Página de Cadastro e edição de Tarefas (<PaginaTarefas />) - a maior de todas as rotas, com mais componentes e mais manipulação de dados. Componentes que vão desde um container <Tarefa />, que centraliza a manipulação dos dados (estados) da aplicação e seus dois "filhos": <NovaTarefa />, que faz a manipulação inicial do nome preenchido no cadastro de tarefas; e <ListaTarefas />, que possui seu próprio filho <ItemLista />, responsável por renderizar a listagem das tarefas que estão cadastradas na aplicação, para cada um desses itens, renderizados via array.map().

# Capítulo especial para o componente de apresentação da Página de Tarefas:

- Por ser o componente principal da parte frontend da aplicação, essa parte merece um capítulo à parte.

    - Reforçando: o componente <Tarefas /> utiliza na sua renderização os componentes de <NovaTarefa />, para adicionar novas, e <ListaTarefas />, que tem como componente filho o <ItemLista /> para renderizar os itens listados. Esse conjunto possui as seguintes utilidades:
        - Buscar tarefas no banco para exibí-las na aplicação (através do seu estado local da lista);
        - Adicionar tarefas na lista E no banco;
        - Deletar tarefas da lista E do banco;
        - Atualizar status da tarefa via checkbox na lista E no banco;

    - Mas que banco é esse?
        
        - Da mesma forma que utilizamos métodos fetch() assíncronos (async/await) para a autenticação de dados, fizemos uso desses métodos com uma nova API, com apoio do serviço MockAPI (mais informações em https://mockapi.io/docs).
        
        - Desta vez, cada uma das utilidades citadas de <Tarefas /> fez uma chamada de método diferente, com base no conceito de API Rest: 
            - 'GET' para buscar;
            - 'POST' para adicionar;
            - 'DELETE' para deletar; e
            - 'PUT' para atualizar.
            
        - Toda essa lógica foi colocada para dentro de um hook chamado useDados(). Por sua vez, esse hook utilizou métodos e lógicas armazenados num hook chamado useHttp(). Esse último é basicamente um serviço que entrega os métodos necessários para manipular os dados no banco.
        
        - Já o useDados() integra essa manipulação do banco do useHttp() com a manipulação na lista da aplicação!
            - Em suma: <Tarefas /> -> chama useDados() -> que chama useHttp();
            - Lembrando que, internamente, <Tarefas /> interage com <NovaTarefa /> e <ListaTarefas /> -> <ItemLista />, para fazer a manipulação dos dados na aplicação através do hook useState().
        
        - Essa abordagem foi montada para entregar as respostas para o componente <Tarefas /> sem poluí-lo! Dessa forma, o componente fica mais limpo e com uma melhor cobertura de testes!
        
# Para gerar o Bundle de produção:

- Primeiro os imports de componentes em <App /> dentro de suas rotas foram refatorados para chamarem os componentes através do método do React.lazy(), para que eles só sejam carregados quando solicitados. Isso porque o modo de produção seria uma aplicação onde usuários interagem com um servidor de verdade, ou seja, ela consome dados de internet;

- Por fim, é necessário rodar o comando "npm run build"; passados alguns segundos, a pasta deverá ser gerada.

# Desafio 4: integração frontend-backend:

- Agora, temos um modesto servidor http criado em uma nova pasta: a de backend. Esse servidor faz uma requisição para nossa API estática de tarefas (do mock.api que usamos no Desafio 3) e exibe através do servidor os dados;

- Para testar essa funcionalidade, foi utilizado o Postman (https://www.postman.com/), onde criamos requisições como as da API para um link direcionado. No nosso caso, o endereço especificado é https://localhost:3001/api/todo, e a requisição a ser feita no Postman deve ser do tipo GET. Caso ocorra problemas de funcionamento no navegador, certifique-se de ter na sua máquina instalado o "Postman Agent" - encontrado no mesmo site - e de estar com ele rodando antes de tentar enviar a requisição. Você encontrará o objeto JSON com os dados caso prefira acessar diretamente o endereço do localhost indicado;

- ATENÇÃO! Caso o os dados da API estejam vazios, será necessário cadastrar algumas tarefas através da aplicação para que elas sejam visíveis dentro do objeto retornado pelo Postman;

- Por fim, há um tratamento de erros para caso o endereço no arquivo app.js esteja com algum erro de digitação do endereço da /api/todo.

# Parte final - Docker, Deploy e link do Vercel:

- Como citado nas instruções atualizadas sobre rodar o projeto, o Docker realiza o trabalho de instalar os node_modules necessários e de rodar as duas portas da aplicação (frontend em 3000 e server/backend em 3001). Dessa forma, a partir de agora precisamos de apenas um terminal e dois comandos simples;

- **Mas antes, você deve ter o Docker instalado na sua máquina**. Este link mostra as **opções de instalação** dependendo do seu sistema operacional: https://docs.docker.com/get-docker/

- Feita a instalação, abrimos o terminal integrado na pasta/diretório principal do projeto (./solucao_modulo5):

    - Para **instalar as dependências** - node_modules - **rodamos "docker-compose build --no-cache"**. Pode demorar um pouco se for a primeira vez, pois sua máquina ainda não possui as "imagens" com as configurações de aplicação dos diretórios frontend e server. Feita a instalação, certifique-se que as pastas node_modules constam em cada um desses diretórios;

    - Feitas as instalações, a **aplicação pode rodar com o comando "docker compose up"**. Você poderá testá-las no seu navegador abrindo os seguintes endereços:

        - **frontend** - http://localhost:3000
        - **server (backend)** - http://localhost:3001

        - **Observação**: a parte frontend possui uma imagem 3x maior; não estranhe se levar alguns segundos a mais para carregar;

- Segue a estrutura construída na imagem Docker:

    - A estrutura foi feita com base neste tutorial: https://medium.com/bb-tutorials-and-thoughts/react-local-development-with-docker-compose-5a247710f997 ;

    - Cada um dos dois diretórios conta com um **Dockerfile com uma imagem do tipo node (versão 16.17.1)**. Ela executa a instalação das dependências;

    - O arquivo que **executa os comandos e centraliza as ações** de forma eficaz é o **docker-compose.yml, no diretório inicial do projeto**. Os parâmetros definidos para as duas partes da aplicação são: build, ports, container_name e volumes. No frontend, ainda temos "stdin_open: true", para que o arquivo inicie num modo interativo e permita a navegação na aplicação React.

- Finalmente, **o Deploy/implantação do projeto foi realizado utilizando o Vercel**. A aplicação encontra-se no seguinte endereço:
    - **frontend** - https://todo-impulsionar-lucas-burch.vercel.app/
    
    - **server (backend)** - https://backend-impulsionar-lucas-burch.vercel.app/api/todo
