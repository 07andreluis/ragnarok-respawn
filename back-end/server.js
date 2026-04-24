const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const Respawn = require('./models/Respawn'); // Importa o modelo

const app = express();
const PORT = process.env.PORT || 3000;

// Variável de cache para a conexão no ambiente Serverless (Vercel)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return; // Reutiliza a conexão existente
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log('Conexão com o MongoDB estabelecida (Serverless Mode)!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw error; // Lança o erro para ser capturado pelo middleware
    }
};

// Middleware para garantir conexão com o banco em todas as requisições /api
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        return res.status(500).json({ message: "Falha interna na conexão com o banco de dados (Cold Start)." });
    }
});

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
        const { monstro, horarioRespawn } = req.body;
        // Se já existir um monstro com esse nome, apenas atualiza o tempo dele.
        // Se não existir, cria um novo (upsert: true).
        const respawn = await Respawn.findOneAndUpdate(
            { monstro },
            { horarioRespawn },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(201).json(respawn);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Rota PATCH para atualizar as coordenadas do túmulo do MVP
app.patch('/api/respawns/:id/tumba', async (req, res) => {
    try {
        const { id } = req.params;
        const { tumbaX, tumbaY } = req.body;
        
        const respawn = await Respawn.findByIdAndUpdate(
            id,
            { tumbaX, tumbaY },
            { new: true }
        );

        if (!respawn) {
            return res.status(404).json({ message: 'Respawn não encontrado para atualizar túmulo.' });
        }

        res.json(respawn);
    } catch (err) {
        console.error("Erro ao atualizar o túmulo do respawn:", err);
        res.status(500).json({ message: err.message });
    }
});

// A Rota DELETE continua aqui
app.delete('/api/respawns/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Recebido pedido para excluir o respawn com ID:', id);
        const respawnExcluido = await Respawn.findByIdAndDelete(id);

        if (!respawnExcluido) {
            console.log('Documento não encontrado para o ID:', id);
            return res.status(404).json({ message: 'Respawn não encontrado.' });
        }

        console.log('Respawn excluído com sucesso!');
        res.json({ message: 'Respawn excluído com sucesso!' });
    } catch (err) {
        console.error("Erro ao excluir o respawn:", err);
        res.status(500).json({ message: err.message });
    }
});

// Exporta o app para que a Vercel possa usá-lo como Serverless Function adequadamente
module.exports = app;