/* 
Stuck on Callback:
https://stackoverflow.com/questions/43727516/how-adding-event-handler-inside-a-class-with-a-class-method-as-the-callback?noredirect=1&lq=1
*/
class dragDrop {
    constructor(){
      this.selected = null;
      this.placed = null;

    }
    allowDrop = (ev) => {
        ev.preventDefault();
      }
      
   drag = (ev) => {
        // console.log('User is dragging');
        // console.log(ev.target.id);
        // console.log(ev.target.innerHTML);
        ev.currentTarget.style.border = "medium dashed aqua";
        console.log(ev);
        ev.dataTransfer.setData("text/plain", ev.target.id);
        //tasklist.selectedTask  =  ev.target.id;
        return  ev.target.id
      }
      
    drop = (ev) => {
        ev.preventDefault();
        console.log('User has dropped');
        console.log(ev);
        let data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        document.getElementById(data).style.border = "none";
        tasklist.tasks[ tasklist.selectedTask ].status = ev.originalTarget.dataset.status 

      }

      log = () => {
        console.log("log called");
      }
 }
   
 export default dragDrop;
