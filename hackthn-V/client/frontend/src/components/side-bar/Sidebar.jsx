import React, {useEffect} from 'react';
import useTaskStore from '../store/tasksStore';

const Sidebar = () => {
    useEffect(()=> {

    }, [])
    const {loggedIn} = useTaskStore();
    console.log(loggedIn)
    return (
        <div className='sm:hidden flex gap-1 flex-col rounded-lg bg-green-500 border-2 border-green-500 absolute right-0 top-0 h-screen w-[80vw]'>
            <div className='text-center cursor-pointer hover:bg-gray-900 bg-black py-3 w-full flex'><div className='w-[70px]'><i class="fa-solid fa-house"></i></div> Dashboard</div>
            <div className='text-center cursor-pointer hover:bg-gray-900 bg-black py-3 w-full flex'><div className='w-[70px]'><i class="fa-solid fa-list-check"></i></div> Tasks</div>
            <div className='text-center cursor-pointer hover:bg-gray-900 bg-black py-3 w-full flex'><div className='w-[70px]'><i class="fa-solid fa-square-plus"></i></div> Create New</div>
            {loggedIn && <div className='text-center cursor-pointer hover:bg-gray-900 bg-black py-3 w-full flex'><div className='w-[70px]'><i class="fa-solid fa-square-plus"></i></div> Logout</div>}
           </div>
    );
}

export default Sidebar;
