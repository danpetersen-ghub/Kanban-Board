import ToDo  from "./modules/ToDo.mjs";
import TaskList  from "./modules/TaskList.mjs";    
import IndexDB from "./modules/IndexDB.mjs";
import dragDropModule from "./modules/dragandDrop.mjs";

const taskList = new TaskList();
const database = new IndexDB();
const dragDrop = new dragDropModule() ;

//database.createDB();

//SCOPE
const Scope = { 
}

function AddListenerToCards(){
    document.querySelectorAll(".card").forEach(function(task) {
        //Attempt 5 
        task.addEventListener("dragstart", function(event) {
            // console.log('CLICK' )
            // console.log('THIS is:' )
            // console.log( this )
            // console.log('EVENT is: ' )
            // console.log( event )

            // console.log('EVENT TARGET is: ' )
            // console.log( event.target )

            // console.log('____DragDrop Functions____ ' )
            //dragDrop.log(event)
            dragDrop.drag(event);
        });
    });
}

//EVENT LISTENERS
//@listener - event listener  - Page Load
window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    // ondrop="dragDrop.drop(event)" ondragover="dragDrop.allowDrop(event)">
    document.querySelectorAll(".task-column").forEach(column => {
        column.addEventListener("drop", function(event) {
            dragDrop.drop(event)
            });
        column.addEventListener("dragover", function(event) {
            dragDrop.allowDrop(event)
        });
    });
    

    let userInput = document.getElementById("task-input");
    userInput.value = "";

    taskList.render();
    AddListenerToCards();

});


 



// @listener - event listener  - Save Button Clicked
document.getElementById("create").addEventListener("click", function() {
    let userInput = document.getElementById("task-input");
    let taskText = userInput.value; 
    taskList.addTask(new ToDo(taskText, taskList.nextId()))
    //database.add( 'tasks' , taskList.tasks);
    taskList.render();
    AddListenerToCards();
    userInput.value = "";
});

// @listener - event listener  - Save via Enter Key
document.addEventListener('keypress', function (e) {
    let userInput = document.getElementById("task-input");
    if (e.key === 'Enter' && userInput.value != "")  {       
       
        let taskText = userInput.value; 
        taskList.addTask(new ToDo(taskText, taskList.nextId()));
        console.log(taskText);
        taskList.render();
        AddListenerToCards();
        userInput.value = "";
    }
});

document.addEventListener("click", function(e) {
   
  if(e.target.className !== "done-task") {    return;  }

  console.log(e.target.dataset.id);
  taskList.removeTask(e.target.dataset.id);
});


// @listener - event listener - Delete Storage
// document.getElementById("clear").addEventListener("click", function() {
//    database.deleteDB();
// });