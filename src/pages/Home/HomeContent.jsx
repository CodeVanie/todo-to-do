import { useContext } from "react";
import Controls from "./Controls/Controls.jsx"
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import { ActionButton } from "../../shared/components/Button/buttons.js";
import ControlSection from "./Controls/ControlSection.jsx";
import { AppContext } from "../../context/app-context";
import { useControls, useControlledList } from "../../hooks.js";
import HomeContentWrapper from "../../layouts/HomeContentWrapper.jsx";
import { Outlet, useNavigate } from "react-router-dom";

export default function HomeContent() {
    // console.log("HomeContent rendered");
    const navigate = useNavigate();
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
            <TodoList hasTodo={controlledList.length > 0} onClick={() => navigate(`list/add`)}>
                <ol className="space-y-1">
                {controlledList.map((todo, index) => 
                    <TodoItem key={index} todo={todo} />
                )}
                </ol>
            </TodoList>
            {controlledList.length > 0 && 
                <ActionButton 
                    onClick={() => navigate(`list/add`)} 
                    name="addrow" size="lg" variant="wine" 
                    className="fixed bottom-3 right-3"/>}
            <Outlet />
        </HomeContentWrapper>
    )
}