import React from 'react';
import {Link } from "react-router-dom";
import useTaskStore from '../store/tasksStore';

const Navbar = () => {
    const {logout} = useTaskStore();
    const onLogOutHandler = () => {
        logout();
    };
    return (
        <div className='py-2 flex justify-between items-center'>
           <div className='font-bold text-lg'>ADVANCED-TODO</div>
           <div>
            <ul className='flex justify-end items-center gap-4'>
                <li><Link to={`/`}>Dashborad</Link></li>
                <li><Link to={`/tasks`}>Tasks</Link></li>
                <li><Link to={`/add`}>Add New</Link></li>
                <li onClick={onLogOutHandler}><Link to={`/`}>Logout</Link></li>
            </ul>
           </div>
        </div>
    );
}

export default Navbar;
