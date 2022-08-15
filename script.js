console.log(`reload.........`);

//global 
let toDoArr = [
    { task: "abc", done: false, status: "To Do", created: "2022-08-15T06:57:32.051Z" },
]
var createButton = document.getElementById("create");
var save = document.getElementById("save");
var clear = document.getElementById("clear");

//todo constructor
function ToDo(task) {
    this.task = task;
    this.done = false;
    this.status = 'To Do';
    this.created = new Date().toISOString();
}

//functions
function createTaskElements() {
    if (!window.localStorage.saveFile) { return } 
    let listArea = document.getElementById("list");
    let listHTMLArray = toDoArr.map( (task) => {  `<p>${created} - ${task}</p>` });
    listHTMLArray.forEach(task => { 
        let DIV = document.createElement("DIV");
        DIV.innerHTML = task;
        listArea.appendChild(DIV);  
     });
}

// addTasksToUIFromArray = (array) => {
//     document.getElementById("list").innerHTML= "";
//     for (var i = 0; i < array.length; i++) {
//        let  task = array[i];
//        createTaskElement(task);
//     }
// }

function taskDone(array, value) {
    removeItemOnce(array, value)   
    createTaskElements();
    saveToLocalStorage();
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
    
  }

// function createTaskElements() {
//     let listArea = document.getElementById("list");
//     let listHTMLArray = toDoArr.map( task => {  `<p>${created} - ${task}</p>` });
//     listHTMLArray.forEach(task => {  listArea.appendChild(task);   });
// }

// createTaskElement = (task) => {
//     var p = document.createElement("P");
//     // p.innerHTML = `<p>
//     // <button class="done-task" onclick="taskDone( toDoArr, '${task}')" >&#10004;</button>  
//     // ${task}
//     // </p>`;
//     // p.innerHTML = `<p>${created} - ${task}</p>`;
//     let list = document.getElementById("list");
//     list.appendChild(p);
    
// }

function makeNewTask() {
    let userInput = document.getElementsByTagName("input")[0].value;
    if (userInput === "") { return } 
    let task = new ToDo(userInput);
    console.log(task);
    toDoArr.push(task);
    createTaskElements();
     document.getElementsByTagName("input")[0].value = "";
     saveToLocalStorage();
 }

 function saveToLocalStorage() {
    if (window.localStorage.saveFile) {
        window.localStorage.removeItem('saveFile');
        let storage = JSON.stringify(toDoArr);
        console.log(storage);
        window.localStorage.setItem('saveFile', );
    } else  window.localStorage.setItem('saveFile', toDoArr);
 }



//_______________EVENTS_______________ */

//on page load 
if (window.localStorage.saveFile) {
        //saveFileAsString = localStorage.saveFile;
        //let saveFileSplit = saveFileAsString.split(",");
        // toDoArr = saveFileSplit;
        
       
       // let toDoArr = JSON.parse(window.localStorage.saveFile);
        //console.log(toDoArr);
        createTaskElements();
}
// */


// Add new To Do Item
createButton.addEventListener("click", function() {
     makeNewTask();
} );

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log("Enter was pressed");
        makeNewTask();
    }
});

//Save to local storage
save.addEventListener("click", function() {
     saveToLocalStorage();
});

//clear local storage
clear.addEventListener("click", function() { 
    window.localStorage.removeItem('saveFile');
    location.reload(); 
});

