import { useContext, useRef, useState } from 'react';
import closeButton from '../assets/images/close-logo.svg'
import { createPortal } from "react-dom"
import { DataContext } from './Content';

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const dateNum = Array.from({ length: 31 }, (_,i) => i + 1);

function AddModal({ type = "add", isOpen = false, onClose }) {
    if (!isOpen) return null;
    const isEdit = type === "edit";

    const { tasks, setTasks, categories } = useContext(DataContext);
    const [showOptions, setShowOptions] = useState(false);
    const [formData, setFormData] = useState({
        id: `t_${tasks.length}`,
        title: "",
        priority: "!",
        category: "Select a category",
        details: "",
        deadline: ""
    });
    const [deadline, setDeadline] = useState({
        type: "",
        selectedDays: new Set(),
        selectedDayNumber: 0
    });
    const textAreaRef = useRef(null);
    const timeValue = useRef("");
    
function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
}
function handleCategorySelect(e) {
    document.getElementById("select-category-options").classList.add("hidden");
    setShowOptions(!showOptions);
    setFormData(prev => ({...prev, category: e.target.dataset.value}));
}
function handleTextAreaSize() {
    const textArea = textAreaRef.current;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
}
function handleDeadlineClick(e, type) {
    const { value } = e.target.dataset;

    if (type === "day") {
        const updatedDays = new Set(deadline.selectedDays);
        updatedDays.has(value) ? updatedDays.delete(value) : updatedDays.add(value);
        if (updatedDays.size === 0) {
            setDeadline(prev => ({...prev, 
                type: "",
                selectedDays: new Set()
            }))
            return;
        }

        setDeadline(prev => ({...prev, 
            type: "Days",
            selectedDays: updatedDays,
            selectedDayNumber: 0
        }))
        setFormData(prev => ({...prev, deadline: updatedDays.size ? `Days(${[...updatedDays].join(",")})` : ""}));
    }

    if (type === "month") {
        const newSelectedNumber = Number(value);

        if (newSelectedNumber === deadline.selectedDayNumber) {
            setDeadline(prev => ({...prev, 
                type: "",
                selectedDayNumber: 0
            }))
            return;
        }

        setDeadline(prev => ({...prev, 
            type: "Month",
            selectedDayNumber: newSelectedNumber,
            selectedDays: new Set()
        }))
        setFormData(prev => ({...prev, deadline: `Month(${newSelectedNumber})`}));
    }
}
function handleAddTask() {
    formData.title && timeValue && setTasks(prev => [...prev, formData]);
}

    return createPortal (
        <div className="modal">
            <div className="modal-form">
                <button onClick={onClose} className="modal-close-button">
                    <img src={closeButton} alt="closebutton" />
                </button>
                <h1 className='font-bold text-4xl font-quicks'>Add Task</h1>
                <form className='modal-form-fields' onSubmit={(e) => {e.preventDefault(); onClose();}}>
                    <div className='modal-form-field'>
                        <label htmlFor="modal-form-title" className='items-center'>Title: </label>
                        <input id='modal-form-title' name='title' placeholder='Add a title...'
                               type="text" onChange={handleChange} required/>
                    </div>
                    <div className='modal-form-field'>
                        <label className='items-center'>Priority: </label>
                        <div className='modal-form-priority'>
                            <h3 className={formData.priority == "!" ? "border-red-950 scale-110 border-dotted text-red-950" : 
                                                                      "border-yellow-700 border-dotted text-yellow-700"}
                                 onClick={() => setFormData(prev => ({...prev, priority: "!"}))}>!</h3>
                            <h3 className={formData.priority == "!!" ? "border-red-950 scale-110 border-dashed text-red-950" : 
                                                                       "border-yellow-700 border-dashed text-yellow-700"}
                                 onClick={() => setFormData(prev => ({...prev, priority: "!!"}))}>!!</h3>
                            <h3 className={formData.priority == "!!!" ? "border-red-950 scale-110 text-red-950" : 
                                                                        "border-yellow-700 text-yellow-700"}
                                 onClick={() => setFormData(prev => ({...prev, priority: "!!!"}))}>!!!</h3>
                        </div>
                    </div>
                    <div className='modal-form-field'>
                        <label htmlFor='select-category' className='items-center'>
                            Category: 
                        </label>
                        <div className="relative">
                            <button id='select-category' type='button'
                                    onClick={() => setShowOptions(!showOptions)} >
                                {formData.category}
                                <span className="ml-2">▼</span>
                            </button>
                            <ul id="select-category-options" className={showOptions ? "max-h-96" : "max-h-0"}>
                                {categories.map((c, index) => 
                                    <li key={index} data-value={c.label}
                                        onClick={handleCategorySelect} 
                                        className="px-4 py-2 hover:bg-purple-100 cursor-pointer">
                                        {c.label}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='modal-form-field'>
                        <label htmlFor="modal-form-details" className='items-center'>Details: </label>
                        <textarea id='modal-form-details' name='details' ref={textAreaRef} placeholder='Add task details...'
                                  onInput={handleTextAreaSize} onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col gap-y-1 items-center'>
                        <div className='deadline-header'>
                            <h2 className='text-lg font-semibold'>Set a Deadline</h2>
                            <input id='deadline-time' name='time' type="text" placeholder='HH:MM' value="00:00"
                                   pattern='^([01]\d|2[0-3]):([0-5]\d)$' onChange={handleChange} required/>
                        </div>
                        <div className={`deadline-section 
                             ${deadline.type === "Days" ? "border-red-950" : "border-yellow-700"}`}>
                            <h3 className='text-left'>Days</h3>
                            <ol className='flex gap-x-1 justify-center'>
                                {days.map((day, index) => 
                                    <li key={index} data-value={day} onClick={(e) => handleDeadlineClick(e, "day")} className={`deadline-day 
                                        ${deadline.selectedDays.has(day) ? "border-2 border-red-950 text-xs/[25px]" : 
                                                                           "border border-yellow-700 text-xs/[27px]"}`}>
                                        {day}
                                    </li>
                                )}
                            </ol>
                        </div>
                        <div className={`deadline-section 
                             ${deadline.type === "Month" ? "border-red-950" : "border-yellow-700"}`}>
                            <h3 className='text-left'>Day of the Month ( 1 ~ 31 )</h3>
                            <ol className='flex gap-x-1 w-full p-1 overflow-x-auto scrollbar-hide'>
                                {dateNum.map((num, index) => 
                                    <li key={index} data-value={num} onClick={(e) => handleDeadlineClick(e, "month")} className={`deadline-month 
                                        ${deadline.selectedDayNumber === num ? "border-2 border-red-950 scale-110" : 
                                                                               "border border-yellow-700"}`}>
                                        {num}
                                    </li>
                                )}
                            </ol>
                        </div>
                        <p className='text-xs'>This task should be completed before </p>
                    </div>
                    <button id='submit-button' type='submit' onClick={handleAddTask}>Save</button>
                </form>
            </div>
        </div>,
        document.body
    )
}

export default AddModal