/*
@class TaskList
@Data {array} tasks - the array of tasks
@method addTask(task) - adds a task to the array
@method removeTask(task) - removes a task from the array
@method log() -  Console log the task list
@method nextId() - loop through task list, find the largest ID return the ID+1 
@method updateTaskStatus() - take and ID and update the status with whatever status is defined in the 2nd Param
@method render() - renders the array to the screen
*/

class TaskList {
    constructor() {
        this.tasks = [];
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
    removeTask(TaskID) {
        console.log("remove called id:" + TaskID);
        let newArray = this.tasks.filter(record => record.id != TaskID);
        this.tasks = newArray;
        this.render();
        this.log();
    }
    log() {
        console.log(this.tasks);
    }
    nextId() {

        // Save the value
        let currentLargest = 0;

        //Loop through the tasklist and return the highest
        for (const task of this.tasks) {
            if (currentLargest < task.id) {
                currentLargest = task.id
            }
        }
        console.log(currentLargest)
        //return the highest value and add 1 to it
        return currentLargest + 1;

        // return this.tasks.length + 1;
    }
    updateTaskStatus(taskID, status) {
        let selected = this.tasks.find(({ id }) => id == taskID);
        console.log(selected);
        selected.status = status;
        // document.getElementById(taskID).remove();
        // this.render();
    }
    render() {
        //  Get lists which we will put the task html
        let listArea = document.getElementsByClassName("list");
        //console.log(listArea);

        // Clean the lists html (remove old tasks)
        for (let item of listArea) {
            //console.log('Task Column Name is: ' + item.dataset.status)
            item.innerHTML = "";
            console.log(item.innerHTML)
        }

        // Loop over the statuses and populate the task html in the list
        for (let item of listArea) {
            let filteredList = this.tasks.filter(({ status }) => status == item.dataset.status);
            //console.log(filteredList);


            //   Map tasks to html output
            let listHTMLArray = filteredList.map(task => {
                return `                    
            <div id="${task.id}" class="card text-center" draggable="true"  >
            <div  class="card-body" > 
                <span style="color:white;font-size:14px;" class="card-text" contenteditable="true" >${task.task}</span>                         
                <p class="task-meta-data">
                ID: ${task.id} -  Created: ${task.created} - ${task.status} - 
                <button data-taskid="${task.id}" class="done-task">Delete</button>
                </p>
                                      
            </div>
        </div>`});

            item.innerHTML = listHTMLArray.join(" ");
        }
    }

}

export default TaskList;