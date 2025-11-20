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

// backend/server.js

// ... código anterior

// READ: Rota para obter todas as tarefas (GET /api/tasks)
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await db.all('SELECT * FROM tasks');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao buscar tarefas.' });
    }
});

// CREATE: Rota para criar uma nova tarefa (POST /api/tasks)
app.post('/api/tasks', async (req, res) => {
    const { title, description } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'O título é obrigatório.' });
    }

    try {
        const result = await db.run(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description]
        );
        // Retorna a tarefa criada com o ID gerado automaticamente
        const newTask = { id: result.lastID, title, description, completed: 0 };
        res.status(201).json(newTask); // Status 201 significa "Criado"
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar tarefa.' });
    }
});

// UPDATE: Rota para marcar/desmarcar uma tarefa (PUT /api/tasks/:id)
app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // Espera receber { completed: 1 } ou { completed: 0 }

    if (completed === undefined) {
        return res.status(400).json({ error: 'O campo "completed" é obrigatório.' });
    }

    try {
        await db.run(
            'UPDATE tasks SET completed = ? WHERE id = ?',
            [completed ? 1 : 0, id]
        );
        res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar tarefa.' });
    }
});

// DELETE: Rota para excluir uma tarefa (DELETE /api/tasks/:id)
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.run('DELETE FROM tasks WHERE id = ?', id);
        res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao excluir tarefa.' });
    }
});

// ... código do setup() abaixo

// ... Adicione as outras rotas abaixo

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