import React from 'react';
import {Link } from "react-router-dom";
import useTaskStore from '../store/tasksStore';
import {motion} from "framer-motion";

const Navbar = () => {
    const {logout} = useTaskStore();
    const onLogOutHandler = () => {
        logout();
    };
    return (
        <div className=' bg-[#0c0c0c] border-b text-green-500 border-green-500 flex justify-between items-center flex-col sm:flex-row'>
           <motion.div initial={{y:-20}} animate={{y:0}} transition={{type: "spring", delay:0.1}} className='font-bold text-lg py-3'>ADVANCED-TODO</motion.div>
           <div className='h-full'>
            <ul className='flex justify-end items-center gap-4 h-full'>
                <motion.li initial={{y:-40}} animate={{y:0}} transition={{type: "spring", delay:0.2}}><Link to={`/`}>Dashborad</Link></motion.li>
                <motion.li initial={{y:-40}} animate={{y:0}} transition={{type: "spring", delay:0.3}}><Link to={`/tasks`}>Tasks</Link></motion.li>
                <motion.li initial={{y:-40}} animate={{y:0}} transition={{type: "spring", delay:0.4}}><Link to={`/add`}>Add New</Link></motion.li>
                <motion.li initial={{y:-40}} animate={{y:0}} transition={{type: "spring", delay:0.5}} onClick={onLogOutHandler}><Link to={`/`}>Logout</Link></motion.li>
            </ul>
           </div>
        </div>
    );
}

export default Navbar;
