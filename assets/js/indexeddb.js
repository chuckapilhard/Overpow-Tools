//example at: https://www.webcodegeeks.com/html5/html5-indexeddb-example/

// Database creation
DATABASE_NAME = 'catalog';
DATABASE_VERSION = 1;
STORE_NAME = 'product';

var database;
var indexedDB = window.indexedDB || window.webkitIndexedDB
    || window.mozIndexedBD || window.msIndexedDB;

var request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);


//onupgradeneeded event
request.onupgradeneeded = function() {
    console.log('Database upgrade/creation.');

    database = request.result;

    var catalogStore = database.createObjectStore(
        STORE_NAME,
        {
            keyPath: 'id',
            autoIncrement: 'true'
        }
    );

    catalogStore.createIndex('by_id', 'id');
    catalogStore.createIndex('by_name', 'name');

    console.log('The database has been created/updated.');
}

//Inserting a product
function insertInitialData(catalogStore) {
    catalogStore.put({
        'name': 'A product',
        'description': 'Description of a product.',
        'price': 10,
    });

     catalogStore.put({
        'name': 'Another product',
        'description': 'Description of another product.',
        'price': 20,
        'subproduct': {
            'name': 'Subproduct of a product'
        }
    });
}

request.onupgradeneeded = function() {
    // After creating the object storage and indexes...

    insertInitialData(catalogStorage);

    // ...
}