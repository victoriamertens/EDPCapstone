
import { useState } from "react";
import { useAuth } from '../hooks/AuthorizationContext';
import Employee from "./Employee";
import "./SearchPage.css"

export default function SearchBox () { 
   let {user} = useAuth(); 
   const [searchTerm, setSearchTerm] = useState(""); 
   const [searchResponse, setSearchResponse] =useState(""); 
   const [searchType, setSearchType] =useState("name"); 


   console.log("USER:", user);

 const handleClick = async (e) => { 
   e.preventDefault(); 
    const response = await fetch(`http://localhost:3000/search/${searchType}/${searchTerm}`)
    .then(res =>res.json());
    console.log(response);
    setSearchResponse(response); 
    setSearchTerm(""); 
 }

 const handleIdChange = (e) => { 
   const { value } = e.target;
   setSearchTerm(value); 
 }

 const handleSearchTypeChange = (event) => {
  setSearchType(event.target.value);
};

    return (
      <div>
    <div id="search-box">
      <h2>Search Directory</h2>
      <form>
      <input
                            type="text"
                            id="search-bubble"
                            className="search-box"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleIdChange}
                        />
  <div id="search">
  <label className="pad" for="search-type">Search By:</label>
<select className="pad" name="search" value={searchType} onChange={handleSearchTypeChange}>
  <option value="name">Name</option>
  <option value="partial">Partial Name</option>
  <option value="role">Role</option>
</select>
</div>
    <button onClick={handleClick}>Search</button>
    </form>
    </div>
    <div id="search-table">
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
    </div>
   
    )
}