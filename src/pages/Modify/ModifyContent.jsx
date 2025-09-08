import { useRef, useState, useContext, createContext, useCallback, useEffect } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import TodoFormModal from '../../shared/components/Modal/TodoFormModal.jsx';
import CategoryFormModal from '../../shared/components/Modal/CategoryFormModal.jsx';
import { useFormModalControl, useSelect } from "../../hooks.js";
import AlertModal from '../../shared/components/Modal/AlertModal.jsx';
import ModifyContentWrapper from '../../layouts/ModifyContentWrapper.jsx';
import ActionButtonWrapper from '../../layouts/ActionButtonWrapper.jsx';
import SheetsSection from './Sheets/SheetsSection.jsx';
import SheetItem from './Sheets/SheetItem.jsx';

export const SheetContext = createContext();

export default function ModifyContent() {
    console.log("ModifyContent Rendered");
    const { selectedItems, setSelectedItems, selectedType, setSelectedType, handleSelectedItems, unselectAll } = useSelect();
    const { listData, setTodos, setCategories, formModal } = useContext(AppContext);
    const { openAddModal, openEditModal, closeModal } = useFormModalControl();
    const [showAlert, setShowAlert] = useState({ status: false, message: ""});

    
function handleAddButton() {
    selectedType ? 
        openAddModal() : 
        setShowAlert(prev => ({
            ...prev,
            status: true,
            message: "Please select a list first."
        }));
}
function handleEditButton() {
    if (selectedItems.size === 1) {
        const id = [...selectedItems][0];
        const item = listData[1].list.find(t => t.id === id) || listData[0].list.find(c => c.id === id);
        openEditModal(item);
    } else if (selectedItems.size === 0) {
        setShowAlert(prev => ({
            ...prev,
            status: true,
            message: "Please select an item to edit."
        }));
    } else {
        setShowAlert(prev => ({
            ...prev,
            status: true,
            message: "You cannot edit multiple items at the same time.\nPlease select 1 item only."
        }));
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
            {listData.map((list) => 
                <Sheet key={list.type} title={`Edit ${list.label} List`} 
                onSelect={() => setSelectedType(list.type)} 
                isSelected={selectedType === list.type}>
                    <SheetList>
                    {list.list.map((item) => <SheetItem key={item.id} item={item} onSelect={
                    () => handleSelectedItems(item.id, list.type)} selected={selectedItems} />)}
                    </SheetList>
                </Sheet>
            )}
            </SheetsSection>
            <TodoFormModal
                action={formModal.action} 
                isOpen={selectedType === "todo" && formModal.status} 
                onClose={closeModal} 
                modifyValues={formModal.data}
            />
            <CategoryFormModal 
                action={formModal.action} 
                isOpen={selectedType === "category" && formModal.status} 
                onClose={closeModal} 
                modifyValues={formModal.data}/>
            <AlertModal isOpen={showAlert.status} onClose={() => setShowAlert(false)} message={showAlert.message} />
        </ModifyContentWrapper>
    )
}