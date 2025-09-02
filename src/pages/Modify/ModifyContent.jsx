import { addlogo, editlogo, deletelogo, cancellogo } from '../../assets/images/logos.js'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import Sheet from './Sheets/Sheet.jsx';
import SheetList from './Sheets/SheetList.jsx';
import { ActionButton } from '../../shared/components/Button/buttons.js';
import { AppContext } from '../../context/app-context.jsx';
import FormModal from '../../shared/components/Modal/FormModal.jsx';

export const SheetContext = createContext();

function ModifyContent() {
    console.log("ModifyContent Rendered");
    const { tasks, categories, sortTypes, setTasks, setCategories, formModal, setFormModal } = useContext(AppContext);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectedType, setSelectedType] = useState(null);
    const [showError, setShowError] = useState(false);
    const scrollRef = useRef(null); 
    console.log(formModal.status);
    const openAddModal = () => setFormModal({ type: "add", data: null, status: true });
    const openEditModal = (item) => setFormModal({ type: "edit", data: item, status: true });
    const closeModal = () => setFormModal({ type: null, data: null, status: false });

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
            <section className="flex justify-center gap-x-6 m-2">
                <ActionButton logo={addlogo} alt="addimg" onClick={openAddModal}/>
                <ActionButton logo={editlogo} alt="editimg" onClick={() => openEditModal([...selectedItems][0])}/>
                <ActionButton logo={deletelogo} alt="deleteimg" onClick={() => handleDeleteButton(selectedType)}/>
                <ActionButton logo={cancellogo} alt="cancelimg" onClick={unselectAll}/>
            </section>
            <section ref={scrollRef} className="flex justify-center gap-x-4 w-full overflow-x-auto snap-x snap-mandatory px-6 pb-3">
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
            <FormModal 
                type={formModal.type} 
                isOpen={formModal.status} 
                onClose={closeModal} 
                modifyValues={formModal.data}
            />
        </div>
        
    )
}

export default ModifyContent