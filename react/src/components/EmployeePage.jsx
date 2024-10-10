import { useParams } from "react-router-dom"
import { useAuth } from '../hooks/AuthorizationContext';
import { useEffect, useState } from "react";
import EmployeeDetails from "./EmployeeDetails";


export default function EmployeePage (){ 
    const {id} = useParams(); 
    let {user} = useAuth(); 
 
    console.log("USER:", user);
    const [employeeInfo, setEmployeeInfo] = useState({}); 
    const [currentUser, setCurrentUser] = useState({}); 


     useEffect( () => {
        loadEmployeeInfo(); 
        setCurrentUser(user); 
    }, []);

      

const loadEmployeeInfo = async ()=> { 
    let body = {"userId": user.userId, "employeeId": id}
    const response = await fetch(`http://localhost:3000/employee`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    console.log("RESPONSE", data);
    setEmployeeInfo(data)
}
   




    return (
        ( employeeInfo.name ? <EmployeeDetails emp={employeeInfo}/> : <p>Loading...</p>)
    )
}

