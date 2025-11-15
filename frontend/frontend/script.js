document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Remove o item de exemplo que está no HTML
    const exampleTask = document.querySelector('.task-item[data-id="exemplo"]');
    if (exampleTask) {
        exampleTask.remove();
    }

    // Função para renderizar um único item de tarefa (usada no CRUD - READ)
    const renderTask = (task) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('task-item');
        itemDiv.setAttribute('data-id', task.id);
        itemDiv.setAttribute('data-completed', task.completed);
        
        itemDiv.innerHTML = `
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description || 'Sem descrição.'}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Desfazer' : 'Concluir'}</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;
        
        // Adiciona funcionalidade aos botões (Lógica temporária)
        itemDiv.querySelector('.complete-btn').addEventListener('click', () => {
            // Lógica de UPDATE: Apenas alterna o estado visualmente por enquanto
            const isCompleted = itemDiv.getAttribute('data-completed') === 'true';
            itemDiv.setAttribute('data-completed', !isCompleted);
            // Isso será substituído pela requisição PUT/PATCH no futuro
        });

        itemDiv.querySelector('.delete-btn').addEventListener('click', () => {
            // Lógica de DELETE: Apenas remove do DOM por enquanto
            itemDiv.remove();
            // Isso será substituído pela requisição DELETE no futuro
        });

        taskList.prepend(itemDiv); // Adiciona a nova tarefa no topo da lista
    };

    // Lógica para Adicionar Nova Tarefa (CRUD - CREATE)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');

        const newTask = {
            // Usamos um ID temporário alto, pois os IDs reais virão do Back-end
            id: Date.now(), 
            title: titleInput.value,
            description: descriptionInput.value,
            completed: false
        };

        // --- ESTE CÓDIGO SERÁ SUBSTITUÍDO PELO FETCH (requisição HTTP) NA FASE 4 ---
        
        renderTask(newTask); // Renderiza a tarefa imediatamente

        // Limpa o formulário
        titleInput.value = '';
        descriptionInput.value = '';
    });
    
    // Simula algumas tarefas iniciais para testar o layout
    renderTask({ id: 1, title: 'Configurar Back-end Node.js', description: 'Começar a Fase 2 do projeto.', completed: false });
    renderTask({ id: 2, title: 'Revisar HTML e CSS', description: 'Garantir que o design responsivo esteja ok.', completed: true });

});