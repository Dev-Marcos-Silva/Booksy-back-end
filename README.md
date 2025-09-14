# 📗 Booksy - Backend

API do sistema **Booksy**, responsável pelo gerenciamento de **usuários, bibliotecas, livros, pedidos e interações**.  
Construída com **Node.js + Fastify + TypeScript**, com autenticação JWT e persistência em PostgreSQL via Prisma ORM.

---

## 🚀 Tecnologias Utilizadas

- **Fastify** → framework web rápido e minimalista  
- **TypeScript** → tipagem estática  
- **Prisma ORM** → ORM para PostgreSQL  
- **PostgreSQL** (via Docker + Bitnami)  
- **JWT** com `@fastify/jwt` → autenticação  
- **BcryptJS** → hash de senha  
- **Zod** → validação e tipagem de dados  
- **Dotenv** → variáveis de ambiente  
- **@fastify/cors** → CORS  
- **@fastify/cookie** → cookies (refresh token)  
- **@fastify/multipart** → upload (fotos de perfil/avatares)  
- **@fastify/static** → servir arquivos estáticos  

---

## 🔑 Autenticação & Roles

- Autenticação com **JWT (access + refresh token)**  
- Refresh token armazenado em **cookies HTTPOnly + Secure**  
- **Roles (RBAC):**
  - `user` → usuários da plataforma  
  - `library` → bibliotecas que cadastram livros e gerenciam pedidos  

---

## 🔐 Autenticação

| Método | Rota             | Descrição                                      |
|--------|-----------------|-----------------------------------------------|
| POST   | `/session`       | Autentica usuário ou biblioteca e retorna tokens (access + refresh) |
| POST   | `/refresh/token` | Renova o **access token** usando o refresh token |

---

## 👤 Usuários

| Método | Rota                     | Autenticação | Descrição |
|--------|--------------------------|-------------|-----------|
| POST   | `/user`                  | ❌           | Cadastra um novo usuário |
| GET    | `/user/profile/:id`      | ✅ JWT      | Obtém informações do perfil de um usuário específico |
| PATCH  | `/user/update/:id`       | ✅ JWT      | Atualiza informações do usuário |
| POST   | `/user/address/:id`      | ✅ JWT      | Adiciona ou atualiza endereço do usuário |
| PATCH  | `/user/avatar/:id`       | ✅ JWT      | Atualiza foto de perfil do usuário  |

---

## 🏛 Bibliotecas

| Método | Rota                           | Autenticação | Descrição |
|--------|--------------------------------|-------------|-----------|
| POST   | `/library/:id`                 | ✅ JWT      | Cadastra uma biblioteca  |
| GET    | `/library/profile/:id`         | ✅ JWT      | Obtém informações do perfil de uma biblioteca |
| PATCH  | `/library/avatar/:id`          | ✅ JWT + Role `library` | Atualiza foto de perfil da biblioteca  |
| PATCH  | `/library/update/:id`          | ✅ JWT + Role `library` | Atualiza informações do perfil da biblioteca |

---

## 📖 Livros

| Método | Rota                          | Autenticação | Descrição |
|--------|-------------------------------|-------------|-----------|
| POST   | `/register/book/:id`           | ✅ JWT + Role `library` | Cadastra um livro |
| GET    | `/book/:id`                    | ✅ JWT      | Obtém informações de um livro específico |
| GET    | `/search/book`                 | ✅ JWT      | Pesquisa livros por título ou autor |
| GET    | `/category/book`               | ✅ JWT      | Filtra livros por categoria |
| GET    | `/rateds/book/:id`             | ✅ JWT      | Lista livros mais avaliados de um usuário/biblioteca |
| GET    | `/recents/book/:id`            | ✅ JWT      | Lista livros recém adicionados |
| GET    | `/library/book/:id`            | ✅ JWT + Role `library` | Lista livros cadastrados pela biblioteca |
| PATCH  | `/update/book/:id`             | ✅ JWT + Role `library` | Atualiza informações do livro |
| PATCH  | `/image/book/:id`              | ✅ JWT + Role `library` | Atualiza imagem do livro |
| DELETE | `/delete/book/:id`             | ✅ JWT + Role `library` | Exclui livro e remove imagem associada |

---

## 📦 Pedidos

| Método | Rota                         | Autenticação | Descrição |
|--------|------------------------------|-------------|-----------|
| POST   | `/rented/book`               | ✅ JWT      | Cria um novo pedido de aluguel de livro |
| GET    | `/user/rented/book/:id`      | ✅ JWT      | Lista livros alugados pelo usuário |
| GET    | `/user/history/:id`          | ✅ JWT      | Lista histórico de livros concluídos do usuário |
| PATCH  | `/user/delete/:id`           | ✅ JWT      | Exclui histórico de livros do usuário |
| GET    | `/library/rented/book/:id`  | ✅ JWT + Role `library` | Lista pedidos de livros da biblioteca |
| PUT    | `/library/accept/:id`       | ✅ JWT + Role `library` | Aceita um pedido de livro |
| PUT    | `/library/deliver/:id`      | ✅ JWT + Role `library` | Confirma a entrega do livro ao usuário |
| PUT    | `/library/complete/:id`     | ✅ JWT + Role `library` | Confirma a devolução/conclusão do livro |

---

## 📝 Comentários

| Método | Rota                        | Autenticação | Descrição |
|--------|-----------------------------|-------------|-----------|
| POST   | `/comment/register`         | ✅ JWT      | Adiciona um comentário em um livro |
| GET    | `/comment/get/:id`          | ✅ JWT      | Lista os comentários de um livro específico |

---

## 💬 Respostas

| Método | Rota                          | Autenticação | Descrição |
|--------|-------------------------------|-------------|-----------|
| POST   | `/library/response`           | ✅ JWT + Role `library` | Biblioteca responde a um comentário de um livro |
| GET    | `/library/response/:id`       | ✅ JWT      | Lista respostas da biblioteca para os comentários de um livro |

---

## ⭐ Avaliações

| Método | Rota                         | Autenticação | Descrição |
|--------|------------------------------|-------------|-----------|
| POST   | `/assessment/register`       | ✅ JWT      | Adiciona uma avaliação (nota) a um livro |
| GET    | `/assessment/get/:id`        | ✅ JWT      | Lista as avaliações de um livro específico |

---

## ⭐ Favoritos

| Método | Rota                        | Autenticação | Descrição |
|--------|-----------------------------|-------------|-----------|
| POST   | `/favorite/register`        | ✅ JWT      | Adiciona um livro aos favoritos |
| GET    | `/favorite/get/:id`         | ✅ JWT      | Lista livros favoritados de um usuário |
| DELETE | `/favorite/delete`          | ✅ JWT      | Remove um livro dos favoritos |

---

## 📜 Regras de Negócio

- Usuário só pode definir **máx. 60 dias** para entrega  
- O prazo começa **apenas após a entrega**  
- Pedidos expiram em **48h** se não respondidos  
- Somente a **biblioteca** pode interagir com pedidos  

---

## 📐 Modelagem do Banco de Dados

Abaixo ficará o diagrama do banco de dados para referência das entidades e relacionamentos:

![Database Diagram](/docs/database.webp)

## ▶️ Como Executar o Projeto

### 1️⃣ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js
 (>= 20.x)

- npm
 ou yarn

- Docker
 (para subir o banco de dados PostgreSQL)


### 2️⃣ Clonar o repositório

```bash
# Clonar o repositório.
git clone https://github.com/Dev-Marcos-Silva/Booksy-back-end.git

# Entrar no projeto.
cd backend
```

### 3️⃣ Instalar dependências

```bash
# Instalar dependências.
npm install
```

### 4️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz do backend com as seguintes variáveis (exemplo):

```env
NODE_ENV="dev"

JWT_SECRET="apilibrary"

PORT="3333"

DATABASE_URL="postgresql://docker:docker@localhost:5432/apilibrary?schema=public"
```

### 5️⃣ Subir o banco de dados com Docker

```bash
# Isso vai subir um container do PostgreSQL com o banco apilibrary.
docker compose up -d
```

### 6️⃣ Rodar as migrations

```bash
# Isso vai rodar as migrations.
npx prisma migrate dev
```

### 7️⃣ Iniciar o servidor

```bash
# Isso vai iniciar o servidor.
npm run dev
```

## 🖥️ O backend ficará disponível em:
### 👉 http://localhost:3333
