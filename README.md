<h1 align='center'>FoodExplorer Back-End 🍔</h1>

<p align="center">
  API do FoodExplorer: Um sistema para gerenciar pratos, administradores e muito mais.
</p>

<p align="center">
  <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a> |
  <a href="#instalação">Instalação</a> |
  <a href="#configuração">Configuração</a> |
  <a href="#uso">Uso</a> |
  <a href="#deploy">Deploy</a> |
  <a href="#front-end">Front-End</a> |
  <a href="#licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>


## Sobre o Projeto 📖
A API do FoodExplorer desempenha um papel fundamental ao fornecer funcionalidades essenciais para a sua aplicação, capacitando o seu restaurante fictício.

### Funcionalidades Principais
- Criação, atualização e exclusão de pratos com informações detalhadas, como imagem, nome, categoria, descrição, ingredientes e preço.
- Criação de usuários administradores com privilégios especiais para gerenciar o restaurante.
- Autenticação e geração de tokens JWT para proteger rotas sensíveis.
- Integração com um banco de dados SQLite para armazenar dados de forma segura e eficiente.

## Tecnologias Utilizadas 🛠️
- Node.js
- Express
- SQLite
- Knex
- bcryptjs
- jsonwebtoken
- cors
- multer
- dotenv
- pm2

## Instalação ⚙️
Siga os passos abaixo para instalar e configurar o projeto:

1. Clone o repositório: <br>
 ```
  $ git clone https://github.com/viniciuspra/FoodExplorer-BackEnd.git
 ```

2. Acesse o diretório do projeto:
 ```
  $ cd [DIRETÓRIO_DO_PROJETO]
 ```

3. Instale as dependências:
 ```
  $ npm install
 ```

4. Execute as migrações do banco de dados:
```
 $ npm run migrate
```

## Criação de Admin

Para criar um administrador, utilize o seguinte comando:

```
$ npm run createAdmin
```

Este comando permitirá que você configure um usuário administrador para gerenciar o FoodExplorer. Caso já exista um administrador, este comando permitirá que você atualize as informações de login, como nome, email e senha, no arquivo createAdminUser.js. Certifique-se de seguir as instruções fornecidas durante o processo de criação ou atualização do administrador.


## Configuração 🔧
Antes de executar o projeto, é necessário configurar as variáveis de ambiente. Siga as etapas abaixo:

1. Renomeie o arquivo `.env.example` para `.env`.
2. Abra o arquivo `.env` e preencha as seguintes variáveis de ambiente:
- `PORT` - porta em que o servidor será executado (por exemplo, 3000).
- `AUTH_SECRET` - chave secreta para geração de tokens JWT.

## Uso 🚀
Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```
 $ npm run dev
```
O servidor será iniciado na porta especificada no arquivo `.env`.

## Deploy 🚀
A aplicação FoodExplorer Backend foi implantada no [Render](https://dashboard.render.com) e está disponível no seguinte URL: [https://foodexplorer-backend-x8wa.onrender.com](https://foodexplorer-backend-x8wa.onrender.com).

## Front-End 💻
Você pode encontrar o front-end correspondente do projeto FoodExplorer no seguinte repositório: [FoodExplorer Front-End](https://github.com/viniciuspra/FoodExplorer).

## Licença 📄
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.


