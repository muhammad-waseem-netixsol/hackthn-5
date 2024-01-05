import React , { useContext, useState, useCallback, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Tasks from './components/tasks/Tasks';
import SignUp from './components/auth/Signup';
import SignIn from './components/auth/Signin';
import Navbar from './components/navbar/Navbar';
import NewTodo from './components/add-new/NewTodo';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/context';
import TodoList from './components/tasks/TodoList';


let logoutTimer;

function App() {
  let routes;
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState();
  const [userId, setUserId] = useState(null);
//  logout
  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
    setTokenExpiration(null)
    localStorage.removeItem("user");
  }, []);
// login
  const login = useCallback((uid, jwtToken, expirationDate)=>{
  const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  setTokenExpiration(tokenExpirationDate);
  setToken(jwtToken);
  setUserId(uid);
  localStorage.setItem("user", JSON.stringify({
    userId:uid,
    token:jwtToken,
    expiration: tokenExpirationDate.toISOString()
  }));
}, []);
// checking remaining time.
useEffect(()=> {
  if(token && tokenExpiration){
    let remainingTime = tokenExpiration.getTime() - new Date().getTime()
    logoutTimer = setTimeout(logout, remainingTime)
  }else{
    clearTimeout(logoutTimer);
  }
},[token, logout, tokenExpiration]);
// check loggedIn user
useEffect(()=> {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  if(userDetails && userDetails.token && new Date(userDetails.expiration) > new Date()){
    login(userDetails.userId, userDetails.token, new Date(userDetails.expiration));
  }
},[login]);

  if(token){
    routes = (
      <React.Fragment>
      <Route path="/" element={<Dashboard />} />
      <Route path="/list" element={<TodoList />} />
      <Route path="/add" element={<NewTodo />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </React.Fragment>
    )
  }else{
    routes = (
      <React.Fragment>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </React.Fragment>
    )
  }
  return (
    <AuthContext.Provider value={{isLoggedIn:!!token,token:token,userId: userId ,login:login, logout:logout}}>
    <Router>
      <div className='container text-green-500 mx-auto px-2 min-h-screen flex justify-start flex-col gap-10'>
      <Toaster />
      <Navbar />
      <Routes>
       {routes}
      </Routes>
      </div>
    </Router>
    </AuthContext.Provider>
  )
}

export default App
