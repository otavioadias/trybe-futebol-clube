# Trybe Futebol Clube - TFC ⚽️
O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

# Rodar o projeto na sua máquina
- Clone o repositório `Usar link SSH`:
    * `git clone git@github.com:otavioadias/trybe-futebol-clube.git`

- Entre na pasta do repositório que você acabou de clonar:
    * `cd trybe-futebol-clube`

- Instale as dependênciatrybe-futebol-clubes
    * `npm install`

## ⚠️ Configurações mínimas para execução do projeto

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16 ou superior
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:

## 🐳 Configuração Docker

  ### Docker e Docker-compose
  ⚠ O seu docker-compose precisa estar na versão 1.29 ou superior.  ⚠

  - As pastas `frontend/` e `backend/` possuem um arquivo `Dockerfile` cada, configurados corretamente para a aplicação começar a rodar.

⚠️ **Observação:**

- O projeto contém um arquivo `docker-compose.yml` fornecido pela **Trybe**.
- O arquivo `docker-compose.yml` também pode ser utilizado para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` na raiz do projeto.

# ENDPOINTS
* No diretório backend existe o `thunder-collection_TFC.json` com todos os endpoits já prontos, necessário apenas mudar o `token` nos headers.
* Caso queira usar é necessário utilizar da extensão do ThunderClient.

# Estrutura do Projeto
O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front fornecido pela **Trybe** para realizar o projeto, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

# Testes de cobertura

* A construção de testes de cobertura no back-end foi feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`.
* Para rodar os testes:
 - `npm run test`

# Stack's utilizadas

* Node.js
* TypeScript
* Docker
* Express.js
* Sequelize
* SQL
* MySQL
* JOI
* BCrypt
* Mocha
* Chai
* Sinon