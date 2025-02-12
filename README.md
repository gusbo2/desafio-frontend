# README

## Tecnologias Utilizadas
O projeto foi construído utilizando as seguintes tecnologias:
- **Next.js**
- **Redux**
- **JSON Server**

## Configuração e Execução do Projeto
Para configurar e executar o projeto, siga os passos abaixo:

1. Instale as bibliotecas necessárias:
   ```sh
   npm i
   ```

2. Inicie o JSON Server para simular a API:
   ```sh
   json-server --watch db.json -p 4000
   ```

3. Inicie o ambiente de desenvolvimento do Next.js:
   ```sh
   npm run dev
   ```

4. Para abrir o projeto, acesse no navegador: 
   ```
   http://localhost:3000
   ```

## Rodando os Testes
Para rodar os testes, siga os passos abaixo:

1. Renomeie o arquivo `babel_template.config.js` para `babel.config.js`:
   ```sh
   mv babel_template.config.js babel.config.js
   ```

2. Execute os testes:
   ```sh
   npm test
   ```

> **Observação:** Para rodar o Next.js normalmente, o arquivo deve permanecer como `babel_template.config.js`.

## Funcionalidades Implementadas
A aplicação permite a **criação** e **listagem** de transações financeiras, além das seguintes operações:
- Editar transações existentes
- Excluir transações
- filtrar e ordernar as transações
- calcular e exibir o total de transações na listagem

## Estrutura do Projeto
O projeto segue a seguinte estrutura de diretórios:

- **`api/`** - Responsável pela comunicação com a API.
- **`components/`** - Contém todos os componentes reutilizáveis da aplicação.
- **`services/`** - Camada lógica da aplicação, intermediando a comunicação entre a API e a interface.
- **`database/`** - Contém toda a informação do Redux.
- **`enums/`** - Contém os enumeradores utilizados na aplicação.
- **`tests/`** - Diretório que contém os testes automatizados.
- **`utils/`** - Contém funções reutilizáveis para a aplicação.
