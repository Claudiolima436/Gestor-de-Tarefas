// backend/database.js
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Nome do arquivo do banco de dados (será criado na pasta backend)
const dbFile = path.resolve(__dirname, 'tasks.db');

async function openDb() {
    // Abre a conexão com o banco de dados
    const db = await sqlite.open({
        filename: dbFile,
        driver: sqlite3.Database // Usa o driver do sqlite3
    });

    // Cria a tabela 'tasks' se ela ainda não existir
    await db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN NOT NULL DEFAULT 0
        );
    `);
    
    // Mostra uma mensagem no console para confirmar que a tabela foi criada
    console.log('✅ Banco de dados conectado e tabela "tasks" verificada.');

    return db;
}

// Exporta a função para que ela possa ser usada no server.js
module.exports = openDb;