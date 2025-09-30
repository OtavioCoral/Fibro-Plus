// server.js

const express = require('express');
const app = express();
const pool = require('./dbconfig'); // Importa o pool de conexões do MySQL
const cors = require('cors');
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Bem-vindo à Fibro Plus!');
});

// Exemplo de como usar a conexão (apenas para teste inicial)
app.get('/test-dbconfig', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Conexão com DB bem-sucedida!', solution: rows[0].solution });
  } catch (error) {
    console.error('Erro na rota /test-dbconfig:', error);
    res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error: error.message });
  }
});

  // Função para registrar um novo usuário
app.post('/users/register', async (req, res) => {
  const { nome, CPF, email, password } = req.body;

  if (!nome || !CPF || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios: nome, CPF, email, password.' });
  }

  try {
    // 1. Verificar se o usuário ou e-mail já existem
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE nome = ? OR email = ?', [nome, email]);

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Nome de usuário ou e-mail já está em uso.' });
    }

    // 3. Inserir o novo usuário no banco de dados
    const [result] = await pool.query(
      'INSERT INTO users (nome, CPF, email, password) VALUES (?, ?, ?, ?)',
      [nome, CPF, email, password]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.insertId });

  } catch (error) {
    console.error('Erro no registro do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
  }
});

// Função para login de usuário
exports.login = async (req, res) => {
  const { identifier, password } = req.body; // 'identifier' pode ser nome ou email

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identificador (nome ou email) e senha são obrigatórios.' });
  }

  try {
    // 1. Encontrar o usuário pelo nome ou email
    const [users] = await pool.query(
      'SELECT id, nome, password, profile_picture_url FROM users WHERE nome = ? OR email = ?',
      [identifier, identifier]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = users[0];

    // 2. Comparar a senha fornecida com a senha criptografada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }


    res.status(200).json({
      message: 'Login bem-sucedido!',
      user: {
        id: user.id,
        username: user.username,
      }
    });

  } catch (error) {
    console.error('Erro no login do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao fazer login.' });
  }
};

  // Salvar pontos de dor selecionados
app.post("/user-pain", async (req, res) => {
  const { userId, points } = req.body; // points = [1, 3, 5]
  await db.saveUserPain(userId, points);
  res.json({ success: true, message: "Pontos de dor salvos com sucesso!" });
});
 
// Buscar pontos do usuário
app.get("/user-pain/:id", async (req, res) => {
  const userId = req.params.id;
  const pains = await db.getUserPain(userId);
  res.json(pains);
});

module.exports = app;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
