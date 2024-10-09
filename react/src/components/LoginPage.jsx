import { useState } from "react"

export default function LoginPage (){ 
const [credentials, setCredentials] = useState({username: "", password: ""});

const handleClick = async (e) => { 
    e.preventDefault(); 
     const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        },
    })
     .then(res =>res.json());
     console.log(response);
     setCredentials({username: "", password: ""}); 
  }

const handleChange = (e) => {
    console.log("Handle sock details change:", e.target.name, e.target.value);
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

return (
    <div>
    <form>
    <input
        type="text"
        className="search-box"
        placeholder="Username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
                      />
    <input type="text" placeholder="Password" name="password" value={credentials.password} onChange={handleChange}/>
  <button onClick={handleClick}>Search</button>
  </form>
  </div>
)

}