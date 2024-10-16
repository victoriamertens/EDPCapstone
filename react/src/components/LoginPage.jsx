import { useState } from "react"
import { useAuth } from "../hooks/AuthorizationContext";
import { useNavigate } from 'react-router-dom';
import "./Login.css"

export default function LoginPage (){ 
const [credentials, setCredentials] = useState({username: "", password: ""});
let {login, user} = useAuth(); 
const navigate = useNavigate();

const handleClick = async (e) => { 
    e.preventDefault(); 
    console.log("LOGGIN IN:", credentials);
    let response = await login(credentials.username, credentials.password);
    //  const response = await fetch(`http://localhost:3000/login`, {
    //     method: "POST",
    //     body: JSON.stringify(credentials),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    //  .then(res =>res.json());
     setCredentials({username: "", password: ""}); 
     navigate("/search");
  }

const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

return (
  <div id="wrapper">
    <div id="login-box">
      <h1>JARVIS</h1>
    <form>
    <input
        type="text"
        className="search-box"
        placeholder="Username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
                      />
    <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange}/>
  <button id="login-btn" onClick={handleClick}>Login</button>
  </form>
  </div>
  </div>
)

}