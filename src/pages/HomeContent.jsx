import React, { useContext, useMemo, useState } from "react"
import { DataContext } from "../App"; 
import FormModal from "../components/Modals/FormModal";
import Controls from "../components/Controls/Controls";
import TodoList from "../components/TodoList";
import AddButtonList from "../components/Buttons/AddButtonList";
import ControlSection from "../components/Controls/ControlSection";

function HomeContent() {
    console.log("HomeContent rendered");
    const { tasks, modal, setModal, categories, sortTypes } = useContext(DataContext);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("");
    const openAddModal = () => setModal({ type: "add", data: null });
    const closeModal = () => setModal({ type: null, data: null });
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
        <div className="flex flex-col p-3 gap-y-2">
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
                <AddButtonList />
            </TodoList>
            {modal.type && (
                <FormModal 
                    type={modal.type} 
                    isOpen={true} 
                    onClose={closeModal} 
                    modifyValues={modal.data}
                />
            )}
        </div>
    )
}

export default HomeContent