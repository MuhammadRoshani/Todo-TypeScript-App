const todoValue = document.querySelector(".todo-value") as HTMLInputElement;
const addTodo = document.querySelector(".add-todo") as HTMLButtonElement;
const clearTodos = document.querySelector(".clear-todos") as HTMLButtonElement;
const todoList = document.querySelector(".todoList") as HTMLUListElement;

// interface:
interface ITodo {
  id: string;
  title: string;
  isCompleted: boolean;
}

// array for local storage:
let todos: ITodo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// handleSubmit func:
const handelSubmit = (event: Event) => {
  event.preventDefault();

  // check input value is empty or not and check additional space, if empty nothing happen and not add anything to dom.
  const value = todoValue.value.trim();

  if (!value) {
    alert("please fill in the input");
    return;
  }

  const newTodo: ITodo = {
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
const addTodoToDom = (todo: ITodo) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    `
         <li onclick="toggleTodo('${todo.id}')" class="${todo.isCompleted ? "completed" : ""}">
        ${todo.title}
        <span class="icon" onclick="event.stopPropagation(); removeTodo('${todo.id}')">
          <i class="fas fa-trash"></i>
        </span>
      </li>
    `,
  );
};

// handleEnter
const handleEnter = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handelSubmit(event as unknown as Event);
  }
};
todoValue.addEventListener("keydown", handleEnter);

// saveTodosInLocalStorage func:
const saveTodosInLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  return true;
};

// removeTodo func:
const removeTodo = (todoID: string) => {
  todos = todos.filter((todo) => todo.id !== todoID);
  saveTodosInLocalStorage();
  todoList.innerHTML = "";
  todos.forEach((todo) => addTodoToDom(todo));
};

// toggleTodo func:
const toggleTodo = (todoID: string) => {
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
