// backend/server.js
const express = require('express');
const cors = require('cors');
const openDb = require('./database'); // <<< 1. IMPORTAÇÃO DA CONEXÃO DB

const app = express();
const PORT = process.env.PORT || 3000; 
let db; // <<< 2. VARIÁVEL GLOBAL PARA ARMAZENAR A CONEXÃO

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Rota de Teste (Ping)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor Express está funcionando!' });
});

// >>> 3. FUNÇÃO DE SETUP PARA ABRIR O BANCO E INICIAR O SERVIDOR <<<
async function setup() {
    try {
        // 1. Abre o banco de dados e salva a conexão na variável 'db'
        db = await openDb();

        // 2. Inicia o Servidor (só depois que o banco estiver conectado)
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor e conectar ao banco de dados:', error);
        process.exit(1); // Sai do processo se houver erro
    }
}

// Chama a função para iniciar tudo
setup();