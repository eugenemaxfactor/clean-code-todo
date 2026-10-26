const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const todoTaskList = document.getElementById("incompleteTasks");
const completedTaskList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  // Treat user input as text rather than HTML.
  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  listItem.append(checkbox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditing = listItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTaskList : todoTaskList;

  targetList.appendChild(listItem);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const checkbox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskStatus;
};

for (let i = 0; i < todoTaskList.children.length; i++) {
  bindTaskEvents(todoTaskList.children[i]);
}

for (let i = 0; i < completedTaskList.children.length; i++) {
  bindTaskEvents(completedTaskList.children[i]);
}
