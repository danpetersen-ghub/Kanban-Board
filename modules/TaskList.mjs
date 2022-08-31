/*
@class TaskList
@param {array} tasks - the array of tasks
@method addTask(task) - adds a task to the array
@method removeTask(task) - removes a task from the array
@method render() - renders the array to the screen
*/

class TaskList {
    constructor() {
        this.tasks = [ ];
        this.statuses = [
            "To Do",
            "In Progress",
            "Done"
        ],
        this.selectedTask = null
    }
    addTask(task) {
        this.tasks.push(task);
    }
    removeTask( TaskID) {
        console.log("remove called id:" + TaskID);
        let newArray = this.tasks.filter(record => record.id != TaskID);
        this.tasks = newArray;
        this.render();
        this.log() ; 
    }
    log() {
        console.log(this.tasks);
    }
    nextId(task) {
        return this.tasks.length + 1;
    }
    updateTaskStatus(taskID, status){
        let selected = this.tasks.find(({ id }) => id ==  taskID);
        console.log(selected);
        selected.status = status;
    }
    render() {
    //  Get El
         let listArea = document.getElementById("list");
        
    //   Map tasks to html output
        let listHTMLArray = this.tasks.map(task => {
            return `                    
            <div id="${task.id}" class="card text-center" draggable="true"  >
            <div  class="card-body" > 
                <p class="card-text">${task.task}</p>                         
                <p class="task-meta-data">
                ID: ${task.id} <br>
                Created:  ${task.created} <br>
                Status: ${task.status}
                </p>
                                      
            </div>
        </div>`});

        listArea.innerHTML = listHTMLArray.join(" ");
    }
}

export default TaskList;