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
    render() {


        // if(this.tasks.length === 0 )  { 
        //     console.log("No tasks found!")
        //     return 
        // }

        // for (const task of this.tasks) {
        //     console.log(task.id)
        //     if(document.getElementById(task.id) || document.getElementById(task.id) == null  )  { return  }
        //     const element = document.getElementById(task.id);
        //     element.remove(); 
        //     // document.getElementById(task.id).remove();                                     
        // }

        // for (const status of this.statuses) {
        //     console.log(status);
        //     let col = document.querySelectorAll(`div[data-status="${status}"]`);
        //     let array = this.tasks.filter( (task) => task.status == status ) 
        //     let listHTMLArray2 = array.map(task => {
        //         let  DIV = document.createElement("div");
        //         DIV.id = task.id
        //         DIV.className = "card text-center"
        //         DIV.draggable = "true"
        //         DIV.innerHTML = ` <div ${task.id} class="card-body" > 
        //                             <p class="card-text">${task.task}</p>  
        //                             <p $ class="card-title"> <i>${task.id} - ${task.created}</i></p>                       
        //                          </div>`;
        //      });
        //      console.log(col)
        //      console.log(listHTMLArray2)

        //     let NodeList = document.createDocumentFragment();

        //     listHTMLArray2.forEach(function(item){
        //         NodeList.appendChild(item.cloneNode(true));
        //       });

        //        console.log(col)
        //        console.log(NodeList)
        //       col[0].appendChild(NodeList)
            
        // }
    //     //Get El
         let listArea = document.getElementById("list");
        
    //     // Map tasks to html output
        let listHTMLArray = this.tasks.map(task => {
            return `                    
            <div id="${task.id}" class="card text-center" draggable="true"  >
            <div  class="card-body" > 
                <p class="card-text">${task.task}</p>                         
                <p class="task-meta-data">
                ID: ${task.id} <br>
                Created:  ${task.created}
                </p>
                                      
            </div>
        </div>`});

    //        // `<p>${task.id} ( ${task.created} ) - ${task.task} <button class="done-task" data-id="${task.id}" >&#10004;</button>  </p>`;
    //         //onclick=" taskList.removeTask('${task.task}')"
    //     // });

        listArea.innerHTML = listHTMLArray.join(" ");
    // //  });

       //  ondragstart="dragDrop.drag(event)" >

    }
}

export default TaskList;