# EDPCapstone


## Mongosh Steps to make entries searchable 
Run the following commands in order to optimize searchability of the name field in the Database. It makes a text 


show dbs
use enterprise-dir
show collections
db.employees.createIndex({name:"text"})
db.employees.find( { $text: { $search: "\"Sam\"" } } )