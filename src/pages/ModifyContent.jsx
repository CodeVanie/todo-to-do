import { addlogo, editlogo, deletelogo, cancellogo } from '../assets/images/nav-logos.js'
import { useEffect, useRef, useState } from 'react'

function ModifyContent({ tasks, categories, sortTypes, onDeleteTask, onDeleteCateg }) {

    const [selectedItems, setSelectedItems] = useState(new Set());
    const scrollRef = useRef(null);
    const selectedSheet = useRef('');

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
        }
    },[]);

    function handleSelectedItems(index) {
        let newSelectedItems = new Set();
        selectedSheet.current === index.charAt(0) ? (newSelectedItems = new Set(selectedItems)) : 
                                                    (selectedSheet.current = index.charAt(0))

        newSelectedItems.has(index) ? newSelectedItems.delete(index) : 
                                      newSelectedItems.add(index)

        setSelectedItems(newSelectedItems);
    }
    function handleDeleteChange(selectedItems, list) {
        var newList = [];
        list.forEach(item => {
            !(selectedItems.has(item.id)) && newList.push(item)
        });
        setSelectedItems(new Set())
        return newList;
    }
    function unselectAll() {
        setSelectedItems(new Set());
    }

    return (
        <div className="page-modify">
            <div className="flex justify-center gap-x-6 m-2">
                <div className='page-modify-action-button'>
                    <img src={addlogo} alt="addimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button'>
                    <img src={editlogo} alt="editimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button' 
                        onClick={() => onDeleteTask(handleDeleteChange(selectedItems, tasks))}>
                    <img src={deletelogo} alt="deleteimg" className='w-full'/>
                </div>
                <div className='page-modify-action-button' 
                        onClick={() => unselectAll()}>
                    <img src={cancellogo} alt="cancelimg" className='w-full'/>
                </div>
            </div>
            <div ref={scrollRef} className="page-modify-sheets">
                <div className="page-modify-sheet">
                    <h1>Edit Category List</h1>
                    <div className="page-modify-sheet-list">
                        <ol>
                            {categories.map((category, index) => 
                                <li key={index} onClick={() => handleSelectedItems(category.id)}
                                    className={selectedItems.has(category.id) ? 'bg-orange-200' : 'bg-ptlbrown-100'}
                                >
                                    <div>{category.text}</div>
                                </li>)}
                        </ol>
                    </div>
                </div>
                <div className="page-modify-sheet">
                    <h1>Edit To-Do List</h1>
                    <div className="page-modify-sheet-list">
                        <ol>
                            {tasks.map((task, index) => 
                                <li key={index} onClick={() => handleSelectedItems(task.id)}
                                    className={selectedItems.has(task.id) ? 'bg-orange-200' : 'bg-ptlbrown-100'}>
                                        <h2>{task.text}</h2>
                                        <div className="flex text-sm justify-center items-center gap-x-4 w-full text-yellow-900">
                                            <div>{task.prirty}</div>
                                            <div>{task.category}</div>
                                            <div>{task.duedate}</div>
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
                                <li key={index} onClick={() => handleSelectedItems(sort.id)}
                                    className={selectedItems.has(sort.id) ? 'bg-orange-200' : 'bg-ptlbrown-100'}>
                                    <div>{sort.text}</div>
                                </li>)}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModifyContent