import React, { useContext, useMemo, useState } from "react";
import TodoFormModal from "../../shared/components/Modal/TodoFormModal.jsx";
import Controls from "./Controls/Controls.jsx"
import TodoList from "./TodoList";
import { ListAddButton } from "../../shared/components/Button/buttons.js";
import ControlSection from "./Controls/ControlSection.jsx";
import { AppContext } from "../../context/app-context";

function HomeContent() {
    console.log("HomeContent rendered");
    const { tasks, todoFormModal, setTodoFormModal, categories, sortTypes } = useContext(AppContext);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Priority");
    const openAddModal = () => setTodoFormModal({ type: "add", data: null, status: true });
    const closeModal = () => setTodoFormModal({ type: null, data: null, status: false });
    const categoriesWithAll = useMemo(() => 
        [{id: "c_0", label: "All"}, ...categories]
    ,[categories]);
    const controlledList = useMemo(() => {
        let list = [...tasks];

        if (filteredCategory !== "All") {
            return tasks.filter((t,_) => t.category === filteredCategory)
        }

        if (selectedSort === "Priority") {
            return [...tasks].sort((a, b) => b.priority.length - a.priority.length);
        } else if (selectedSort === "Letters") {
            return [...tasks].sort((a, b) => a.label.localeCompare(b.label));
        }

        return list;
    },[tasks, filteredCategory, selectedSort]);

    return (
        <div className="flex w-full flex-col p-3 gap-y-2 max-w-4xl relative h-[80vh]">
            <Controls>
                <ControlSection 
                    title="Sort By" 
                    items={sortTypes} 
                    onControlClick={setSelectedSort} 
                    control={selectedSort}/>
                <hr />
                <ControlSection 
                    title="Filter By" 
                    items={categoriesWithAll} 
                    onControlClick={setFilteredCategory} 
                    control={filteredCategory} />
            </Controls>
            <TodoList todoList={controlledList}>
                <ListAddButton openModal={openAddModal} />
            </TodoList>
            <TodoFormModal  
                type={todoFormModal.type} 
                isOpen={todoFormModal.status} 
                onClose={closeModal} 
                modifyValues={todoFormModal.data}
            />
        </div>
    )
}

export default HomeContent