import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchPage from './components/SearchPage'
import LoginPage from './components/LoginPage'
import RequireAuth from './hooks/RequireAuth.jsx'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate, 
  redirect
} from "react-router-dom";
import { AuthProvider } from './hooks/AuthorizationContext.jsx';




function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/" element={console.log("USER:", user)}></Route>
      <Route path="/search" element={
        <RequireAuth>
        <SearchPage auth={isAuthenticated}/>
        </RequireAuth>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
