/*
@class IndexDB
@namespace ToDoApp.modules
@param {string} dbName - the name of the database
@param {string} dbVersion - the version of the database
@ see https://gist.github.com/underground/d50e40170d54b8a0f8a3f4fdd466eee4 for more info
*/
class indexDB {
  constructor() {
      this.db,
      this.dbName = "ToDoApp";
      this.dbVersion = 3;
      this.store = "tasks";
  }

  createDB() {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);
    //  console.log(request);
     // console.log(request.result);
    //   this.db = request.result;

      request.onerror = (event) => {
          // Do something with request.errorCode!
          console.error(`Database error: ${event.target.errorCode}`);
      };

      request.onsuccess = (event) => {
        //  this.db = request.result;
          console.log('onsuccess - DB created: ');
          console.log(event);
          console.log(request.result);
          this.db = request.result;
          console.log(this.db);
         
      }
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded: ');
        this.db = e.target.result;
        this.db.onabort = e2 => callback(e2.target.error);
        this.db.error = e2 => callback(e2.target.error);
        this.db.oncomplete = e2 => {
          console.log("db upgrade complete");
          }
        }
        
    }
    createStore(){

        console.log(this);
        console.log(this.db);
        //Create Store
        this.db.createObjectStore(this.store);
        console.log("Store created: ");
        console.log(store);


        //Create index for the objectStore
        objectStore.createIndex(this.store, "id", {unique: true}); 
        console.log("index created for ID");

    }

  add(objects) {
    
        //Create Transaction
        let transaction = this.db.transaction( [this.store], IDBTransaction.READ_WRITE, 2000);


        //Create request tp put data in to Store via transaction
        let request = transaction.objectStore(storeName).put(objects);
        request.onerror = e => callback(e.target.error);
        request.onsuccess = e => callback(e.target.result);
        
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
  deleteDB() {

  }
  log(){
    console.log('THIS is:' )
    console.log(this)
  }

}

export default indexDB; 