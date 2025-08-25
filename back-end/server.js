const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Respawn = require('./models/Respawn'); // Importa o modelo

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB
mongoose.connect('mongodb://localhost:27017/ragnarok-respawn')
    .then(() => console.log('Conexão com o MongoDB estabelecida com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para permitir que o front-end acesse o back-end
const cors = require('cors');
app.use(cors());

// Middleware para servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../front-end')));

// Middleware para lidar com dados JSON no corpo das requisições
app.use(express.json());

// --- ROTAS DO BANCO DE DADOS ---

// Rota GET para listar todos os respawns
app.get('/api/respawns', async (req, res) => {
    try {
        const respawns = await Respawn.find();
        res.json(respawns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota POST para salvar um novo respawn
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