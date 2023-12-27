import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {
    const navigate = useNavigate();
    const {loginLoading,loginError,login,loggedIn, server, invalid} = useTaskStore();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
useEffect(()=> {
    if(invalid){
         toast.error("Invalid credentials!")
    }
    if(loggedIn){
         navigate("/tasks");
    }
},[loginError, server, invalid])
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(user.email.trim() === "" || user.password.trim() === ""){
        return toast.error("Fields can not be empty!!");
    }
    await login(
        user.email,
        user.password
    );
    
};
    return (
        <div className=''>
        <h1 className='text-center py-5'>Login</h1>
       <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onSubmitHandler}>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter email...' onChange={handleInputChange} value={user.email} name='email'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="password" placeholder='Enter password...' onChange={handleInputChange} value={user.password} name='password'/>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit">SIGN IN {loginLoading && <i className="fa-solid fa-spinner animate-spin"></i>}</button>
            <div className='flex justify-center items-center gap-5'><hr className='w-[60px]' />OR <hr className='w-[60px]' /></div>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit"><Link to={`/signup`}>SIGN UP</Link></button>
       </form>
    </div>
    );
}

export default SignIn;
