import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>

    </BrowserRouter>
  );
}

const Home = () => {
  return <div className='home'>
    <h1 className='txt' >Home Page</h1>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <button className='btn'><a href='/login'>Get started</a></button>
  </div>
}
const Login = ({ setIsLoggedIn }) => {
  const navigeta = useNavigate()

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const form = ev.target
    const formData = {}
    formData["username"] = form.username.value
    formData["password"] = form.password.value

    const res = await fetch("http://localhost:3005/login", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken)
    setIsLoggedIn(true)
    navigeta("/dashboard")
  }

  return (
    <div className='lgn'>
      <div>
      
        <form className='sign' onSubmit={handleFormSubmit}>
        <h2>Login Your Details</h2>
             Username <br />
            <input type="text" name="username" /> <br />
            Password <br />
            <input type="password" name="password" /><br />
             <br />
             <br />
            <input className='btn' type="submit" value="Submit" />
        </form>
      </div>
      
      

    </div>
    
  )
}
const Dashboard = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken")
    console.log(accessToken); 

    const res = await fetch("http://localhost:3005/users", {
      headers: { "Authorization": "Bearer " +  accessToken}
    })
    if (res.status === 200) {
      const data = await res.json()
      setUsers(data)
    }
  }

  return <div className='mg'>
    <div className='img'></div>

    <h2 >welcome to your dashboard</h2>
    <br/>
    <br/>
    <br/>
    <a href='#'><p>Bio Data</p></a>
    <a href='#'><p>Course Registration</p></a>
    <a href='#'><p>Hostel Registration</p></a>
    
    <button className='btn' onClick={fetchUsers}>Get Users</button>
    <ul>
      {users.map((user, index) => <li>{user.username}</li>)}
    </ul>
  </div>
}

export default App;
