
function addTodo(sNewTodo)
{
    let oParagraph = document.createElement("p");

    oParagraph.innerHTML = `${sNewTodo}`;
    document.getElementById("todoList").prepend(oParagraph);
}


document.getElementById("todoForm").addEventListener("submit", (event) =>
{
    event.preventDefault();
    let oNewTodo = document.getElementById("newTodo");
    let sNewTodo = oNewTodo.value;
    oNewTodo.value = "";
    addTodo(sNewTodo);   
});

