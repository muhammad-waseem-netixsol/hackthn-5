import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Tasks from './components/tasks/Tasks';
import SignUp from './components/auth/Signup';
import SignIn from './components/auth/Signin';
import Navbar from './components/navbar/Navbar';
import NewTodo from './components/add-new/NewTodo';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <Router>
    <div className='container text-green-500 mx-auto px-2 min-h-screen flex justify-start flex-col gap-10'>
   
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add" element={<NewTodo />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
