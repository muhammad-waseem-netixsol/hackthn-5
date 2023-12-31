import React, { useState, useEffect } from 'react';
import useTaskStore from '../store/tasksStore';
import Sort from './Sort';
const Filter = () => {
    const {filteredTasks, filterTasksByStatus, orderItemsByPriority} = useTaskStore();
    const [value, setValue] = useState("0");
    const filterHandler = (event) => {
        setValue(event.target.value);
    };
    useEffect(()=> {
        filterTasksByStatus(value);
    }, [value])
    const handleBlur = () => {
        setValue("0")
        console.log("blur")
    };
    console.log(filteredTasks)
    
    return (
        <>
        <div className='grid grid-cols-1'>
            <div className='w-full'>
                <label htmlFor="">Filter By Status</label>
                <select value={value} onBlur={handleBlur} onChange={filterHandler} className='py-2 w-full rounded outline-none cursor-pointer hover:bg-gray-900 bg-gray-800' name="" id="">
                    <option value="0">All</option>
                    <option value="TODO">To Be Done</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <div className='w-full'><Sort /></div>
        </div>
        </>
    );
}

export default Filter;
