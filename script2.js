import  ToDo  from "./modules/ToDo.mjs";
import  TaskList  from "./modules/TaskList.mjs";    
import IndexDB from "./modules/IndexDB.mjs";

const taskList = new TaskList();
const database = new IndexDB();

database.createDB();

//SCOPE
const Scope = { 
}

//EVENT LISTENERS
//@listener - event listener  - Page Load
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    let userInput = document.getElementById("task-input");

    userInput.value = "";

    taskList.addTask(new ToDo("Buy milk", taskList.nextId()));

    taskList.render();
  });



// @listener - event listener  - Save 
document.getElementById("create").addEventListener("click", function() {
    let userInput = document.getElementById("task-input");
    let taskText = userInput.value; 
    taskList.addTask(new ToDo(taskText, taskList.nextId()))
    database.add(taskList.tasks);
    taskList.render();
    userInput.value = "";
});

document.addEventListener('keypress', function (e) {
    let userInput = document.getElementById("task-input");
    if (e.key === 'Enter' && userInput.value != "")  {       
       
        let taskText = userInput.value; 
        taskList.addTask(new ToDo(taskText, taskList.nextId()));
        console.log(taskText);
        taskList.render();
        userInput.value = "";
    }
});
document.addEventListener("click", function(e) {
   
  if(e.target.className !== "done-task") {    return;  }

  console.log(e.target.dataset.id);
  taskList.removeTask(e.target.dataset.id);



    // console.log(taskList.tasks);
    // // taskList
    // // taskList.render();
});


// @listener - event listener - Delete Storage
// document.getElementById("clear").addEventListener("click", function() {


// });

