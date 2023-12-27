import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../store/tasksStore";
import toast from "react-hot-toast";
import "./Task.css"


const Tasks = () => {
    const {fetchTasks, changeStatus, filteredTasks, statusChanged} = useTaskStore();
    const [deleting, setDeleting] = useState(false);
    const [status, setStatus] = useState({
      text: "",
      id: ""
    });
    const [effectStopper, setEffectStoper] = useState(false);
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
    useEffect(()=> {
      const changed = async ()=> {
        if(effectStopper){
          await changeStatus(status.id, status.text);

          if(changeStatus){
            toast.success("Todo status has been modified !")
          }
          await fetchTasks();
          setEffectStoper(false);
       }
        
      }
       changed()
    }, [status]);
    const onDeleteTask = async (id) => {
      setDeleting(true);
        const token = localStorage.getItem("token");
        fetch("https://backend-advance-todo.vercel.app/task/"+id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        }).then(res => {
            if(res.ok){
                toast.success("Task Deleted");
            }
            return res.json()
        }).then(final => {
          fetchTasks();
          setDeleting(false)
        }).catch(err => {
          setDeleting(false);
            toast.error("error occurred");
        })
    };
    const onChangeStatus = async (event, id) => {
      console.log(id)
      setStatus({
        text: event.target.value,
        id:id
      });
      setEffectStoper(true);
    };
    console.log(status)
    return <div className="bg-card overflow-x-scroll sm:overflow-x-hidden rounded-md p-5 lg:w-[900px] sm:w-[100%] w-full mx-auto">
    <Filter />
    <table className="table-auto border-separate w-full my-5 overflow-x-scroll">
  <thead className="">
    <tr className="">
      <th  className="text-start font-medium max-w-[100px] min-w-[100px]">Title</th>
      <th className="text-start font-medium max-w-[90px] min-w-[90px]">Priority</th>
      <th className="text-start font-medium max-w-[110px] min-w-[110px]">Status</th>
      <th className="text-start font-medium max-w-[160px] min-w-[160px]">Created</th>
      <th className="text-start font-medium max-w-[160px] min-w-[160px]">Deadline</th>
      <th className="text-center font-medium">Actions</th>
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
      <td>{new Date(task.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}</td>
      <td className="flex gap-2"><select value={task.status} onChange={()=>{onChangeStatus(event, task._id, )}} className="outline-none bg-blue-500 cursor-pointer text-white">
        <option value="TODO">TODO</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="PENDING">PENDING</option>
        </select>
        <span className="mx-2">{deleting ? <i class="fa-solid fa-rotate-right text-red-500 animate-spin"></i> : <i onClick={()=> {onDeleteTask(task._id)}} className="fa-solid fa-trash text-red-400 cursor-pointer"></i>}</span>
        </td> 
    </tr>)}
    
  

  </tbody>
</table>  
{filteredTasks.length === 0 && <h1 className="text-center w-full">No Todo....</h1>}   
    </div>
};

export default Tasks;