
import { useState } from "react";

export default function SearchBox () { 

   const [searchTerm, setSearchTerm] = useState(""); 

 const handleClick = async () => { 
    const response = await fetch(`http://localhost:3000/search/name/${searchTerm}`)
    .then(res =>res.json());
    console.log(response);
 }

 const handleIdChange = (e) => { 
   let search = e.target.value; 
   setSearchTerm(search); 
 }

    return (
    <div>
      <input
                            type="text"
                            className="search-box"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleIdChange}
                        />
    <button onClick={handleClick}>Click Me</button>
    </div>
    )
}