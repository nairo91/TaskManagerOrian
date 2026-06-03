'use strict';

let tasks = [];
let editingId = null;
let currentFilter = 'all';

const STORAGE_KEY = 'taskmanager-cpi-v1';
const STATUS_LABELS = { todo: 'À faire', inprogress: 'En cours', done: 'Terminé' };
const PRIORITY_LABELS = { low: 'Basse', medium: 'Moyenne', high: 'Haute' };

function genId() {
  return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
}
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function saveTasks() {}
function loadTasks() {}

function updateStats() {}

function render() {
  const list = document.getElementById('task-list');
  const emptyMsg = document.getElementById('empty-msg');
  list.innerHTML = '';
  if (tasks.length === 0) {
    emptyMsg.classList.remove('hidden');
    return;
  }
  emptyMsg.classList.add('hidden');
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    li.innerHTML = `
      <span class="task-title">${escHtml(task.title)}</span>
      <span class="task-status">${STATUS_LABELS[task.status] || task.status}</span>
      <button onclick="openEdit('${task.id}')">Modifier</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById('task-form').addEventListener('submit', e => {
  e.preventDefault();
  const titleInput = document.getElementById('task-title');
  const title = titleInput.value.trim();
  if (!title) {
    document.getElementById('title-error').classList.remove('hidden');
    return;
  }
  document.getElementById('title-error').classList.add('hidden');
  const newTask = {
    id: genId(),
    title,
    description: document.getElementById('task-desc').value.trim(),
    status: document.getElementById('task-status').value,
    priority: document.getElementById('task-priority').value,
    createdAt: Date.now()
  };
  tasks.push(newTask);
  saveTasks();
  render();
  titleInput.value = '';
  document.getElementById('task-desc').value = '';
});

// Suppression — non implémentée (lot #05)
function deleteTask(id) {}

// Modification — implémentée lot #04
function openEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  editingId = id;
  document.getElementById('edit-title').value = task.title;
  document.getElementById('edit-desc').value = task.description || '';
  document.getElementById('edit-status').value = task.status;
  document.getElementById('edit-priority').value = task.priority;
  document.getElementById('edit-modal').classList.remove('hidden');
}

document.getElementById('save-edit').addEventListener('click', () => {
  if (!editingId) return;
  const idx = tasks.findIndex(t => t.id === editingId);
  if (idx === -1) return;
  tasks[idx].title = document.getElementById('edit-title').value.trim();
  tasks[idx].description = document.getElementById('edit-desc').value.trim();
  tasks[idx].status = document.getElementById('edit-status').value;
  tasks[idx].priority = document.getElementById('edit-priority').value;
  saveTasks();
  render();
  closeModal();
});

document.getElementById('cancel-edit').addEventListener('click', closeModal);
document.getElementById('edit-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() { document.getElementById('edit-modal').classList.add('hidden'); editingId = null; }

// Filtres — non implémentés (lot #07)
document.querySelectorAll('.filter-btn').forEach(btn => { btn.addEventListener('click', () => {}); });

loadTasks();
render();