import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../store/tasksStore";
import toast from "react-hot-toast";
import "./Task.css"


const Tasks = () => {
    const {fetchTasks, tasks, filteredTasks} = useTaskStore();
    const [alltask, setTasks] = useState([...tasks]);
    const navigate = useNavigate();
    useEffect(()=> {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if(!token){
            navigate("/login");
        }
        const tasksfunc = async () =>{
            fetchTasks();
        }
         tasksfunc(); 
    }, [])
    const onDeleteTask = async (id) => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8000/task/"+id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            
        }).then(res => {
            if(res.ok){
                
                toast.success("Task Deleted");
            }
        }).catch(err => {
            toast.error("error occurred");
        })
    };
    return <div className="bg-card rounded-md p-5 md:w-[900px] sm:w-[90%] w-full mx-auto">
        
    <Filter />
    <table className="table-auto w-full my-5">
  <thead>
    <tr>
      <th className="text-start font-medium">Title</th>
      <th className="text-start font-medium">Priority</th>
      <th className="text-start font-medium">Status</th>
      <th className="text-start font-medium">Date</th>
      <th className="text-start font-medium">Actions</th>
    </tr>
  </thead>
  <tbody>

 {filteredTasks.length > 0 && filteredTasks.map(task => <tr key={task._id}>
     <td>{task.title}</td>
      <td>{task.priority}</td>
      <td>{task.status}</td>
      <td>{new Date(task.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}</td>
      <td className="flex gap-2"><select className="outline-none bg-blue-500 cursor-pointer text-white">
        <option value="TODO">TODO</option>
        <option value="TODO">COMPLETED</option>
        <option value="TODO">PENDING</option>
        </select>
        <span><i onClick={()=> {onDeleteTask(task._id)}} className="fa-solid fa-trash text-red-400 cursor-pointer"></i></span>
        </td> 
    </tr>)}
    
  

  </tbody>
</table>  
{filteredTasks.length === 0 && <h1 className="text-center w-full">No Todo....</h1>}   
    </div>
};

export default Tasks;