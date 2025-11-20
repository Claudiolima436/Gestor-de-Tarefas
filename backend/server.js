const express = require('express');
const cors = require('cors');
const openDb = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Teste (Ping)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor Express está funcionando!' });
});

// =========================================================================
// ROTAS CRUD - COM DOCUMENTAÇÃO SWAGGER CORRIGIDA
// =========================================================================


app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await db.all('SELECT * FROM tasks');
        const formattedTasks = tasks.map(task => ({
            ...task,
            completed: !!task.completed
        }));
        res.status(200).json(formattedTasks);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao buscar tarefas.' });
    }
});



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
        const newTask = { id: result.lastID, title, description, completed: false };
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar tarefa.' });
    }
});



app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; 

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



app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.run('DELETE FROM tasks WHERE id = ?', id);
        res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao excluir tarefa.' });
    }
});

// =========================================================================
// FUNÇÃO DE INICIALIZAÇÃO E SETUP DO BANCO DE DADOS
// =========================================================================

async function setup() {
    try {
        db = await openDb();
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor e conectar ao banco de dados:', error);
        process.exit(1);
    }
}

// Chama a função para iniciar tudo
setup();