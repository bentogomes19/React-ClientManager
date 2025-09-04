# ClientManager

ClientManager é um sistema web para cadastro, visualização, edição e exclusão de clientes, desenvolvido com **C# .NET** no backend e **React + Tailwind CSS** no frontend. O projeto utiliza uma arquitetura **layered**, com separação clara entre API, serviços e frontend, e faz integração via requisições HTTP usando **Axios**.

---

## Finalidade

Este é um passo a passo para realizar a instalação das dependências.

## Tecnologias Utilizadas

- React + Vite
- Axios para consumo da API
- Tailwind CSS

---

## 📂 Estrutura de pastas

```bash
client/
├─ public/
│  └─ logo.svg                # Logo do projeto
├─ src/
│  ├─ layouts/                # Componentes de layout (ex: header, sidebar)
│  ├─ pages/                  # Páginas do sistema (ex: Dashboard, Clientes)
│  ├─ routes/                 # Configuração de rotas do React Router
│  ├─ services/               # Serviços para comunicação com a API (axios, fetch)
│  ├─ types/                  # Tipagens TypeScript (DTOs, interfaces)
│  ├─ utils/                  # Funções utilitárias (ex: formatação de CPF)
│  ├─ index.css               # Estilos globais
│  ├─ main.tsx                # Ponto de entrada do React
├─ .gitignore                 # Arquivos/pastas ignorados pelo Git
├─ package.json               # Configuração do Node e dependências
├─ tailwind.config.js         # Configuração do Tailwind CSS
├─ postcss.config.js          # Configuração PostCSS
├─ vite.config.js             # Configuração do Vite
└─ README.md                  # Este arquivo
```

## Pré-requisitos

- [Node.js](https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi)
- [Git](https://git-scm.com/downloads/win)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/bentogomes19/React-ClientManager.git
cd ClientManager
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto localmente:

```bash
npm run dev
# App em http://localhost:5173
```
