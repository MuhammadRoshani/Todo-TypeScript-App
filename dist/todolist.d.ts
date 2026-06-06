declare const todoValue: HTMLInputElement;
declare const addTodo: HTMLButtonElement;
declare const clearTodos: HTMLButtonElement;
declare const todoList: HTMLUListElement;
interface ITodo {
    id: string;
    title: string;
    isCompleted: boolean;
}
declare let todos: ITodo[];
declare const handelSubmit: (event: Event) => void;
declare const addTodoToDom: (todo: ITodo) => void;
declare const handleEnter: (event: KeyboardEvent) => void;
declare const saveTodosInLocalStorage: () => boolean;
declare const removeTodo: (todoID: string) => void;
declare const toggleTodo: (todoID: string) => void;
//# sourceMappingURL=todolist.d.ts.map