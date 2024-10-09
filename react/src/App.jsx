import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Placeholder from "./components/Placeholder"

function App() {
  const [count, setCount] = useState(0)

const handleClick = (e) => { 

}

  return (
    <>
     <h1>JVLink Placeholder Header</h1>
     <Placeholder/>
   
    </>
  )
}

export default App
