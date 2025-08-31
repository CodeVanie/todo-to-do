import { addlogo, editlogo, deletelogo, cancellogo } from '../assets/images/nav-logos.js'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import FormModal from '../components/Modals/FormModal.jsx';
import { DataContext } from '../App.jsx';
import Sheet from '../components/Sheets/Sheet.jsx';
import SheetList from '../components/Sheets/SheetList.jsx';
import ActionButton from '../components/Buttons/ActionButton.jsx';

export const SheetContext = createContext();

function ModifyContent() {
    console.log("Modify Content Rendered");
    const { tasks, categories, sortTypes, setTasks, setCategories, isAddModalOpen, setIsAddModalOpen } = useContext(DataContext);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectedType, setSelectedType] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showError, setShowError] = useState(false);
    const scrollRef = useRef(null); 

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
        }
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
function handleEditButton() {
    selectedItems.size > 0 ? setShowError(true) :
                                setIsEditModalOpen(true);
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
                <ActionButton logo={addlogo} alt="addimg" onClick={() => setIsAddModalOpen(true)}/>
                <ActionButton logo={editlogo} alt="editimg" onClick={() => handleEditButton()}/>
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
            <FormModal type="add" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            {/* <AddModal type="edit" isOpen={isEd} onClose={() => setIsAddModalOpen(false)} currentValues={[...selectedItems][0]}/> */}
        </div>
        
    )
}

export default ModifyContent