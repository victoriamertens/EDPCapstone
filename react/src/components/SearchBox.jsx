
import { useState } from "react";
import { useAuth } from '../hooks/AuthorizationContext';
import Employee from "./Employee";


export default function SearchBox () { 
   let {user} = useAuth(); 
   const [searchTerm, setSearchTerm] = useState(""); 
   const [searchResponse, setSearchResponse] =useState(""); 

   console.log("USER:", user);

 const handleClick = async (e) => { 
   e.preventDefault(); 
    const response = await fetch(`http://localhost:3000/search/name/${searchTerm}`)
    .then(res =>res.json());
    console.log(response);
    setSearchResponse(response); 
    setSearchTerm(""); 
 }

 const handleIdChange = (e) => { 
   const { value } = e.target;
   setSearchTerm(value); 
 }

    return (
    <div>
      <form>
      <input
                            type="text"
                            className="search-box"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleIdChange}
                        />
    <button onClick={handleClick}>Search</button>
    </form>
    <table>
    <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
    { searchResponse ? 
                searchResponse.map((emp) => (
                    <Employee key={emp.id} employee={emp} />
                )) : <></>
            }
            </tbody>
            </table>
    </div>
    )
}