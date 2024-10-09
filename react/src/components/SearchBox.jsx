
import { useState } from "react";
import { useAuth } from '../hooks/AuthorizationContext';


export default function SearchBox () { 

   const [searchTerm, setSearchTerm] = useState(""); 

 const handleClick = async (e) => { 
   e.preventDefault(); 
    const response = await fetch(`http://localhost:3000/search/name/${searchTerm}`)
    .then(res =>res.json());
    console.log(response);
    setSearchTerm(""); 
 }

 const handleIdChange = (e) => { 
   const { name, value } = e.target;
   setSearchTerm(search); 
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
    </div>
    )
}