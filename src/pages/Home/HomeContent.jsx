import React, { useContext, useMemo, useState } from "react";
import FormModal from "../../shared/components/Modal/FormModal.jsx";
import Controls from "./Controls/Controls.jsx"
import TodoList from "./TodoList";
import { ListAddButton } from "../../shared/components/Button/buttons.js";
import ControlSection from "./Controls/ControlSection.jsx";
import { AppContext } from "../../context/app-context";

function HomeContent() {
    console.log("HomeContent rendered");
    const { tasks, formModal, setFormModal, categories, sortTypes } = useContext(AppContext);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Priority");
    const openAddModal = () => setFormModal({ type: "add", data: null, status: true });
    const closeModal = () => setFormModal({ type: null, data: null, status: false });
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
        <div className="flex w-full flex-col p-3 gap-y-2 max-w-3xl">
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
            <FormModal  
                type={formModal.type} 
                isOpen={formModal.status} 
                onClose={closeModal} 
                modifyValues={formModal.data}
            />
        </div>
    )
}

export default HomeContent