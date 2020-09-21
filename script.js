const listDisplayContainer = document.querySelector(
  '[data-list-display-container]'
);
const listProgressElement = document.querySelector('[data-list-progress]');
const listCompletionElement = document.querySelector('[data-list-completion]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const congratsElement = document.querySelector('[data-congrats]');
const resetTasksButton = document.querySelector('[data-reset-list]');

let tasks = [
  {
    id: '1',
    name: "Tâche 1 : Lire l'énoncé du test à réaliser",
    complete: false,
  },
  { id: '2', name: 'Tâche 2 : Faire du café', complete: false },
  { id: '3', name: "Tâche 3 : Relire attentivement l'énoncé", complete: false },
  { id: '4', name: 'Tâche 4 : Ouvrir son éditeur préféré', complete: false },
  { id: '5', name: 'Tâche 5 : Coder coder coder', complete: false },
  { id: '6', name: 'Tâche 6 : Tester & Déployer', complete: false },
  {
    id: '7',
    name: "Tâche 7 : Remercier Business Révolution pour l'opportunité !",
    complete: false,
  },
];

resetTasksButton.addEventListener('click', (e) => {
  let checkboxes = document.getElementsByTagName('input');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  tasks.forEach((task) => {
    task.complete = false;
  });

  resetTasksProgress();
});

tasksContainer.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedTask = tasks.find((task) => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    renderTasksProgress();
  }
});

function renderTasks() {
  tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);

    tasksContainer.appendChild(taskElement);
  });
}

function congrats() {
  congratsElement.classList.add('fade-in-and-out');
  setTimeout(function () {
    congratsElement.classList.remove('fade-in-and-out');
  }, 5000);
}

function renderTasksProgress() {
  const tasksCount = tasks.length;
  let completeTaskCount = tasks.filter((task) => task.complete).length;
  let completion = (100 / tasksCount) * completeTaskCount;
  listProgressElement.style.width = `${completion}%`;
  listCompletionElement.innerText = `${completion.toFixed(2)} %`;

  if (tasksCount == completeTaskCount) {
    congrats();
  }
}

function resetTasksProgress() {
  listProgressElement.style.width = '0%';
  listCompletionElement.innerText = '0.00 %';
}

function render() {
  renderTasks();
  renderTasksProgress();
}

render();
