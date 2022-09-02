import ToDo  from "./modules/ToDo.mjs";
import TaskList  from "./modules/TaskList.mjs";    
//import IndexDB from "./modules/IndexDB.mjs";
import dragDropModule from "./modules/dragandDrop.mjs";

const taskList = new TaskList();
//const database = new IndexDB();
const dragDrop = new dragDropModule() ;

console.log("App Loading...")

/*
indexDB Example from: 
https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js
*/
// Hold an instance of a db object for us to store the IndexedDB data in
let db;

 // Let us open our database
const DBOpenRequest = window.indexedDB.open('Tasks', 4);

DBOpenRequest.onsuccess = (event) => {
    console.log('onsuccess is called')
    // Store the result of opening the database in the db variable. This is used a lot below
    db = DBOpenRequest.result;

    //pull existing IndexDB records to our Tasklist
    getAllDatabaseRecord();

    //Load APP
    pageLoad();
};

DBOpenRequest.onupgradeneeded = (event) => {
  console.log('onupgradeneeded is called')
    //return the promise result for future use 
    db = event.target.result;

    db.onerror = (event) => {
      console.log('Error loading database.');
    };

    // Create an objectStore for this database
    const objectStore = db.createObjectStore('tasklist', { keyPath: 'id' });

    // Define what data items the objectStore will contain
    objectStore.createIndex('id', 'id', { unique: true});

    //pull existing IndexDB records to our Tasklist
   // getAllDatabaseRecord();

    // Load APP
    // pageLoad();
    location.reload(); 
    
  };

    // Register two event handlers to act on the database being opened successfully, or not
    DBOpenRequest.onerror = (event) => {
      console.log('Error loading database.');
    };


//SCOPE
const Scope = { 
}


//FUNCTIONS

//Adding drag and drop event listeners to the task tiles 
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

//Add object to IndexDB
function  addDatabaseRecord(object) {
    console.log('addDatabaseRecord called')

    //Create Transaction
    let transaction = db.transaction( ['tasklist'], 'readwrite');


    //Create request to put data in to Store via transaction
    let request = transaction.objectStore('tasklist');
    request.onerror = e => callback(e.target.error);
    request.onsuccess = e => callback(e.target.result);
    

    transaction.oncomplete = (event) => {
      console.log("Transaction completed: database modification finished.");
  }

  //Now we can create the Store (some refer to this as the table)
  const objectStore = transaction.objectStore('tasklist');
  

  //Add the Object to the Store
  const objectStoreRequest = objectStore.add(object)
  objectStoreRequest.onsuccess = (event) => {
    console.log(event);
  }
}

//Update object to IndexDB
function  putDatabaseRecord(taskID) {

  let object = taskList.tasks.find(({ id }) => id ==  taskID);
  console.log('putDatabaseRecord called')

  //Create Transaction
  let transaction = db.transaction( ['tasklist'], 'readwrite');


  //Create request to put data in to Store via transaction
  let request = transaction.objectStore('tasklist');
  request.onerror = e => callback(e.target.error);
  request.onsuccess = e => callback(e.target.result);
  

  transaction.oncomplete = (event) => {
    console.log("Transaction completed: database modification finished.");
  }

  //Now we can create the Store (some refer to this as the table)
  const objectStore = transaction.objectStore('tasklist');


  //Add the Object to the Store
  const objectStoreRequest = objectStore.put(object);
  objectStoreRequest.onsuccess = (event) => {
    console.log(event);
  }
}

//Remove object to IndexDB
function  deleteDatabaseRecord(taskID) {

  let object = taskList.tasks.find(({ id }) => id ==  taskID);
  console.log('putDatabaseRecord called')

  //Create Transaction
  let transaction = db.transaction( ['tasklist'], 'readwrite');


  //Create request to put data in to Store via transaction
  let request = transaction.objectStore('tasklist');
  request.onerror = e => callback(e.target.error);
  request.onsuccess = e => callback(e.target.result);
  

  transaction.oncomplete = (event) => {
    console.log("Transaction completed: database modification finished.");
    
  }

  //Now we can create the Store (some refer to this as the table)
  const objectStore = transaction.objectStore('tasklist');


  //Add the Object to the Store
  const objectStoreRequest = objectStore.delete(taskID);
  objectStoreRequest.onsuccess = (event) => {
    console.log(event);
  }
}

//get the IndexDb records and update the Tasklist Array
function  getAllDatabaseRecord(id) {
    console.log('getAllDatabaseRecord called')

    //Create Transaction
    let transaction = db.transaction( ['tasklist'], 'readwrite');

    //Create request to put data in to Store via transaction
    let request = transaction.objectStore('tasklist');
    request.onerror = e => callback(e.target.error);
    request.onsuccess = e => callback(e.target.result);
    

    transaction.oncomplete = (event) => {
      console.log("Transaction completed: database modification finished.");
  }

  //Now we can create the Store (some refer to this as the table)
  const objectStore = transaction.objectStore('tasklist');
  

  //get the Object to the Store
  //@desc If nothing is passed, this will default to a key range that selects all the records in this object store. 
  
  const objectStoreRequest = objectStore.getAll(id);
  objectStoreRequest.onsuccess = (event) => {
    console.log(event);
    taskList.tasks  = event.target.result;
    taskList.render();
    AddListenerToCards();
  }
}

//EVENT LISTENERS

//@listener - event listener  - Page Load
function pageLoad() {
  console.log('page is fully loaded');

  // ondrop="dragDrop.drop(event)" ondragover="dragDrop.allowDrop(event)">
  document.querySelectorAll(".task-column").forEach(column => {
      column.addEventListener("drop", function(event) {
          dragDrop.drop(event)
          taskList.updateTaskStatus(dragDrop.selectedTask, dragDrop.placedStatus);
          putDatabaseRecord(dragDrop.selectedTask);
          
          });
      column.addEventListener("dragover", function(event) {
          dragDrop.allowDrop(event);
          
      });
  });

  let userInput = document.getElementById("task-input");
  userInput.value = "";

  taskList.render();
  AddListenerToCards();
// });

}


// @listener - event listener  - Save Button Clicked
document.getElementById("create").addEventListener("click", function() {
    let userInput = document.getElementById("task-input");
    let taskText = userInput.value; 

    //create a task Obj
    let task = new ToDo(taskText, taskList.nextId())
    console.log('TASK is:');
    console.log(task);

    //Add task to Task List Array 
    taskList.addTask(task)

    //Add Task to IndexDB
    addDatabaseRecord(task);

    //Update the UI
    taskList.render();

    //Add Drag & Drop listners
    AddListenerToCards();

    //Clean the input for future tasks 
    userInput.value = "";
});

// @listener - event listener  - Save via Enter Key
document.addEventListener('keypress', function (e) {
    let userInput = document.getElementById("task-input");
    if (e.key === 'Enter' && userInput.value != "")  {       
        let userInput = document.getElementById("task-input");
        let taskText = userInput.value; 
    
        //create a task Obj
        let task = new ToDo(taskText, taskList.nextId())
        console.log('TASK is:');
        console.log(task);
    
        //Add task to Task List Array 
        taskList.addTask(task)
    
        //Add Task to IndexDB
        addDatabaseRecord(task);
    
        //Update the UI
        taskList.render();
    
        //Add Drag & Drop listners
        AddListenerToCards();
    
        //Clean the input for future tasks 
        userInput.value = "";
    }
});

//Delete Tasks
document.addEventListener("click", function(e) {
   
  //simpler to filter out click events than to add event listners on every render and deal with DOM timings
  if(e.target.className !== "done-task") {    return;  }

  //get the id from the html
  let taskid = parseInt(e.target.dataset.taskid );
  console.log( taskid );

  //remove from b=global obj
   taskList.removeTask( taskid );

   // remove from DB
   deleteDatabaseRecord( taskid );

   //update UI
   taskList.render();

});


// @listener - event listener - Delete Storage
// document.getElementById("clear").addEventListener("click", function() {
//    database.deleteDB();
// })