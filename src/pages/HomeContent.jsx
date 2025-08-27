import React, { useContext, useMemo, useState } from "react"
import TaskItem from "../components/TaskItem";
import { DataContext } from "../components/Content";
import AddModal from "../components/AddModal";

function HomeContent() {
    const { tasks, categories, sortTypes, isAddModalOpen, setIsAddModalOpen, filteredCategory, setFilteredCategory } = useContext(DataContext);
    const [showControl, setShowControl] = useState(false);
    const taskList = useMemo(() => {
        if (filteredCategory === "All") {
            return tasks;
        } else {
            console.log(tasks.filter((t,_) => t.category === filteredCategory))
            return tasks.filter((t,_) => t.category === filteredCategory)
        }
    },[tasks, filteredCategory]);

    return (
        <div className="flex flex-col p-3 gap-y-2">
            <div id="controls" className={`page-home-controls ${showControl ? "max-h-96" : "max-h-10"}`}>
                <div className="text-lg text-center font-bold m-1" 
                    onClick={() => setShowControl(!showControl)}>Controls</div>
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
                                        onClick={() => setFilteredCategory("All")}>All</button> 
                        </li>
                        {categories.map((category, index) => 
                            <li key={index} className="grid">
                                <button className="page-home-control-buttons" 
                                        onClick={() => setFilteredCategory(category.label)}>{category.label}</button> 
                            </li>)}
                    </ol>
                </div>
            </div>
            <div className="page-home-list">
                <ol>
                    <button className={`page-home-add-button ${tasks.length ? "h-14 text-3xl" : 
                                                                              "w-full h-full text-6xl"}`}
                            onClick={() => setIsAddModalOpen(!isAddModalOpen)}>
                        +
                    </button> 
                    {taskList.map((task, index) => 
                        <TaskItem key={index} task={task} />
                    )}
                </ol>
            </div>
            <AddModal type="add" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    )
}

export default HomeContent