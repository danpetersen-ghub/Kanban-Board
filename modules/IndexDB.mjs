/*
@class IndexDB
@namespace ToDoApp.modules
@param {string} dbName - the name of the database
@param {string} dbVersion - the version of the database
@ see https://gist.github.com/underground/d50e40170d54b8a0f8a3f4fdd466eee4 for more info
*/
class indexDB {
  constructor() {
      this.db = null;
      this.dbName = "ToDoApp";
      this.dbVersion = 3;
      this.stores = "tasks";
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
         console.log('onsuccess');
         console.log(this);

          // Create an objectStore to hold information about our customers. We're
          // going to use "ssn" as our key path because it's guaranteed to be
          // unique - or at least that's what I was told during the kickoff meeting.
          const objectStore = this.db.createObjectStore(this.dbName, {  keyPath: "id"   });

         //Create index for the objectStore
          objectStore.createIndex(this.dbName, "id", {unique: true}); 

      }
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        this.db = e.target.result;
        this.db.onabort = e2 => callback(e2.target.error);
        this.db.error = e2 => callback(e2.target.error);
        this.db.oncomplete = e2 => {
          stores.forEach((o) => {
            this.db.createObjectStore(o.name, o.option);
          });
        }
    }

  }
  

  add(store, objects) {
     console.log(this);
      let transaction = this.db.transaction( [store], IDBTransaction.READ_WRITE);
      transaction.oncomplete = (event) => {
          console.log("Transaction completed: database modification finished.");
      }
      let request = transaction.objectStore(storeName).put(objects);
      request.onerror = e => callback(e.target.error);
      request.onsuccess = e => callback(e.target.result);
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