const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const saltRounds = 10;

// Criar usuário
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.run(query, [name, email, hashedPassword], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email });
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar a senha.' });
  }
});

// Listar todos os usuários (protegido)
router.get('/', authenticateToken, (req, res) => {
  db.all(`SELECT id, name, email FROM users`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Buscar usuário por ID (protegido)
router.get('/:id', authenticateToken, (req, res) => {
  db.get(`SELECT id, name, email FROM users WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(row);
  });
});

// Atualizar usuário (protegido)
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;

    db.run(query, [name, email, hashedPassword, req.params.id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json({ message: "Usuário atualizado com sucesso" });
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// Deletar usuário (protegido)
router.delete('/:id', authenticateToken, (req, res) => {
  db.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ message: "Usuário deletado com sucesso" });
  });
});

module.exports = router;
