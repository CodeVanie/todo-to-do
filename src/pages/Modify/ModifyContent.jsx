import { useContext } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import { useSelect } from "../../hooks.js";
import ModifyContentWrapper from '../../layouts/ModifyContentWrapper.jsx';
import ActionButtonWrapper from '../../layouts/ActionButtonWrapper.jsx';
import SheetsSection from './Sheets/SheetsSection.jsx';
import SheetItem from './Sheets/SheetItem.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import AlertContextProvider from '../../context/alert-context.jsx';

export default function ModifyContent() {
    // console.log("ModifyContent Rendered");
    const navigate = useNavigate();
    const { 
        selectedItems, 
        setSelectedItems, 
        selectedType, 
        setSelectedType, 
        handleSelectedItems, 
        unselectAll 
    } = useSelect();
    const { listData, setTodos, setCategories } = useContext(AppContext);

function handleAddButton() {
    selectedType === "todo" ? navigate(`add/todo`) : 
    selectedType === "category" ? navigate(`add/category`) : 
    navigate(`alert/a_0`);
}
function handleEditButton() {
    if (selectedItems.size === 1) {
        const id = [...selectedItems][0];
        const item = listData[1].list.find(t => t.id === id) || listData[0].list.find(c => c.id === id);
        selectedType === "todo" && navigate(`edit/todo/${item.id}`);
        selectedType === "category" && navigate(`edit/category/${item.id}`);
    } else if (selectedItems.size === 0) {
        navigate(`alert/a_1`);
    } else {
        navigate(`alert/a_2`);
    }
}
function handleDeleteButton(type) {
    let list = type === "todo" ? listData[1].list : listData[0].list;
    var newList = [];
    list.forEach(item => {
        !(selectedItems.has(item.id)) && newList.push(item)
    });
    setSelectedItems(new Set());
    setSelectedType(null);
    if (type === "todo")
        setTodos(newList);
    if (type === "category")
        setCategories(newList);
}

    return (
        <ModifyContentWrapper>
            <ActionButtonWrapper>
                <ActionButton name="addrow" onClick={handleAddButton}/>
                <ActionButton name="editrow" onClick={handleEditButton}/>
                <ActionButton name="deleterow" onClick={() => handleDeleteButton(selectedType)}/>
                <ActionButton name="reset" onClick={unselectAll}/>
            </ActionButtonWrapper>
            <SheetsSection>
            {listData.map((data) => 
                <Sheet key={data.type} title={`Edit ${data.label} List`} 
                onSelect={() => setSelectedType(data.type)} 
                isSelected={selectedType === data.type}>
                    <SheetList>{data.list.map((item) => <SheetItem key={item.id} item={item} onSelect={() => 
                    handleSelectedItems(item.id, data.type)} selected={selectedItems} isTodo={data.type === "todo"}/>)}
                    </SheetList>
                </Sheet>
            )}
            </SheetsSection>
            <AlertContextProvider>
                <Outlet />
            </AlertContextProvider>
        </ModifyContentWrapper>
    )
}