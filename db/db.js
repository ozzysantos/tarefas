const dbName = "ProjetosOzzyDB";
const dbVersion = 1;
let db;

function openDB() {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("tarefas")) {
            db.createObjectStore("tarefas", { keyPath: "id", autoIncrement: true });
        }
    };

    return new Promise((resolve, reject) => {
        request.onsuccess = function(event) {
            db = event.target.result;
            resolve();
        };

        request.onerror = function(event) {
            reject("Erro ao abrir o banco de dados.");
        };
    });
}

function addTarefa(tarefaText) {
    const transaction = db.transaction("tarefas", "readwrite");
    const store = transaction.objectStore("tarefas");

    const tarefa = { text: tarefaText };
    store.add(tarefa);
}

function getTarefas() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("tarefas", "readonly");
        const store = transaction.objectStore("tarefas");
        const request = store.getAll();

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject("Erro ao obter as tarefas do banco de dados.");
        };
    });
}

function deleteTarefa(id) {
    const transaction = db.transaction("tarefas", "readwrite");
    const store = transaction.objectStore("tarefas");
    store.delete(id);
}

openDB().catch(error => console.error(error));
