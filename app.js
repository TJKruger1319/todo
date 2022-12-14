
const todoList = document.querySelector('.todo-list');
const form = document.querySelector("form");
const newTodoInput = document.querySelector("#todo-name");
let todoArray = [];
let keyArray = [];

if (localStorage.todos) {
    todoArray = JSON.parse(localStorage.todos);
} else {
    todoArray = [];
}

for (let todo of todoArray) {
    addToList(todo.value), todo.completed;
}

form.addEventListener("submit", handler);

todoList.addEventListener('click', function(e){
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('cross-out');
        for (let todo of todoArray) {
            if (todo.value === newTodoInput.value) {
              todo.completed = !todo.completed;
              break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todoArray));
    }   
    else if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.innerText);
        
    }
});

function handler(e) {
    e.preventDefault();
    addToList(newTodoInput.value);
    addToLocalStorage(newTodoInput.value);
    form.reset();
}

function addToLocalStorage(todoValue) {
 todoArray.push({
    value: todoValue,
    completed: false,
 });
 
 localStorage.setItem(todoValue, JSON.stringify(todoArray));
}
 
function removeFromLocalStorage(todoValue) {
 for (let i = 0; i < localStorage.length; i++) {
   if (localStorage.key(i) === todoValue) {
     localStorage.removeItem(i);
     break;
   }
 }
}

function addToList(todoValue, completed = false) {
    const newLi = document.createElement("li");
    if (completed) {
        newLi.classList.add('completed');
    }
    const newButton = document.createElement("button");
    newLi.innerText = todoValue;
    newButton.innerText = "Done!";

    newLi.append(newButton);
    todoList.append(newLi);
}