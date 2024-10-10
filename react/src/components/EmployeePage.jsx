import { useParams } from "react-router-dom"
import { useAuth } from '../hooks/AuthorizationContext';


export default function EmployeePage (){ 
const {id} = useParams(); 
let {user} = useAuth(); 
console.log("USER:", user);


    return (
        <h1>Employee Page: {id}</h1>
    )
}

