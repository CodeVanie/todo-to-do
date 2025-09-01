import { addlogo, editlogo, deletelogo, cancellogo } from '../assets/images/nav-logos.js'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import FormModal from '../components/Modals/FormModal.jsx';
import { DataContext } from '../App.jsx';
import Sheet from '../components/Sheets/Sheet.jsx';
import SheetList from '../components/Sheets/SheetList.jsx';
import ActionButton from '../components/Buttons/ActionButton.jsx';

export const SheetContext = createContext();

function ModifyContent() {
    console.log("ModifyContent Rendered");
    const { tasks, categories, sortTypes, setTasks, setCategories, modal, setModal } = useContext(DataContext);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectedType, setSelectedType] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const scrollRef = useRef(null); 

    const openAddModal = () => setModal({ type: "add", data: null });
    const openEditModal = (item) => setModal({ type: "edit", data: item });
    const closeModal = () => setModal({ type: null, data: null });

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
        <div className="flex flex-col bg-[url(/images/header-bg.jpg)] bg-cover bg-no-repeat bg-center">
            <div className="flex justify-center gap-x-6 m-2">
                <ActionButton logo={addlogo} alt="addimg" onClick={openAddModal}/>
                <ActionButton logo={editlogo} alt="editimg" onClick={() => openEditModal([...selectedItems][0])}/>
                <ActionButton logo={deletelogo} alt="deleteimg" onClick={() => handleDeleteButton(selectedType)}/>
                <ActionButton logo={cancellogo} alt="cancelimg" onClick={unselectAll}/>
            </div>
            <div ref={scrollRef} className="page-modify-sheets">
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
            </div>
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

export default ModifyContent