import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Blog from './components/Blog'
import Login from './components/Login'
import Signup from './components/Signup'
import MyPost from './components/Mypost'
//import'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from './components/navbar'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/'element={<Login />}/>
        <Route path='/home' element={<Blog />}/>
        <Route path='/Signup' element={<Signup />}/>
        <Route path='/mypost' element={<MyPost />}/>
    </Routes>
    </BrowserRouter>
  )  
}

export default App;
