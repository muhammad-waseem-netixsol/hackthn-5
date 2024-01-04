import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

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
    };
    setLoading(true);
    const data = await fetch('http://localhost:8000/sign-up',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password
        })
        });
        if(!data.ok || data.status !== 201){
            setLoading(false);
            if(data.status === 422){
              toast.error("Invalid body sent...");
              return;
            }
            if(data.status === 409){
              toast.error("User already exists...");
              return;
            }
            return;
          }
          const response = await data.json();
            setLoading(false);
            toast.success(response.message);
            return navigate("/login");
}

    return ( <div>
        <h1 className='text-center py-5'>Sign Up</h1>
       <form className='max-w-[500px] flex gap-3 flex-col mx-auto' onSubmit={onSubmitHandler}>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter name...' onChange={handleInputChange} value={user.name} name='name'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="text" placeholder='Enter email...' onChange={handleInputChange} value={user.email} name='email'/>
            <input className='outline-none bg-gray-800 py-2 px-2 block w-full' type="password" placeholder='Enter password...' onChange={handleInputChange} value={user.password} name='password'/>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="submit">SIGN UP {loading && <i className="fa-solid fa-spinner animate-spin"></i>} </button>
            <div className='flex justify-center items-center gap-5'><hr className='w-[60px]' />OR <hr className='w-[60px]' /></div>
            <button  className='border w-full py-2 cursor-pointer hover:bg-green-500 hover:text-black flex justify-center items-center gap-4' type="button"><Link to={`/login`}>LOG IN</Link></button>
       </form>
    </div>
    );
}

export default SignUp;
