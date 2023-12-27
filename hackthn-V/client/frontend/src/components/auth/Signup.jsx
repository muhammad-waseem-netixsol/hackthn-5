import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const navigate = useNavigate();
    const {signupLoading,signupError,signupSuccess,signup, alreadyUser} = useTaskStore();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
useEffect(()=> {
    if(alreadyUser){
         toast.error("email already exists")
    }
    if(signupSuccess){
         navigate("/login");
    }
},[signupLoading,signupSuccess])
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(user.name.trim() === "" || user.email.trim() === "" || user.password.trim() === ""){
        return toast.error("Fields can not be empty!!");
    }
    await signup({
        name: user.name,
        email: user.email,
        password: user.password
    });
    
};
console.log(signupError, signupLoading, signupSuccess)
    return ( <div>
        
        <h1 className='text-center py-5'>Sign Up</h1>
       <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onSubmitHandler}>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter name...' onChange={handleInputChange} value={user.name}  name='name'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter email...' onChange={handleInputChange} value={user.email} name='email'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="password" placeholder='Enter password...' onChange={handleInputChange} value={user.password} name='password'/>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit">SIGN UP {signupLoading && <i className="fa-solid fa-spinner animate-spin"></i>} </button>
            <div className='flex justify-center items-center gap-5'><hr className='w-[60px]' />OR <hr className='w-[60px]' /></div>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit"><Link to={`/login`}>LOG IN</Link></button>
       </form>
    </div>
    );
}

export default SignUp;
