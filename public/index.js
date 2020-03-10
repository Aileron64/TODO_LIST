import config from "./firebase.js";
import firebase from "firebase/app";
import 'firebase/database';

firebase.initializeApp(config);

firebase.database().ref("todos/").on("value", (snapshot) =>
{
    document.getElementById("todoList").innerHTML = "";

    const oTodos = snapshot.val();
    let aTodos = Object.keys(oTodos);

    for(let n = 0; n < aTodos.length; n++)
    {
        const sTodo = oTodos[aTodos[n]]["name"];
        addTodo(sTodo, aTodos[n]);
    }
});

function addTodo(sNewTodo, sId)
{
    let oParagraph = document.createElement("p");

    oParagraph.innerHTML = `
    <button class="finished" id="fin_${sId}">&#x2714;</button>
    <button class="delete" id="del_${sId}">x</button>
    &nbsp&nbsp ${sNewTodo}`;

    document.getElementById("todoList").prepend(oParagraph);
}

document.getElementById("todoForm").addEventListener("submit", 
(event) =>
{
    event.preventDefault();

    let oNewTodo = document.getElementById("newTodo");
    let sNewTodo = oNewTodo.value;
    oNewTodo.value = "";

    const sId = new Date().toISOString().replace('.', '_');
    const sPath = "todos/" + sId;

    addTodo(sNewTodo, sId); 

    firebase.database().ref(sPath).set({name: sNewTodo});
});

document.getElementById("todoList").addEventListener("click",
(event) =>
{
    console.log(event);
    console.log(event.target.id);

    if(event.target.classList.contains("delete"))
    {
        console.log("DELETE");
        firebase.database().ref("todos/" + event.target.id.replace("del_", "")).remove();
    }

    if(event.target.classList.contains("finished"))
    {
        console.log("FINISH");
    }
});