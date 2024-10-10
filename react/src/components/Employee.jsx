export default function Employee ({employee}){ 
    return ( 
        <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.role}</td>
            <td>{employee.phone}</td>
          </tr>
    )
}