## CLI Steps to make entries searchable 

show dbs
use enterprise-dir
show collections
db.employees.createIndex({name:"text"})
db.employees.find( { $text: { $search: "\"Sam\"" } } )