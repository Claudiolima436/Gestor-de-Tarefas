// frontend/script.js

// URL base da sua API rodando localmente
const API_URL = 'http://localhost:3000/api/tasks';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Função para renderizar uma única tarefa na lista
    const renderTask = (task) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.setAttribute('data-id', task.id);

        taskItem.innerHTML = `
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description || 'Sem descrição.'}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Desfazer' : 'Concluir'}</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;

        // Lógica dos Botões (Update e Delete)
        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            toggleComplete(task.id, !task.completed);
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task.id);
        });

        return taskItem;
    };

    // ----------------------------------------------------
    // FUNÇÕES DE CONEXÃO COM A API (CRUD)
    // ----------------------------------------------------

    // READ (GET) - Carrega todas as tarefas do servidor
    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const tasks = await response.json();
            
            taskList.innerHTML = ''; // Limpa a lista
            tasks.forEach(task => {
                taskList.appendChild(renderTask(task));
            });
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            alert('Não foi possível conectar ao servidor backend.');
        }
    };

    // CREATE (POST) - Adiciona uma nova tarefa
    const addTask = async (title, description) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            
            if (response.ok) {
                // Se a API retornar sucesso, recarrega a lista para mostrar a nova tarefa
                await fetchTasks(); 
                document.getElementById('task-title').value = '';
                document.getElementById('task-description').value = '';
            } else {
                alert('Falha ao adicionar tarefa.');
            }
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    // UPDATE (PUT) - Marca/Desmarca tarefa como concluída
    const toggleComplete = async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                // Recarrega a lista após a atualização
                await fetchTasks();
            } else {
                alert('Falha ao atualizar status.');
            }
        } catch (error) {
            console.error('Erro ao marcar como concluído:', error);
        }
    };

    // DELETE (DELETE) - Exclui a tarefa
    const deleteTask = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Recarrega a lista após a exclusão
                await fetchTasks();
            } else {
                alert('Falha ao excluir tarefa.');
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };
    
    // Evento de Submissão do Formulário
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;

        if (title) {
            addTask(title, description);
        }
    });

    // Carrega as tarefas existentes quando a página é aberta
    fetchTasks();
});