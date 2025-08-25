const mongoose = require('mongoose');

// Define a estrutura do documento (o 'card' do monstro)
const respawnSchema = new mongoose.Schema({
    monstro: {
        type: String,
        required: true
    },
    horarioRespawn: {
        type: Date,
        required: true
    }
});

// Cria e exporta o modelo, que será usado para interagir com o banco de dados
module.exports = mongoose.model('Respawn', respawnSchema);