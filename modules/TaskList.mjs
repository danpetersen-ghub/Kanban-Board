
/*
@class TaskList
@param {array} tasks - the array of tasks

@method addTask(task) - adds a task to the array
@method removeTask(task) - removes a task from the array
@method render() - renders the array to the screen
*/

class TaskList {
    constructor() {
        this.tasks = [

          ];
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
    render() {
        //Get El
        let listArea = document.getElementById("list");
        
        // Map tasks to html output
        let listHTMLArray = this.tasks.map(task => {
            return `<p>${task.id} ( ${task.created} ) - ${task.task} <button class="done-task" data-id="${task.id}" >&#10004;</button>  </p>`;
            //onclick=" taskList.removeTask('${task.task}')"
        });

        listArea.innerHTML = listHTMLArray.join(" ");
    }
}

export default TaskList;