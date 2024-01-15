const todoContainer = document.getElementById("todo-container");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = [];

window.addEventListener("DOMContentLoaded", function () {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos();
});

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

todoContainer.addEventListener("click", function (event) {
  if (event.target.id === "add-button") {
    addTodo();
  } else if (event.target.classList.contains("delete-button")) {
    const todoItem = event.target.parentElement;
    const todoIndex = Array.from(todoList.children).indexOf(todoItem);
    removeTodo(todoIndex);
  }
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    todos.push(todoText);
    todoInput.value = "";
    renderTodos();
    saveTodosToLocalStorage();
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  renderTodos();
  saveTodosToLocalStorage();
}
function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(function (todo, index) {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    todoText.textContent = todo;
    todoText.classList.add("text-center");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(
      "delete-button",
      "ml-8",
      "w-10",
      "border-2",
      "border-solid",
      "rounded-md"
    );
    deleteButton.textContent = "X";

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

renderTodos();
