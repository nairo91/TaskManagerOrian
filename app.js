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

// Statistiques — non implémentées (lot #09)
function updateStats() {}

// Rendu — implémenté lot #02
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
    `;
    list.appendChild(li);
  });
}

// Ajout — non implémenté (lot #03)
document.getElementById('task-form').addEventListener('submit', e => { e.preventDefault(); });

// Suppression — non implémentée (lot #05)
function deleteTask(id) {}

// Modification — non implémentée (lot #04)
function openEdit(id) {}
document.getElementById('save-edit').addEventListener('click', () => {});
document.getElementById('cancel-edit').addEventListener('click', closeModal);
document.getElementById('edit-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() { document.getElementById('edit-modal').classList.add('hidden'); editingId = null; }

// Filtres — non implémentés (lot #07)
document.querySelectorAll('.filter-btn').forEach(btn => { btn.addEventListener('click', () => {}); });

loadTasks();
render();