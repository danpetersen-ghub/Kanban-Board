/*
@class ToDo
@param {string} task - the task to be done
@param {string} created - date created 
@param {boolean} done - whether the task is done or not

@method markDone() - marks the task as done
*/
class ToDo {
    constructor(task) {
        this.task = task;
        this.created = new Date().toISOString();
        this.status = 'To Do';
    }
    save() {}
    markDone() {}
    delete() {}
}

export default ToDo 