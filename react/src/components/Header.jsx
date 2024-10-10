import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css"



export default function Header (){ 

    return ( 
       
    <div id="header">
    <p>Product Name Placeholder</p>
        <nav >
             <Link to="/">Home</Link>
            
            <Link to="/search" >Search Directory</Link>
           
            <Link to="/model" >Predict Salary</Link>
        </nav>
    </div>
      
    )
}