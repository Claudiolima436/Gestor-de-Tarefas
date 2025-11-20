document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    const renderTask = (task) => {
        // [CÓDIGO DA FUNÇÃO RENDERIZAR TAREFA E BOTÕES] - Use o código JS que já validamos!
        // ...
        // (Por brevidade, não estou repetindo a função completa aqui, mas use a versão final que testamos.)
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        // Lógica temporária: Pega dados do formulário
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        
        const newTask = {
            id: Date.now(), 
            title: titleInput.value,
            description: descriptionInput.value,
            completed: false
        };

        // Renderiza a tarefa (sem salvar no banco ainda)
        // renderTask(newTask); 
        
        // Limpa o formulário
        titleInput.value = '';
        descriptionInput.value = '';

        // **NOTA DIDÁTICA: O CÓDIGO DE CONEXÃO COM A API ENTRARÁ AQUI!**
    });

    // Código para renderizar tarefas de teste (simuladas) se desejar.
});