# ✍️ Gestor de Tarefas Full Stack (Lista de Tarefas)

Aplicação Full Stack de Gerenciamento de Tarefas desenvolvida para demonstrar o domínio do ciclo **CRUD** (**Create, Read, Update, Delete**). O projeto integra **Front-end** (HTML/CSS/JS), **Back-end** (Node/Express) e **Banco de Dados** (SQLite), comprovando a habilidade de conectar todas as camadas de uma aplicação web.

---

## 💻 Stack Tecnológica (Tecnologias Utilizadas)

O projeto foi construído utilizando as seguintes ferramentas e linguagens:

* **Front-end:** HTML5, CSS3, JavaScript Puro (ES6+), e **Fetch API** para comunicação assíncrona.
* **Back-end:** Node.js, Express (para a criação da API RESTful) e **CORS** (para comunicação entre as camadas).
* **Banco de Dados:** SQLite3 (banco de dados leve baseado em arquivo) e o módulo `sqlite` para operações assíncronas.
* **Versionamento:** Git e GitHub.

---

---

## ⚙️ Como Rodar o Projeto Localmente

Siga estas instruções para clonar e executar a aplicação Full Stack em sua máquina.

### Pré-requisitos

Certifique-se de ter o **Node.js** (que inclui o NPM) e o **Git** instalados em seu sistema.

### 1. Clonar e Instalar Dependências

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Claudiolima436/Gestor-de-Tarefas.git](https://github.com/Claudiolima436/Gestor-de-Tarefas.git)
    ```

2.  **Acesse a pasta do Back-end:**
    ```bash
    cd Gestor-de-Tarefas/backend
    ```

3.  **Instale os pacotes do servidor (Express, CORS, SQLite):**
    ```bash
    npm install
    ```

### 2. Iniciar o Servidor (Back-end)

Com o terminal ainda dentro da pasta `/backend`, execute:

```bash
npm start