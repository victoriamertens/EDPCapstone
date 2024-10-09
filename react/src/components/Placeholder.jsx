


export default function Placeholder () { 
 const handleClick = async () => { 
    const response = await fetch(`http://localhost:3000/`)
    .then(res =>res.json());
    console.log(response);
 }

    return <button onClick={handleClick}>Click Me</button>
}