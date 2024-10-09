import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchPage from './components/SearchPage'
import LoginPage from './components/LoginPage'
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
// const navigate = useNavigate(); 

// useEffect(() => {
//   // Checking if user is not loggedIn
//   if (!isAuthenticated) {
//     navigate("/");
//   } else {
//     navigate("/login");
//   }
// }, [navigate, isLoggedIn]);

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/search" element={<SearchPage auth={isAuthenticated}/>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
