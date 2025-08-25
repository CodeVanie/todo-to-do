import { addlogo, editlogo, deletelogo, cancellogo } from '../assets/images/nav-logos.js'
import { useEffect, useRef, useState, useContext } from 'react'
import AddModal from '../components/AddModal.jsx';
import { DataContext } from '../components/Content.jsx';

function ModifyContent() {

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
        <div className="page-modify">
            <div className="flex justify-center gap-x-6 m-2">
                <div className='page-modify-action-button' 
                        onClick={() => setIsAddModalOpen(true)}>
                    <img src={addlogo} alt="addimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button' 
                        onClick={() => handleEditButton()}>
                    <img src={editlogo} alt="editimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button' 
                        onClick={() => handleDeleteButton(selectedType)}>
                    <img src={deletelogo} alt="deleteimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button' 
                        onClick={unselectAll}>
                    <img src={cancellogo} alt="cancelimg" className='w-full'/>
                </div>
            </div>
            <div ref={scrollRef} className="page-modify-sheets">
                <div className="page-modify-sheet">
                    <h1>Edit Category List</h1>
                    <div className="page-modify-sheet-list">
                        <ol>
                            {categories.map((category, index) => 
                                <li key={index} onClick={() => handleSelectedItems(category, "category")}
                                    className={selectedItems.has(category) ? 'bg-orange-200' : 'bg-ptlbrown-100'}
                                >
                                    <div>{category.label}</div>
                                </li>)}
                        </ol>
                    </div>
                </div>
                <div className="page-modify-sheet">
                    <h1>Edit To-Do List</h1>
                    <div className="page-modify-sheet-list">
                        <ol>
                            {tasks.map((task, index) => 
                                <li key={index} onClick={() => handleSelectedItems(task, "task")}
                                    className={selectedItems.has(task) ? 'bg-orange-200' : 'bg-ptlbrown-100'}>
                                        <h2>{task.title}</h2>
                                        <div className="flex text-sm justify-center items-center gap-x-4 w-full text-yellow-900">
                                            <div>{task.priority}</div>
                                            <div>{task.category}</div>
                                            <div>{task.deadline}</div>
                                        </div>
                                </li>)}
                        </ol>
                    </div>
                </div>
                <div className="page-modify-sheet">
                    <h1>Edit Sort List</h1>
                    <div className="page-modify-sheet-list">
                        <ol>
                            {sortTypes.map((sort, index) => 
                                <li key={index} onClick={() => handleSelectedItems(sort, "sort")}
                                    className={selectedItems.has(sort) ? 'bg-orange-200' : 'bg-ptlbrown-100'}>
                                    <div>{sort.label}</div>
                                </li>)}
                        </ol>
                    </div>
                </div>
            </div>
            <AddModal type="add" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            {/* <AddModal type="edit" isOpen={isEd} onClose={() => setIsAddModalOpen(false)} currentValues={[...selectedItems][0]}/> */}
        </div>
        
    )
}

export default ModifyContent