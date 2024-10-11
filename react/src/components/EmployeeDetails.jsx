export default function EmployeeDetails ({emp}){ 


    return ( 
        <div >
        <h1>Employee Details</h1>
        <div style={{ border: '1px solid black', borderRadius:'10px' }} id="emp-details">
        <p><strong>Name: </strong>{emp.name}</p>
        <p><strong>Role: </strong> {emp.role}</p>
        <p><strong>Phone: </strong>{emp.phone}</p>
        <p><strong>Manager: </strong> {emp.manager}</p>
        <p><strong>Location: </strong> {emp.location}</p>
        {emp.salary ? <p><strong>Salary: </strong> {emp.salary}</p> : <p><strong>Salary: </strong> *Redacted*</p> }
        </div>
        </div>
    )
}