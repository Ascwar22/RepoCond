// Selezione degli elementi DOM
const addButton = document.getElementById('add-btn');
const inputField = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Funzione per aggiungere un nuovo item
function addTodo() {
    const todoText = inputField.value.trim();

    // Controlla se l'input non è vuoto
    if (todoText !== '') {
        // Crea un nuovo elemento della lista
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        
        // Aggiungi il testo dell'attività
        todoItem.textContent = todoText;

        // Crea il bottone di eliminazione
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () {
            todoItem.remove();
        };

        // Aggiungi il bottone di eliminazione all'elemento della lista
        todoItem.appendChild(deleteButton);

        // Aggiungi l'elemento della lista al DOM
        todoList.appendChild(todoItem);

        // Pulisci l'input
        inputField.value = '';
    }
}

// Funzione per segnare l'item come completato
function toggleCompletion(event) {
    const todoItem = event.target;

    if (todoItem.classList.contains('todo-item')) {
        todoItem.classList.toggle('completed');
    }
}

// Aggiungi l'evento di click al pulsante per aggiungere
addButton.addEventListener('click', addTodo);

// Aggiungi l'evento di pressione del tasto Enter per aggiungere un'attività
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Aggiungi l'evento di clic per segnare gli item come completati
todoList.addEventListener('click', toggleCompletion);
