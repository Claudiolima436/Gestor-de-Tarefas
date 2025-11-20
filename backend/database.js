// backend/database.js
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Caminho absoluto para onde o arquivo do banco de dados será criado
const dbFile = path.resolve(__dirname, 'tasks.db');

async function openDb() {
    // Abre a conexão com o banco de dados
    const db = await sqlite.open({
        filename: dbFile,
        driver: sqlite3.Database 
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
    
    console.log('✅ Banco de dados conectado e tabela "tasks" verificada.');

    return db;
}

// Exporta a função para ser usada no server.js
module.exports = openDb;