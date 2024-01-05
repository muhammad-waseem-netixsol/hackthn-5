import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/context";
import toast from "react-hot-toast";
import useTaskStore from "../store/tasksStore";
import html2pdf from 'html2pdf.js';

function TaskRow(props) {
  const { fetchTasks } = useTaskStore();
  const todoData = useRef(null);
  const auth = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);
  const handleDownloadPDF = () => {
    const content = `Downloaded Todo... <br /> Title => ${props.task.title} <br /> Priority => ${props.task.priority} <br /> Status => ${props.task.status} <br /> Created => ${props.task.date} <br /> Deadline => ${props.task.dueDate} <br /> <p className="text-center w-full text-red-600"><------------></p>`;

    html2pdf().from(content).set({
      margin: 10,
      filename: 'todo.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      font: { size: 12 },
    }).save();
  };
  const onDeleteTask = async (id) => {
    setDeleting(true);
    fetch("https://backend-advance-todo.vercel.app/task/" + id, {
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
  const onChangeStatus = (e, id) => {
    props.onChangeStatusTodo(e.target.value, id);
  };
var date = new Date(props.task.date);
var newdate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
var dueDate = new Date(props.task.dueDate);
var duedate= (dueDate.getMonth() + 1) + '/' + dueDate.getDate() + '/' +  dueDate.getFullYear();

  return (
    <tr key={props.task._id}>
      <td>{props.task.title}</td>
      <td>{props.task.priority}</td>
      <td>{props.task.status}</td>
      <td>{newdate}</td>
      <td>{duedate}</td>
      <td className="flex gap-2">
      <i onClick={handleDownloadPDF} className={`fa-solid fa-download cursor-pointer ${props.task.status === "COMPLETED" && "textg-gray-500"} ${props.task.status === "PENDING" && "text-orange-500"} ${props.task.status === "TODO" && "text-blue-500"}`}></i>
        <select
          value={props.task.status}
          onChange={() => {
            onChangeStatus(event, props.task._id);
          }}
          className={`outline-none ${props.task.status === "COMPLETED" && "bg-gray-500"} ${props.task.status === "PENDING" && "bg-orange-500"} ${props.task.status === "TODO" && "bg-blue-500"} cursor-pointer text-white`}
        >
          <option value="TODO">TODO</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
        </select>
        <span className="mx-2">
          {deleting ? (
            <i class="fa-solid fa-rotate-right text-red-500 animate-spin"></i>
          ) : (
            <>
            
            <i
              onClick={() => {
                onDeleteTask(props.task._id);
              }}
              className="fa-solid fa-trash text-red-400 cursor-pointer"
            ></i>
            </>
          )}
        </span>
      </td>
    </tr>
  );
}

export default TaskRow;
