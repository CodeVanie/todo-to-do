import React, { useContext, useState } from "react";
import { TodoFormModal, ViewTodoModal } from "../../shared/components/Modal/modals.js"
import Controls from "./Controls/Controls.jsx"
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import { ListAddButton } from "../../shared/components/Button/buttons.js";
import ControlSection from "./Controls/ControlSection.jsx";
import { AppContext } from "../../context/app-context";
import useControls, { useControlledList, useFormModalControl } from "../../hooks.js";
import HomeContentWrapper from "../../layouts/HomeContentWrapper.jsx";

export default function HomeContent() {
    console.log("HomeContent rendered");
    const { formModal, setFilteredCategory, setSelectedSort } = useContext(AppContext);
    const { controlledList, selectedSort, filteredCategory } = useControlledList();
    const [viewTodo, setViewTodo] = useState({data: {},status: false});
    const { openAddModal, closeModal } = useFormModalControl();
    const [filterList, sortList] = useControls();

    return (
        <HomeContentWrapper>
            <Controls>
                <ControlSection title="Sort By" items={sortList} 
                    onControlClick={setSelectedSort} control={selectedSort}/>
                <hr />
                <ControlSection title="Filter By" items={filterList} 
                    onControlClick={setFilteredCategory} control={filteredCategory}/>
            </Controls>
            <TodoList>
                <ListAddButton openModal={openAddModal} />
                <ol className="p-2 space-y-1">
                {controlledList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} onView={setViewTodo}/>
                )}
                </ol>
            </TodoList>
            <TodoFormModal  
                type={formModal.type} 
                isOpen={formModal.status} 
                onClose={closeModal} 
                modifyValues={formModal.data}
            />
            <ViewTodoModal 
                isOpen={viewTodo.status} 
                onClose={() => setViewTodo({data: {},status: false})} 
                todo={viewTodo.data} />
        </HomeContentWrapper>
    )
}