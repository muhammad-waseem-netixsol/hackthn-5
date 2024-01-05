import React, { useState, useEffect } from 'react';
import useTaskStore from '../store/tasksStore';
const Sort = (props) => {
    const [priority, setPriority] = useState("ALL");
    const {orderItemsByPriority} = useTaskStore();
    useEffect(()=> {
        orderItemsByPriority(priority)
    },[priority])
    const onFilterByPriority = event => {
        setPriority(event.target.value);
    };
    return (
        <div className='my-5'>
        <div>Filter by priority</div>
        <div className='rounded-lg text-end flex justify-between items-center'>
            <select value={priority} onChange={onFilterByPriority} name="priority" id="" className='w-full cursor-pointer bg-gray-800 hover:bg-gray-900 rounded-lg py-2 outline-none'>
                <option value="ALL">All</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
                <option value="MED">MED</option>
            </select>
        </div>
        </div>
    );
}

export default Sort;
