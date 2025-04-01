const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTableBody = document.getElementById('taskTableBody');
let tasks = [];
let editIndex = null;

function renderTasks() {
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task}</td>
            <td>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    if (editIndex !== null) {
        tasks[editIndex] = taskText;
        editIndex = null;
    } else {
        tasks.push(taskText);
    }

    taskInput.value = '';
    renderTasks();
}

function editTask(index) {
    taskInput.value = tasks[index];
    editIndex = index;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);