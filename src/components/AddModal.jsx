import { useContext, useEffect, useRef, useState } from 'react';
import closeButton from '../assets/images/close-logo.svg'
import correct from '../assets/images/correct-logo.svg'
import wrong from '../assets/images/wrong-logo.svg'
import { createPortal } from "react-dom"
import { DataContext } from './Content';

const days = [
    {id: 0, name: "Su"},
    {id: 1, name: "Mo"},
    {id: 2, name: "Tu"},
    {id: 3, name: "We"},
    {id: 4, name: "Th"},
    {id: 5, name: "Fr"},
    {id: 6, name: "Sa"},
];
const dateNum = Array.from({ length: 31 }, (_,i) => i + 1);

function AddModal({ type = "add", isOpen = false, onClose }) {
    const { tasks, setTasks, categories } = useContext(DataContext);
    const [showOptions, setShowOptions] = useState(false);
    const [formData, setFormData] = useState({
        id: `t_${tasks.length}`,
        title: "",
        priority: "!",
        category: "Select a category",
        details: "",
        deadline: {
            type: "timeonly",
            label: "",
            values: new Set(),
            time: "00:00"
        }
    });
    const [deadline, setDeadline] = useState({
        type: "timeonly",
        selectedDaysID: new Set(),
        selectedDaysName: new Set(),
        selectedDayNumber: 0
    });
    const [deadlineStatement, setDeadlineStatement] = useState("This task should be completed before the end of the day");
    const [isTimeValid, setIsTimeValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (deadline.type) {
            if (deadline.type === "timeonly") {
                setDeadlineStatement(
                    `Complete Before: [ TIme: ${formData.deadline.time} ] [ Day: Today ]`)
            } else if (deadline.type === "Days") {
                setDeadlineStatement(
                    `Complete Before: [ Time: ${formData.deadline.time} ]  
                    [ Day/s: ${[...deadline.selectedDaysName].join(",")} ]`
                )
            } else if (deadline.type === "Month") {
                let warnNoDate = ` (If that date doesn’t exist in a month, 
                your deadline will move to the last day of that month.)`
                setDeadlineStatement(
                    `Complete Before: [ Time: ${formData.deadline.time} ] 
                    [ Day ${deadline.selectedDayNumber} of the Month ]
                    ${deadline.selectedDayNumber > 28 ? warnNoDate : ""}` 
                )
            }
        }
    }, [formData.deadline.time, deadline])
    
    useEffect(() => {
      isOpen ? document.body.style.overflow = "hidden" : 
               document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = "auto";
      }
    },[isOpen])

    if (!isOpen) return null;
    
    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "time") {
            if (value) {
                const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
                if (!timePattern.test(value)) {
                setIsTimeValid(false);
                setErrorMessage("Wrong Input: Invalid time format.");
                } else {
                    setIsTimeValid(true);
                    setErrorMessage("");
                }
            } else {
                setErrorMessage("Missing Value: Time is required.");
            }
            setFormData(prev => ({...prev, 
                deadline: {...prev.deadline,
                    time: value
                }
            }));
        } else {
            if (name === "title") {
                value ? setErrorMessage("") : setErrorMessage("Missing Value: Title is required.");
            }
            setFormData(prev => ({...prev, [name]: value}));
        }
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
        if (type === "day") {
            const { id, name } = JSON.parse(e.target.dataset.value);
            const updatedDaysName = new Set(deadline.selectedDaysName);
            const updatedDaysID = new Set(deadline.selectedDaysID);
            if (updatedDaysID.has(id)) {
                updatedDaysName.delete(name);
                updatedDaysID.delete(id);
                if (updatedDaysID.size === 0) {
                    setDeadline(prev => ({...prev, 
                        type: "timeonly", 
                        selectedDaysID: new Set(), 
                        selectedDaysName: new Set()}));
                    return;
                }
            } else {
                updatedDaysName.add(name);
                updatedDaysID.add(id);
            }
            
            setDeadline(prev => ({...prev, 
                type: "Days",
                selectedDaysID: updatedDaysID,
                selectedDaysName: updatedDaysName,
                selectedDayNumber: 0
            }));
            setFormData(prev => ({...prev, 
                deadline: {...prev.deadline,
                    label: `Day/s(${[...updatedDaysName].join(",")})`,
                    type,
                    values: updatedDaysID
                }
            }));
        }

        if (type === "month") {
            const newSelectedNumber = Number(e.target.dataset.value);

            if (newSelectedNumber === deadline.selectedDayNumber) {
                setDeadline(prev => ({...prev, type: "timeonly", selectedDayNumber: 0}));
                return;
            }
            setDeadline(prev => ({...prev, 
                type: "Month",
                selectedDaysID: new Set(),
                selectedDayNumber: newSelectedNumber,
                selectedDaysName: new Set()
            }));
            setFormData(prev => ({...prev, 
                deadline: {...prev.deadline,
                    label: `Month(${newSelectedNumber})`,
                    type,
                    values: new Set([newSelectedNumber])
                }
            }));
        }
    }
    function handleAddTask() {
        // Date Warning Functionality
        // const dateNow = new Date();
        // const timeDeads = formData.deadline.time.split(":");
        // if (formData.deadline.type === "day") {
        //     let deadlines = formData.deadline.values;
        //     let dayNow = dateNow.getDay();
        //     let HoursNow =  dateNow.getHours();
        //     let MinutesNow =  dateNow.getMinutes();
        //     deadlines.forEach(day => {
        //         console.log(day);
        //         let beforeDay = ((day-1) === -1 ? 6 : (day-1));
        //         let beforeHours = ((HoursNow-1) === -1 ? 23 : (HoursNow-1));
        //         let beforeMinutes = ((Number(timeDeads[1])-1) === -1 ? 59 : (Number(timeDeads[1])-1));
        //         if (dayNow === beforeDay) {
        //             console.log("Day Warning!!!");
        //         }
        //         console.log(dayNow);
        //         if (dayNow === day) {
        //             console.log("D DAY Warning!!!");
        //             console.log(beforeMinutes);
        //             console.log(timeDeads[0]);
        //             console.log(Number(timeDeads[1]));
        //             if (MinutesNow === beforeMinutes) {
        //                 console.log("Minute Warning!!!");
        //             } 
        //         }
        //     });
        // }
        formData.title && formData.deadline.time && setTasks(prev => [...prev, formData]);
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
                               type="text" maxLength={21} onChange={handleChange} required/>
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
                            <div className='flex items-center gap-x-1'>
                                <input id='deadline-time' name='time' type="text" placeholder='HH:MM' value={formData.deadline.time || ""}
                                   pattern='^([01]\d|2[0-3]):([0-5]\d)$' maxLength={5} onChange={handleChange} required/>
                                <div className='w-6 h-6'>
                                    {isTimeValid ? 
                                        <img id='timeValid' src={correct} alt="valid" /> : 
                                        <img id='timeValid' src={wrong} alt="invalid" />}
                                </div>
                            </div>
                        </div>
                        <div className={`deadline-section 
                             ${deadline.type === "Days" ? "border-red-950" : "border-yellow-700"}`}>
                            <h3 className='text-left'>Days</h3>
                            <ol className='flex gap-x-1 justify-center'>
                                {days.map((day, index) => 
                                    <li key={index} data-value={JSON.stringify(day)} onClick={(e) => handleDeadlineClick(e, "day")} className={`deadline-day 
                                        ${deadline.selectedDaysName.has(day.name) ? "border-2 border-red-950 text-xs/[25px]" : 
                                                                           "border border-yellow-700 text-xs/[27px]"}`}>
                                        {day.name}
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
                        <p className={`deadline-statement ${errorMessage ? "text-wrong" : "text-yellow-950"}`}>
                            {errorMessage || deadlineStatement}
                        </p>
                    </div>
                    <button id='submit-button' type='submit' onClick={handleAddTask} disabled={errorMessage || !formData.title}>
                        Save
                    </button>
                </form>
            </div>
        </div>,
        document.body
    )
}

export default AddModal