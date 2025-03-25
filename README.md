# 🧠 CRUD de Usuários com Node.js, Express, SQLite, JWT e Bcrypt

Este projeto é uma API RESTful para gerenciamento de usuários, com autenticação JWT e senhas criptografadas usando Bcrypt. Os dados são armazenados localmente em um banco de dados SQLite.

---

## ✅ Funcionalidades

- Criar usuário com senha criptografada
- Fazer login e receber token JWT
- Acessar rotas protegidas com token
- Atualizar ou excluir usuário
- Banco de dados SQLite criado automaticamente

---

## 🧰 Tecnologias Utilizadas

- Node.js
- Express
- SQLite3
- Bcrypt
- JSON Web Token (JWT)
- Body-parser

---

## 💻 Requisitos

- Node.js instalado (v14+)
- Git (opcional)

---

## 🚀 Instalação

```bash
# 1. Clone o repositório ou crie a pasta
git clone https://github.com/seu-usuario/crud-node-sqlite
cd crud-node-sqlite

# 2. Instale as dependências
npm install
```

---

## 🏁 Executando o projeto

```bash
# Inicie o servidor
node app.js
```

Você verá a mensagem:

```
🚀 Servidor rodando em http://localhost:3000
```

---

## 🗃️ Banco de dados

O banco `users.db` será criado automaticamente na pasta `database/` com a tabela `users`.

---

## 📫 Rotas da API

Use Insomnia, Postman ou qualquer cliente HTTP.

---

### 🔸 1. Criar usuário

**[POST]** `/users`

#### Corpo da requisição:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Resposta esperada:
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com"
}
```

---

### 🔸 2. Fazer login

**[POST]** `/auth/login`

#### Corpo da requisição:
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

#### Resposta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

---

### 🔸 3. Listar todos os usuários (protegido)

**[GET]** `/users`

#### Cabeçalho:
```
Authorization: Bearer <token>
```

#### Resposta:
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
]
```

---

### 🔸 4. Buscar um usuário (protegido)

**[GET]** `/users/:id`

#### Exemplo:
`/users/1`

#### Cabeçalho:
```
Authorization: Bearer <token>
```

---

### 🔸 5. Atualizar usuário (protegido)

**[PUT]** `/users/:id`

#### Exemplo:
`/users/1`

#### Corpo:
```json
{
  "name": "João Atualizado",
  "email": "joao@email.com",
  "password": "novaSenha123"
}
```

#### Cabeçalho:
```
Authorization: Bearer <token>
```

---

### 🔸 6. Deletar usuário (protegido)

**[DELETE]** `/users/:id`

#### Exemplo:
`/users/1`

#### Cabeçalho:
```
Authorization: Bearer <token>
```

---

## ⚠️ Observações

- Não esqueça de alterar a **chave secreta** do JWT (`SECRET_KEY`) no código para mais segurança.
- O token JWT expira em **1 hora**.
- O banco SQLite é salvo localmente como `./database/users.db`.

---

## 📂 Estrutura de Pastas

```
crud-node-sqlite/
├── app.js
├── database/
│   └── db.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── users.js
│   └── auth.js
├── package.json
```

---

## 👨‍💻 Autor

Desenvolvido por [Seu Nome Aqui] 💙  
Projeto para estudos de backend com autenticação segura.

---
