import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css"



export default function Header (){ 
    return ( 
       
    <div id="header">
    <h3>JARVIS </h3>
        <nav >
             {/* <Link to="/">Home</Link> */}
            
            <Link to="/search" className="nav-link">Search Directory</Link>
           
            <Link to="/model" className="nav-link">Predict Salary</Link>
            <Link to="/analysis" className="nav-link">Analysis</Link>

        </nav>
    </div>
      
    )
}