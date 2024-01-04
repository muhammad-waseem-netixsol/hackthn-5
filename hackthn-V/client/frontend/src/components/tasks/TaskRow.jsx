import React, {useState, useContext} from 'react';
import { AuthContext } from '../../context/context';
import toast from 'react-hot-toast';
import useTaskStore from '../store/tasksStore';
function TaskRow(props) {
    const {fetchTasks } = useTaskStore();
    const auth = useContext(AuthContext);
    const [deleting, setDeleting] = useState(false);
    const onDeleteTask = async (id) => {
        setDeleting(true);
        fetch("http://localhost:8000/task/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((final) => {
            toast.success("Task Deleted");
            fetchTasks();
            setDeleting(false);
          })
          .catch((err) => {
            setDeleting(false);
            toast.error("error occurred");
          });
      };
  return (
    <tr key={props.task._id}>
                    <td>{props.task.title}</td>
                    <td>{props.task.priority}</td>
                    <td>{props.task.status}</td>
                    <td>{props.task.date}</td>
                    <td>{props.task.dueDate}</td>
                    <td className="flex gap-2">
                      <select
                        value={props.task.status}
                        onChange={() => {
                          onChangeStatus(event, task._id);
                        }}
                        className="outline-none bg-blue-500 cursor-pointer text-white"
                      >
                        <option value="TODO">TODO</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="PENDING">PENDING</option>
                      </select>
                      <span className="mx-2">
                        {deleting ? (
                          <i class="fa-solid fa-rotate-right text-red-500 animate-spin"></i>
                        ) : (
                          <i
                            onClick={() => {
                              onDeleteTask(props.task._id);
                            }}
                            className="fa-solid fa-trash text-red-400 cursor-pointer"
                          ></i>
                        )}
                      </span>
                    </td>
                  </tr>
  )
}

export default TaskRow