const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const Respawn = require('./models/Respawn'); // Importa o modelo

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para permitir que o front-end acesse o back-end
app.use(cors());

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para lidar com dados JSON no corpo das requisições
app.use(express.json());

// Rota GET para a página principal. Agora aponta para a pasta 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- ROTAS DO BANCO DE DADOS ---

app.get('/api/respawns', async (req, res) => {
    try {
        const respawns = await Respawn.find();
        res.json(respawns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/respawns', async (req, res) => {
    try {
        const novoRespawn = await Respawn.create(req.body);
        res.status(201).json(novoRespawn);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});