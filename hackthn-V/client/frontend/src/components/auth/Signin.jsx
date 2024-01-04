import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/context';

const SignIn = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const {loginLoading,loginError,login,loggedIn, server, invalid} = useTaskStore();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
useEffect(()=> {
    if(invalid && !loginLoading){
         toast.error(loginError)
    }
    if(loggedIn){
         navigate("/tasks");
    }
},[loginError, server, invalid,loginLoading ])

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
    };
    setLoading(true);
    const data = await fetch('https://backend-advance-todo.vercel.app/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        }),
      });
      if(!data.ok){
        setLoading(false);
        const response = await data.json();
        toast.error(response.message || "Error Occured!");
        return;
      }
      const response = await data.json();
        setLoading(false);
        toast.success(response.message);
        auth.login(response.userId,response.token);
        return navigate("/");
};
    return (
        <div className=''>
        <h1 className='text-center py-5'>Login</h1>
       <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onSubmitHandler}>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter email...' onChange={handleInputChange} value={user.email} name='email'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="password" placeholder='Enter password...' onChange={handleInputChange} value={user.password} name='password'/>
            <button className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit">SIGN IN {loading && <i className="fa-solid fa-spinner animate-spin"></i>}</button>
            <div className='flex justify-center items-center gap-5'><hr className='w-[60px]' />OR <hr className='w-[60px]' /></div>
            <button className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="button"><Link to={`/signup`}>SIGN UP</Link></button>
       </form>
    </div>
    );
}

export default SignIn;
