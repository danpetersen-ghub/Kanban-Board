/*
@class userInput
@namespace ToDoApp.modules
@extends ToDoApp.modules.ToDo
@param {node} input - the input element
ID: "task-input"
*/
class userInput {
    constructor(elm) {
        this.value = elm.value;
    }
    log() {
        console.log(this.value);
    }
    get(){
        return this.value;
    }
    clear(){
        this.value = "";
    }  
}

export default userInput; 