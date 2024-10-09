import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchPage from './components/SearchPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)



  return (
    <>
     <h1>HomePage</h1>
    <Routes>
      <Route path="/search" element={<SearchPage />}></Route>
    </Routes>
    </>
  )
}

export default App
