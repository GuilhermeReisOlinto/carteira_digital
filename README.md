# Carteira Digital - API

API de carteira digital desenvolvida por Guilherme Olinto.

## Descrição

Esta API de carteira digital permite criar aplicações, autenticar, verificar saldo, inserir saldo, transferir dinheiro entre contas e confirmar transferências.

## Endpoints

- `POST /api/v1/create`: Cria uma nova aplicação.
- `POST /api/v1/authenticated`: Autentica a aplicação.
- `GET /api/v1/balance`: Retorna o saldo da conta.
- `GET /api/v1/find/account`: Retorna dados da conta.
- `POST /api/v1/insert/balance`: Insere saldo na conta.
- `POST /api/v1/transfer`: Transfere dinheiro entre contas.
- `POST /api/v1/confirm/transfer`: Confirma a transferência de dinheiro.

## Instalação

Certifique-se de ter o Node.js e o npm instalados. Em seguida, instale as dependências do projeto:


## Configuração

Antes de iniciar o servidor, é necessário configurar as variáveis de ambiente. Siga os passos abaixo:

1. Crie um arquivo `.env` na raiz do projeto.

2. Adicione as seguintes variáveis de ambiente no arquivo `.env`:

   ```dotenv
   APP_PORT=3000
   AUTHORIZATED_URL=http://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc
   SEND_SMS_URL=https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6
   DB_CONNECTION_STRING=sqlite://caminho-para-o-seu-arquivo-sqlite.db

  ```


## Uso

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm install
npm run start:dev

```
O servidor será iniciado em http://localhost:3000 por padrão.


## Contribuição
Este projeto foi desenvolvido por Guilherme Olinto e não está aberto para contribuições externas no momento.


## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.