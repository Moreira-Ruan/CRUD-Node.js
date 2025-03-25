const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
