import deletelogo from '../assets/images/delete-logo.png'
import editlogo from '../assets/images/edit-logo.png'
import addlogo from '../assets/images/add-logo.png'
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

    return (
        <>
            <div className="page-modify">
                <div ref={scrollRef} className="page-modify-sheets">
                    <div className="page-modify-sheet">
                        <div className="page-modify-sheet-actionbar">
                            <div className='page-modify-sheet-actionbar-delete' 
                                 onClick={() => onDeleteCateg(handleDeleteChange(selectedItems, categories))}>
                                <img src={deletelogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-edit'>
                                <img src={editlogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-add'>
                                <img src={addlogo} alt="" className='w-7 h-7'/>
                            </div>
                        </div>
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
                        <div className="page-modify-sheet-actionbar">
                            <div className='page-modify-sheet-actionbar-delete' 
                                 onClick={() => onDeleteTask(handleDeleteChange(selectedItems, tasks))}>
                                <img src={deletelogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-edit'>
                                <img src={editlogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-add'>
                                <img src={addlogo} alt="" className='w-7 h-7'/>
                            </div>
                        </div>
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
                        <div className="page-modify-sheet-actionbar">
                            <div className='page-modify-sheet-actionbar-delete'>
                                <img src={deletelogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-edit'>
                                <img src={editlogo} alt="" className='w-6 h-7'/>
                            </div>
                            <div className='page-modify-sheet-actionbar-add'>
                                <img src={addlogo} alt="" className='w-7 h-7'/>
                            </div>
                        </div>
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
        </>
    )
}

export default ModifyContent