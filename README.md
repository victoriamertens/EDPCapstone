# EDPCapstone


## Mongosh Steps to make entries searchable 
Run the following commands in order to optimize searchability of the name field in the Database. It makes a text searchable field in the database. 

`db.employees.createIndex({name:"text"})`
