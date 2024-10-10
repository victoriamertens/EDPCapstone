import { useNavigate } from 'react-router-dom';

export default function Employee ({employee}){ 
const navigate = useNavigate();
    const handleClick = () => { 
        console.log("CLICKED", employee.id);
        navigate(`/employee/${employee.id}`); 
    }

    return ( 
        <tr onClick={handleClick}key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.role}</td>
            <td>{employee.phone}</td>
          </tr>
    )
}