function addTodo() {
    const todo_inp = document.querySelector("input").value;
    const new_todo = document.createElement("li");
    new_todo.innerText = todo_inp;
    document.querySelector("ul").appendChild(new_todo);
    // alert("Todo added successfully");
}