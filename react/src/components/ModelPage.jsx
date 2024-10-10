import { useState } from "react"

export default function ModelPage (){ 

 const [modelInputs,setModelInputs] =useState({location:"", title:""});
 const [modelResponse,setModelResponse] =useState({});


 
const handleSubmit = async (e) => { 
    e.preventDefault(); 
    let body = {"location": modelInputs.location, "role": modelInputs.title}
    console.log("Handle submit");
    const response = await fetch(`http://localhost:5000/api/predict`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json();
    console.log("Model Response:", data);
    setModelResponse(data)
}

 const handleChange = (event) => { 
    console.log("HANDLE change", event.target.name, event.target.value);
    setModelInputs({...modelInputs, [event.target.name]: event.target.value})

 }

    return ( 
        <div>
        <h1>Model</h1>
        <form>
        <input type="text" placeholder="location" name="location" value={modelInputs.location} onChange={handleChange}/>
        <input type="text" placeholder="title" name="title" value={modelInputs.title} onChange={handleChange}/>
        <button onClick={handleSubmit}>Submit</button>
        </form>
        {modelResponse.predicted_salary ? <p>{modelResponse.predicted_salary}</p>: <></>}
        </div>
    )
}