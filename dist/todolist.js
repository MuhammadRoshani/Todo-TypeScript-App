"use strict";
const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodos = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todoList");
// array for local storage:
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
// handleSubmit func:
const handelSubmit = (event) => {
    event.preventDefault();
    // check input value is empty or not and check additional space, if empty nothing happen and not add anything to dom.
    const value = todoValue.value.trim();
    if (!value) {
        alert("please fill in the input");
        return;
    }
    const newTodo = {
        id: crypto.randomUUID(),
        title: todoValue.value,
        isCompleted: false,
    };
    addTodoToDom(newTodo);
    todos.push(newTodo);
    saveTodosInLocalStorage();
    todoValue.value = "";
    todoValue.focus();
};
// addTodoToDom func:
const addTodoToDom = (todo) => {
    todoList.insertAdjacentHTML("beforeend", `
         <li onclick="toggleTodo('${todo.id}')" class="${todo.isCompleted ? "completed" : ""}">
        ${todo.title}
        <span class="icon" onclick="event.stopPropagation(); removeTodo('${todo.id}')">
          <i class="fas fa-trash"></i>
        </span>
      </li>
    `);
};
// handleEnter
const handleEnter = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handelSubmit(event);
    }
};
todoValue.addEventListener("keydown", handleEnter);
// saveTodosInLocalStorage func:
const saveTodosInLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
};
// removeTodo func:
const removeTodo = (todoID) => {
    todos = todos.filter((todo) => todo.id !== todoID);
    saveTodosInLocalStorage();
    todoList.innerHTML = "";
    todos.forEach((todo) => addTodoToDom(todo));
};
// toggleTodo func:
const toggleTodo = (todoID) => {
    todos = todos.map((todo) => {
        if (todo.id === todoID) {
            return {
                ...todo,
                isCompleted: !todo.isCompleted,
            };
        }
        return todo;
    });
    saveTodosInLocalStorage();
    todoList.innerHTML = "";
    todos.forEach((todo) => addTodoToDom(todo));
};
// events:
addTodo.addEventListener("click", (event) => handelSubmit(event));
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach((todo) => addTodoToDom(todo));
});
clearTodos.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos = [];
    saveTodosInLocalStorage();
});
//# sourceMappingURL=todolist.js.map