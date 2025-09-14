import React, { useContext } from "react";
import Controls from "./Controls/Controls.jsx"
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import { ListAddButton } from "../../shared/components/Button/buttons.js";
import ControlSection from "./Controls/ControlSection.jsx";
import { AppContext } from "../../context/app-context";
import { useControls, useControlledList } from "../../hooks.js";
import HomeContentWrapper from "../../layouts/HomeContentWrapper.jsx";
import { Outlet } from "react-router-dom";
import { getTodosNearDeadline } from "../../utils.js";

export default function HomeContent() {
    console.log("HomeContent rendered");
    const { setFilteredCategory, setSelectedSort } = useContext(AppContext);
    const { controlledList, selectedSort, filteredCategory } = useControlledList();
    const { filterList, sortList } = useControls();
   
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
                <ListAddButton />
                <ol className="p-2 space-y-1">
                {controlledList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} />
                )}
                </ol>
            </TodoList>
            <Outlet />
        </HomeContentWrapper>
    )
}