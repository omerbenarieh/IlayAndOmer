/*
  Creators:
  Omer Ben Arieh 207229634
  Ilay Cohen
*/

//-------------------------------------------------\\
// Selecting elements
//-------------------------------------------------\\
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskListContainer = document.getElementById("task-list");
const deleteMarkedBtn = document.getElementById("delete-marked-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const markAsCompleteBtn = document.getElementById("mark-as-complete");
const completedTasksContainer = document.getElementById(
  "completed-tasked-list"
);

let toDoTasks = [];
let completedTasks = [];

//-------------------------------------------------\\
// Call Backs
//-------------------------------------------------\\
const addNewTaskClick = (e) => {
  // Check if task is valid
  const task = taskInput.value.trim();
  const taskLength = task.length;
  if (taskLength > 0 && taskLength < 30) {
    createTask(task);
  } else alert("Please Insert a valid task ⚠️");
  taskInput.value = "";
};

const addNewTaskPress = (e) => {
  const keyCode = e.keyCode;
  if (keyCode === 13) {
    const task = taskInput.value;
    const taskLength = taskInput.value.length;

    if (taskLength > 0 && taskLength < 30) {
      createTask(task);
    } else alert("Please Insert a valid task ⚠️");
  }
};

taskListContainer.addEventListener("click", (e) => {
  const index = toDoTasks.indexOf(e.target.parentNode.parentNode);
  const action = e.target.textContent;
  if (action === "❌") deleteTask(index);
  if (action === "⬆️") upTask(index);
  if (action === "⬇️") downTask(index);
});

const deleteTask = (index) => {
  toDoTasks.splice(index, 1);
  render();
};

const upTask = (index) => {
  if (toDoTasks.length > 1) {
    if (index > 0) {
      [toDoTasks[index], toDoTasks[index - 1]] = [
        toDoTasks[index - 1],
        toDoTasks[index],
      ];
    } else {
      [toDoTasks[index], toDoTasks[toDoTasks.length - 1]] = [
        toDoTasks[toDoTasks.length - 1],
        toDoTasks[index],
      ];
    }
  }
  render();
};

const downTask = (index) => {
  if (toDoTasks.length > 1) {
    if (index < toDoTasks.length - 1) {
      [toDoTasks[index], toDoTasks[index + 1]] = [
        toDoTasks[index + 1],
        toDoTasks[index],
      ];
    } else {
      [toDoTasks[index], toDoTasks[0]] = [toDoTasks[0], toDoTasks[index]];
    }
    render();
  }
};

const deleteAll = (e) => {
  toDoTasks.splice(0);
  render();
};

const deleteMarked = (e) => {
  toDoTasks = toDoTasks.filter((node) => !node.children[0].checked);
  render();
};

const addFinishedTask = (e) => {
  toDoTasks.forEach((task) => {
    if (task.children[0].checked) completedTasks.push(task);
  });
  toDoTasks = toDoTasks.filter((finished) => !finished.children[0].checked);
  editFinishedTasks();
  render();
};

// Helper fucntion \\
const editFinishedTasks = () => {
  // Defining Date \\
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const curDate = `${day}/${month}/${year} ${hour}:${
    minute < 10 ? `0${minute}` : minute
  }`;
  completedTasks.forEach((task, i) => {
    if (task.children[0] && task.children[1]) {
      task.removeChild(task.children[0]);
      task.removeChild(task.children[1]);
      task.textContent = `✅ '${task.textContent}' Task, Finished at ${curDate} ✅`;
    }
  });
};

const createTask = (task) => {
  const htmlString = `
    <input type="checkbox" class="checkbox">
    <p>${task}</p>
    <div>
      <button class="btns btn-direction">⬆️</button>
      <button class="btns btn-direction">⬇️</button>
      <button class="btns btn-delete">❌</button>
    </div>`;

  const newTask = document.createElement("li");
  newTask.className = "task";

  newTask.innerHTML = htmlString;
  toDoTasks.push(newTask);
  render();
};

//-------------------------------------------------\\
// Render Function
//-------------------------------------------------\\
const render = () => {
  taskInput.value = "";
  taskListContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  // Todo Tasks \\
  if (toDoTasks.length > 0) {
    toDoTasks.forEach((node) => {
      taskListContainer.insertAdjacentElement("beforeend", node);
    });
  }

  // Completed Tasks \\
  if (completedTasks.length > 0) {
    completedTasks.forEach((node) => {
      completedTasksContainer.insertAdjacentElement("beforeend", node);
    });
  }
};

//-------------------------------------------------\\
// Event Listeners
//-------------------------------------------------\\
addBtn.addEventListener("click", addNewTaskClick);
taskInput.addEventListener("keydown", addNewTaskPress);
deleteAllBtn.addEventListener("click", deleteAll);
deleteMarkedBtn.addEventListener("click", deleteMarked);
markAsCompleteBtn.addEventListener("click", addFinishedTask);
