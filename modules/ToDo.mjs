/*
@class ToDo
@param {string} task - the task to be done
@param {string} created - date created 
@param {boolean} done - whether the task is done or not

@method markDone() - marks the task as done
*/
class ToDo {
    constructor(task, id) {
        this.task = task;
        this.created = new Date().toLocaleDateString('en-GB');
        this.status = 'To Do';
        this.id = id;
    }   
    markDone(task) {
        this.status = 'Done';
    }
   log() {
         console.log(this.task);
   }
}

export default ToDo; 