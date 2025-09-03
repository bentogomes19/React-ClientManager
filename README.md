# ClientManager

ClientManager é um sistema web para cadastro, visualização, edição e exclusão de clientes, desenvolvido com **C# .NET** no backend e **React + Tailwind CSS** no frontend. O projeto utiliza uma arquitetura **layered**, com separação clara entre API, serviços e frontend, e faz integração via requisições HTTP usando **Axios**.

---

## Funcionalidades

- **Cadastro de clientes** com validação de CPF.
- **Listagem de clientes** cadastrados.
- **Exclusão de clientes** com atualização automática da lista.
- **Máscara de CPF** enquanto digita.
- **Validações HTML5** em todos os campos do formulário (required, maxLength, min, step, pattern, etc).
- **Estilização** moderna usando Tailwind CSS e CSS personalizado.

---

## Tecnologias Utilizadas

**Backend:**
- C# .NET 8
- ASP.NET Web API
- Arquitetura Layered (Controllers, Services, Repositories)
- Validação de CPF e regras de negócio

**Frontend:**
- React
- Axios para consumo da API
- Tailwind CSS e CSS personalizado

**Outras:**
- JSON como formato de dados
- VS Code / Visual Studio
- NPM / Node.js

---

---

## Instalação

### Backend

1. Abra a pasta `backend` no Visual Studio.
2. Restaure os pacotes NuGet.
3. Configure a conexão com o banco de dados no `appsettings.json`.
4. Execute a aplicação (`F5` ou `Ctrl+F5`).

### Frontend

1. Abra a pasta `frontend` no terminal.
2. Instale as dependências:

```bash
npm install


