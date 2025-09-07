import { useEffect, useRef, useState, useContext, createContext } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import TodoFormModal from '../../shared/components/Modal/TodoFormModal.jsx';
import CategoryFormModal from '../../shared/components/Modal/CategoryFormModal.jsx';
import { useFormModalControl } from "../../hooks.js";
import AlertModal from '../../shared/components/Modal/AlertModal.jsx';
import ModifyContentWrapper from '../../layouts/ModifyContentWrapper.jsx';
import ActionButtonWrapper from '../../layouts/ActionButtonWrapper.jsx';

export const SheetContext = createContext();

function ModifyContent() {
    console.log("ModifyContent Rendered");
    const { tasks, categories, sortTypes, setTasks, setCategories, formModal } = useContext(AppContext);
    const { openAddModal, openEditModal, closeModal } = useFormModalControl();
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectedType, setSelectedType] = useState("");
    const [showAlert, setShowAlert] = useState({ status: false, message: " "});
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current && (scrollRef.current.scrollLeft = 
            scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2);
    },[]);

function handleSelectedItems(item, type) {
    setSelectedItems(prev => {
        let newSelectedItems = new Set();

        type !== selectedType ? setSelectedType(type) : 
                                newSelectedItems = new Set(prev);

        newSelectedItems.has(item) ? newSelectedItems.delete(item) : 
                                     newSelectedItems.add(item);
        return newSelectedItems;
    })
}
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
        openEditModal([...selectedItems][0]);
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
    let list = type === "task" ? tasks : categories;
    var newList = [];
    list.forEach(item => {
        !(selectedItems.has(item)) && newList.push(item)
    });
    setSelectedItems(new Set());
    setSelectedType(null);
    if (type === "task")
        setTasks(newList);
    if (type === "category")
        setCategories(newList);
}
function unselectAll() {
    setSelectedItems(new Set());
}

    return (
        <ModifyContentWrapper>
            <ActionButtonWrapper>
                <ActionButton name="addrow" onClick={handleAddButton}/>
                <ActionButton name="editrow" onClick={handleEditButton}/>
                <ActionButton name="deleterow" onClick={() => handleDeleteButton(selectedType)}/>
                <ActionButton name="reset" onClick={unselectAll}/>
            </ActionButtonWrapper>
            <section ref={scrollRef} 
                className="relative flex xl:justify-center items-start gap-x-2 px-5 snap-x snap-mandatory z-5 scrollbar-hide overflow-x-auto">
                <SheetContext.Provider value={{selectedItems, handleSelectedItems}}>
                    <Sheet title="Edit Category List" 
                        onSelect={() => setSelectedType("category")} 
                        isSelected={selectedType === "category"}>
                        <SheetList type="category" itemList={categories} />
                    </Sheet>
                    <Sheet title="Edit To-Do List" 
                        onSelect={() => setSelectedType("todo")} 
                        isSelected={selectedType === "todo"}>
                        <SheetList type="todo" itemList={tasks} />
                    </Sheet>
                    <Sheet title="Edit Sort List" 
                        onSelect={() => setSelectedType("sort")} 
                        isSelected={selectedType === "sort"}>
                        <SheetList type="sort" itemList={sortTypes} />
                    </Sheet>
                </SheetContext.Provider>
            </section>
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

export default ModifyContent