import React, { useState } from "react"
import TaskItem from "./TaskItem";

function HomeContent({ tasks, categories, sortTypes }) {

    const [taskList, setTaskList] = useState(tasks);
    const [newTask, setNewTask] = useState("");

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
        if (category.text != "All")
            filteredList = tasks.filter((task,_) => task.category == category.text);
        setTaskList(filteredList);
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
        <div className="page-home">
            <div className="page-home-controls">
                <div className="page-home-control">
                    <h3>Sort By</h3>
                    <ol>
                        {sortTypes.map((sort, index) => 
                            <li key={index} className="bg-red-500 hover:bg-red-700">
                                <div className="text-white font-bold">{sort.text}</div>
                            </li>)}
                    </ol>
                </div>
                <div className="page-home-control">
                    <h3>Filter By</h3>
                    <ol>
                        {categories.map((category, index) => 
                            <li key={index} className="bg-green-500 hover:bg-green-700" onClick={() => handleFiltering(category)}>
                                <div className="text-white font-bold">{category.text}</div>
                            </li>)}
                    </ol>
                </div>
            </div>
            <div className="page-home-list">
                <ol>
                    {taskList.map((task, index) => 
                        <TaskItem key={index} task={task} 
                        className="w-3/4 h-5 text-sm rounded-t-2xl bg-yellow-600/75 p-1 justify-around gap-x-1"/>
                    )}
                </ol>
            </div>
        </div>
    )
}

export default HomeContent