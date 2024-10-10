export default function EmployeeDetails ({emp}){ 

    id
    : 
    "642"
    location
    : 
    "Dallas"
    manager
    : 
    "Jackson Allen"
    name
    : 
    "Sam Flores"
    phone
    : 
    "252-895-3482"
    role
    : 
    "Software Engineer"
    _id
    : 
    "67069b406d4984a898dfe502"
    return ( 
        <div>
        <h1>Employee Details</h1>
        <p>Name: {emp.name}</p>
        <p>Role: {emp.role}</p>
        <p>Phone: {emp.phone}</p>
        <p>Manager: {emp.manager}</p>
        <p>Location: {emp.location}</p>
        {emp.salary ? <p>Salary: {emp.salary}</p> : <p>Salary: redacted</p> }
        </div>
    )
}