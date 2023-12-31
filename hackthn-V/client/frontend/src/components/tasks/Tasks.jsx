import { useEffect, useState, useContext } from "react";
import Filter from "../filter/Filter";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../store/tasksStore";
import toast from "react-hot-toast";
import "./Task.css";
import TaskCard from "./TaskCard";
import { AuthContext } from "../../context/context";
import TaskRow from "./TaskRow";

const Tasks = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { fetchTasks, changeStatus, filteredTasks, statusChanged } =
    useTaskStore();

  const [view, setView] = useState("TABLE");
  const [status, setStatus] = useState({
    text: "",
    id: "",
  });
  const [effectStopper, setEffectStoper] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const tasksfunc = async () => {
      fetchTasks();
    };
    tasksfunc();
  }, []);
  useEffect(() => {
    const changed = async () => {
      if (effectStopper) {
        await changeStatus({
          text: status.text,
          id: status.id
        }, auth.token);
        if (changeStatus) {
          toast.success("Todo status has been modified !");
        }
        await fetchTasks();
        setEffectStoper(false);
      }
    };
    changed();
  }, [status]);
  
  const onChangeStatus = async (event, id) => {
    console.log(id, event);
    setStatus({
      text: event,
      id: id,
    });
    setEffectStoper(true);
  };
  const onChangeView = () => {
    setView((prev) => (prev === "CARD" ? "TABLE" : "CARD"));
  };
  const changeStatusCard = async (e, id) => {

    await onChangeStatus(e, id);
  };
  const onDeleteTaskHandle = async (id) => {
    await onDeleteTask(id);
  };

  return (
    <div className="bg-card overflow-x-scroll sm:overflow-x-hidden rounded-md lg:w-[900px] sm:w-[100%] w-full mx-auto">
      <div className="flex justify-center py-3">
        <button
          onClick={onChangeView}
          className="py-2 block w-1/2 bg-green-500 outline-none border-none text-white rounded-lg"
        >
          {view === "CARD" ? "TABULAR VIEW" : "CARDS VIEW"}
        </button>
      </div>
      <Filter />
      <div className="rounded-md max-w-full sm:w-[100%] w-full mx-auto">
        {view === "CARD" &&
          filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <TaskCard
              task={task}
              key={task._id}
              onStatusChangeHandle={changeStatusCard}
              onDeleteFromCard={onDeleteTaskHandle}
            />
          ))}
        {view !== "CARD" && (
          <table className="table-auto border-separate my-5">
            <thead className="">
              <tr className="">
                <th className="text-start font-medium max-w-[100px] min-w-[100px]">
                  Title
                </th>
                <th className="text-start font-medium max-w-[80px] min-w-[80px]">
                  Priority
                </th>
                <th className="text-start font-medium max-w-[110px] min-w-[110px]">
                  Status
                </th>
                <th className="text-start font-medium max-w-[100px] min-w-[100px]">
                  Created
                </th>
                <th className="text-start font-medium max-w-[100px] min-w-[100px]">
                  Deadline
                </th>
                <th className="text-center font-medium max-w-[100px] min-w-[100px] ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 &&
                view !== "CARD" &&
                filteredTasks.map((task) => (
                  <TaskRow task={task} onChangeStatusTodo={onChangeStatus}/>
                ))}
            </tbody>
          </table>
        )}
        {filteredTasks.length === 0 && (
          <h1 className="text-center w-full">No Todo....</h1>
        )}
      </div>
    </div>
  );
};

export default Tasks;
