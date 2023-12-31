import React, {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useTaskStore from '../store/tasksStore';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Dashboard = () => {
    const {fetchTasks, tasks} = useTaskStore();
    const navigate = useNavigate();
    useEffect(()=> {
        const tasksfunc = async () =>{
            fetchTasks();
        }
        tasksfunc();  
    }, []);
    const todo = tasks.filter(t => t.status === "TODO") || [];
    const completed = tasks.filter(t => t.status === "COMPLETED") || [];
    const pending = tasks.filter(t => t.status === "PENDING") || [];

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 min-h-full place-items-center'>
         <div className='h-[150px] w-full rounded-xl shadow-md border-2 border-green-500 flex flex-col justify-center items-center gap-3'>
            <div className='font-extrabold text-2xl'>{completed.length}</div>
            <div className='font-normal text-xl'>Completed</div>
         </div>
        
         <div className='h-[150px] w-full rounded-xl shadow-md border-2 flex border-green-500 flex-col justify-center items-center gap-3'>
         <div className='font-extrabold text-2xl'>{todo.length}</div>
            <div className='font-normal text-xl'>Todo</div>
         </div>
         <div className='h-[150px] w-full rounded-xl shadow-md border-2 flex border-green-500 flex-col justify-center items-center gap-3'>
         <div className='font-extrabold text-2xl'>{pending.length}</div>
            <div className='font-normal text-xl'>Pending</div>
         </div>
        </div>
    );
}

export default Dashboard;
