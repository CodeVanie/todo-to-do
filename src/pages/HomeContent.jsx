import React, { useContext, useEffect, useState } from "react"
import TaskItem from "../components/TaskItem";
import { DataContext } from "../components/Content";

function HomeContent() {
    const { tasks, categories, sortTypes } = useContext(DataContext);
    const [taskList, setTaskList] = useState(tasks);
    const [newTask, setNewTask] = useState("");
    const [showControl, setShowControl] = useState(false);

    useEffect(() => {
        showControl ? document.getElementById("controls").classList.add("max-h-96") : 
                      document.getElementById("controls").classList.remove("max-h-96");
    }, [showControl])

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }
    function addTask() {

        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask])
            setNewTask("")
        }
    }
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }
    function moveTaskDown(index) {
        if (index < (tasks.length - 1)) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }
    function handleFiltering(category) {
        let filteredList = tasks;
        if (category !== "All")
            filteredList = tasks.filter((task,_) => task.category == category.label);
        setTaskList(filteredList);
    }
    function toggleControls() {
        setShowControl(!showControl);
    }
                // <div className="page-home-controls">
                //     <input 
                //         type="text"
                //         placeholder="Enter a task..."
                //         value={newTask}
                //         onChange={handleInputChange}/>
                //     <button 
                //         className="add-button"
                //         onClick={addTask}>
                //         Add
                //     </button>
                // </div>
                // <button 
                //     className="del-button" 
                //     onClick={() => deleteTask(index)}>
                //     Delete
                // </button>
                // <button 
                //     className="move-button" 
                //     onClick={() => moveTaskUp(index)}>
                //     👆
                // </button>
                // <button 
                //     className="move-button" 
                //     onClick={() => moveTaskDown(index)}>
                //     👇
                // </button>
    return (
        <div className="flex flex-col p-3 gap-y-2">
            <div id="controls" className="page-home-controls">
                <div className="text-lg text-center font-bold m-1" 
                    onClick={() => toggleControls()}>Controls</div>
                <hr />
                <div className="flex flex-col pb-2">
                    <h3 className="font-bold self-center">Sort By</h3>
                    <ol className="grid grid-cols-3 gap-2">
                        {sortTypes.map((sort, index) => 
                            <li key={index} className="grid">
                                <button className="page-home-control-buttons">{sort.label}</button> 
                            </li>)}
                    </ol>
                </div>
                <hr />
                <div className="flex flex-col pb-2">
                    <h3 className="font-bold self-center">Filter By</h3>
                    <ol className="grid grid-cols-3 gap-2">
                        <li className="grid">
                            <button className="page-home-control-buttons" 
                                        onClick={() => handleFiltering("All")}>All</button> 
                        </li>
                        {categories.map((category, index) => 
                            <li key={index} className="grid">
                                <button className="page-home-control-buttons" 
                                        onClick={() => handleFiltering(category)}>{category.label}</button> 
                            </li>)}
                    </ol>
                </div>
            </div>
            <div className="page-home-list">
                <ol>
                    {taskList.map((task, index) => 
                        <TaskItem key={index} task={task} />
                    )}
                </ol>
            </div>
        </div>
    )
}

export default HomeContent