// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rota de Teste 
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Servidor Express está funcionando!', 
        status: 'online'
    });
});

// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});