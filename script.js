const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, digite uma tarefa.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.classList.add('task-item');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('action-btn', 'check-btn');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';

    checkBtn.addEventListener('click', () => {
        listItem.classList.toggle('completed');

        saveTasks();
    });
    actionsDiv.appendChild(checkBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('action-btn', 'delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks();

    })
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(actionsDiv);
    taskList.appendChild(listItem);

    taskInput.value = '';
    saveTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
        taskList.innerHTML = savedTasks;

        attachEventListenersToLoadedTasks();
    }
}

function attachEventListenersToLoadedTasks() {
    const taskItems = taskList.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const checkBtn = item.querySelector('.check-btn');
        const deleteBtn = item.querySelector('.delete-btn');

        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                item.classList.toggle('completed');
                saveTasks();
            });
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                taskList.removeChild(item);
                saveTasks();
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);
