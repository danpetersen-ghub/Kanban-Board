/*
@class IndexDB
@namespace ToDoApp.modules
@param {string} dbName - the name of the database
@param {string} dbVersion - the version of the database

*/
class indexDB {
  constructor() {
      this.db = null;
      this.dbName = "ToDoApp";
      this.dbVersion = 3;
  }

  createDB() {
      let request = window.indexedDB.open(this.dbName, this.dbVersion);
      console.log(request);
      request.onerror = (event) => {
          // Do something with request.errorCode!
          console.error(`Database error: ${event.target.errorCode}`);
      };
      request.onsuccess = (event) => {
         this.db = event.target.result;
         console.log(this);

          // Create an objectStore to hold information about our customers. We're
          // going to use "ssn" as our key path because it's guaranteed to be
          // unique - or at least that's what I was told during the kickoff meeting.
          const objectStore = this.db.createObjectStore(this.dbName, {  keyPath: "id"   });

         //Create index for the objectStore
          objectStore.createIndex(this.dbName, "id", {unique: true}); 

      }

  }
  

  add(objects) {
     console.log(this);
      const transaction = this.db.transaction( ["ToDoApp"], "readwrite");
      transaction.oncomplete = (event) => {
          console.log("Transaction completed: database modification finished.");
      }
  }

  get(id) {
      const request = objectStore.get(id);
      request.onerror = (event) => {
          // Handle errors!
      };
      request.onsuccess = (event) => {
          // Do something with the request.result!
          console.log(`Name for task is ${request.result.name}`);
      };
  }

  update(object) {
      // Put this updated object back into the database.
      const requestUpdate = objectStore.put(object);
      requestUpdate.onerror = (event) => {
          // Do something with the error
      };
      requestUpdate.onsuccess = (event) => {
          // Success - the data is updated!
      };
  }

}

export default indexDB; 