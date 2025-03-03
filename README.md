# My Dev Portfólio

## Descrição do Projeto

**My Dev Portfólio** é um portfólio para desenvolvedores que exibe skills, experiências e projetos. Além disso, integra um blog com um editor de texto personalizado, permitindo que o autor crie e gerencie posts de forma intuitiva. O projeto é organizado como um monorepo, facilitando a manutenção e escalabilidade dos diversos pacotes e aplicações.

![DevProtfolio_1](https://github.com/user-attachments/assets/996193f5-03ab-4681-842f-70efb7b99c98)

![DevProtfolio](https://github.com/user-attachments/assets/d205686b-2a67-4f33-ae42-5770d8ab0623)

## Funcionalidades

- **Portfólio Dev:** Exibição de skills, experiências e projetos.
- **Blog Integrado:** Editor de texto personalizado (Tiptap) para criação e edição de posts.
- **Estrutura Monorepo:** Organização que centraliza aplicações e pacotes compartilhados, otimizando o desenvolvimento.

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - Next.js
  - ShadCn UI
  - Typescript
  - Javascript
  - Tiptap

- **Backend:**
  - Node
  - fastify
  - JWT
  - Zod
  - Postgresql

- **Outras Tecnologias:**  
  - E outras dependências e utilitários que complementam a stack.

## Estrutura do Projeto

```plaintext
my-dev-portfolio/
├── apps/
│   ├── web/       # Aplicação Next.js (React)
│   └── api/       # API com Node, fastify, JWT, Zod, etc.
├── packages/      # Componentes e bibliotecas compartilhadas
└── README.md
```

## Pré-requisitos

- **Node.js:** Versão LTS recomendada.
- **Gerenciador de pacotes:** npm ou yarn.
- **Banco de Dados:** PostgreSQL.

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- **PORT:** Porta em que o servidor backend irá rodar.
- **DATABASE_URL:** URL de conexão com o banco de dados PostgreSQL.
- **API_URL:** URL base da API.
- **JWT_SECRET:** Chave secreta para assinatura dos tokens JWT.
- **NEXT_PUBLIC_API_URL:** URL pública da API utilizada pelo frontend.

Crie um arquivo `.env` na raiz do projeto (ou em cada aplicação conforme necessário) e adicione as variáveis com seus respectivos valores:

```bash
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
API_URL=http://localhost:3000
JWT_SECRET=sua_chave_secreta
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/jeanpj12/My-Dev-Portfolio.git
   cd my-dev-portfolio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**

   Renomeie o arquivo `.env.example` (caso exista) para `.env` e preencha as informações necessárias conforme descrito acima:

   ```bash
   cp .env.example .env
   ```

4. **Execute o projeto:**

   Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## Uso

Após iniciar o projeto, o frontend estará disponível (geralmente em [http://localhost:3000](http://localhost:3000)) e o backend na porta configurada em suas variáveis de ambiente ou na porta 3333 por poadrão. Explore as funcionalidades do portfólio e utilize o editor do blog para criar posts.

## Contribuição

Contribuições são muito bem-vindas! Para contribuir, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Realize as alterações necessárias e faça commit:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie sua branch para o repositório remoto:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um pull request detalhando suas mudanças.

## Licença

Distribuído sob a [Licença MIT](LICENSE). Consulte o arquivo `LICENSE` para mais detalhes.

## Contato

Seu Nome - [jeanpj12@gmail.com](mailto:jeanpj12@gmail.com)

Projeto no GitHub: [https://github.com/jeanpj12/My-Dev-Portfolio](https://github.com/jeanpj12/My-Dev-Portfolio)
