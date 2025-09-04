import { useEffect, useRef, useState, useContext, createContext } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import ChooseAddModal from '../../shared/components/Modal/ChooseAddModal.jsx';
import TodoFormModal from '../../shared/components/Modal/TodoFormModal.jsx';
import CategoryFormModal from '../../shared/components/Modal/CategoryFormModal.jsx';

export const SheetContext = createContext();

function ModifyContent() {
    console.log("ModifyContent Rendered");
    const { tasks, categories, sortTypes, setTasks, setCategories, todoFormModal, setTodoFormModal } = useContext(AppContext);
    const [isAddOptionOpen, setIsAddOptionOpen] = useState(false);
    const [isCategFormOpen, setIsCategFormOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectedType, setSelectedType] = useState(null);
    const [showError, setShowError] = useState(false);
    const scrollRef = useRef(null);
    const openAddModal = () => setTodoFormModal({ type: "add", data: null, status: true });
    const openEditModal = (item) => setTodoFormModal({ type: "edit", data: item, status: true });
    const closeModal = () => setTodoFormModal({ type: null, data: null, status: false });

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
        <div className="flex w-full flex-col bg-cover bg-no-repeat bg-center">
            <section className="flex justify-center gap-x-6 m-2 z-10 relative">
                <ActionButton name="addrow" onClick={() => setIsAddOptionOpen(true)}/>
                <ActionButton name="editrow" onClick={() => openEditModal([...selectedItems][0])}/>
                <ActionButton name="deleterow" onClick={() => handleDeleteButton(selectedType)}/>
                <ActionButton name="reset" onClick={unselectAll}/>
            </section>
            <section ref={scrollRef} className="flex justify-center gap-x-4 w-full overflow-x-auto snap-x snap-mandatory px-6 pb-3 relative z-10">
                <SheetContext.Provider value={{selectedItems, handleSelectedItems}}>
                    <Sheet title="Edit Category List">
                        <SheetList type="category" itemList={categories} />
                    </Sheet>
                    <Sheet title="Edit To-Do List">
                        <SheetList type="task" itemList={tasks} />
                    </Sheet>
                    <Sheet title="Edit Sort List">
                        <SheetList type="sort" itemList={sortTypes} />
                    </Sheet>
                </SheetContext.Provider>
            </section>
            <TodoFormModal
                type={todoFormModal.type} 
                isOpen={todoFormModal.status} 
                onClose={closeModal} 
                modifyValues={todoFormModal.data}
            />
            <CategoryFormModal isOpen={isCategFormOpen} onClose={() => setIsCategFormOpen(false)}/>
            <ChooseAddModal isOpen={isAddOptionOpen} onClose={() => setIsAddOptionOpen(false)} 
                            addTaskModal={openAddModal} addCategoryModal={() => setIsCategFormOpen(true)} />
        </div>
        
    )
}

export default ModifyContent