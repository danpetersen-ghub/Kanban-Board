console.log(`reload.........`);

//global 
let toDoArr = []
var createButton = document.getElementById("create");
var save = document.getElementById("save");
var clear = document.getElementById("clear");

//functions
addTasksToUIFromArray = (array) => {
    document.getElementById("list").innerHTML= "";
    for (var i = 0; i < array.length; i++) {
       let  task = array[i];
       createElement(task);
    }
}

function taskDone(array, value) {
    removeItemOnce(array, value)   
    addTasksToUIFromArray(array);
    saveToLocalStorage();

}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
    
  }

createElement = (task) => {
    var p = document.createElement("P");
    p.innerHTML = `<p><button class="done-task" onclick="taskDone( toDoArr, '${task}')" >&#10004;</button>  ${task}</p>`;
    let list = document.getElementById("list");
    list.appendChild(p);
    
}

function makeNewTask() {
    let task = document.getElementsByTagName("input")[0].value;
    if (task === "") { return } 
    toDoArr.push(task);
     addTasksToUIFromArray(toDoArr);
     document.getElementsByTagName("input")[0].value = "";
     saveToLocalStorage();
 }

 function saveToLocalStorage() {
    if (window.localStorage.saveFile) {
        window.localStorage.removeItem('saveFile');
        window.localStorage.setItem('saveFile', toDoArr);
    
    } else  window.localStorage.setItem('saveFile', toDoArr);
 }



//_______________EVENTS_______________ /*

//on page load /*
if (window.localStorage.saveFile) {
        saveFileAsString = localStorage.saveFile;
        console.log(saveFileAsString);
        let saveFileSplit = saveFileAsString.split(",");
        console.log(saveFileSplit);
        toDoArr = saveFileSplit;
     addTasksToUIFromArray(toDoArr);
}
// */


// Add new To Do Item
createButton.addEventListener("click", function() {
    console.log("clicky click")
    makeNewTask();
} );

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log("Enter was pressed")
        makeNewTask();
    }
});

//Save to local storage
save.addEventListener("click", function() {
    console.log("clicky click")
    saveToLocalStorage();
});

//clear local storage
clear.addEventListener("click", function() { 
    console.log("clicky click")
    window.localStorage.removeItem('saveFile');
    location.reload(); 
});

