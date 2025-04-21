import { api } from './api.js';

const token = localStorage.getItem('token');
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

async function loadTasks() {
  const { data } = await api.getTasks(token);
  taskList.innerHTML = '';

  data.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.title}</span>
      <button onclick="editTask('${task._id}', '${task.title}')">✏️</button>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    `;
    taskList.appendChild(li);
  });
}

window.editTask = async (id, oldTitle) => {
  const newTitle = prompt('Editar tarefa:', oldTitle);
  if (newTitle && newTitle !== oldTitle) {
    await api.updateTask(token, id, { title: newTitle });
    loadTasks();
  }
};

window.deleteTask = async (id) => {
  if (confirm('Tem certeza que deseja deletar?')) {
    await api.deleteTask(token, id);
    loadTasks();
  }
};

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (title) {
    await api.createTask(token, { title });
    taskInput.value = '';
    loadTasks();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (!token) window.location.href = 'index.html';
  loadTasks();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
  
