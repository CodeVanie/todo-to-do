import { HeartIcon, NavIcon, PortfolioIcon, SoundIcon } from "../shared/icons/IconCollection";
import todoform from "../assets/images/addtodoform.png";"../assets/images/addtodoform.png";
import viewtodo from "../assets/images/viewtodo.png";
import { useState } from "react";
import ActionButton from "../shared/components/Button/ActionButton";
import useNotifSound from "../hooks";
import AboutContentWrapper from "../layouts/AboutContentWrapper";

export default function AboutContent() {
    // console.log("AboutContent rendered");
    return (
        <AboutContentWrapper>
            <article className="guide">
                <section>
                    <h1 className="text-3xl text-center">What is TODO-To-Do?</h1>
                    <p className="indent-7">
                        TODO-To-Do is a smart and simple task management app designed to help you stay on top of both one-time and recurring tasks. With all the essentials like creating, updating, deleting, sorting, and filtering tasks, it makes organizing your day effortless. You’ll also get handy features such as notifications, task completion tracking, favorites, and an easy-to-follow app guide — all wrapped with smooth routing so every task has its own place.
                    </p>
                    <p className="indent-7">
                        What sets TODO-To-Do apart is its unique approach to deadlines. Unlike most todo apps that only handle single-use tasks, this one adapts to your routines. When a deadline is reached, the app automatically rolls the task over to the next cycle — perfect for things like weekly reports, monthly bills, or any recurring responsibility. It’s not just a todo list, it’s your personal system for keeping up with the tasks that keep coming back.
                    </p>
                </section>
                <section>
                    <h1 className="text-[clamp(1.5rem,0.5vw+1.4rem,4vw)] text-center">
                        How to use TODO-To-Do?
                    </h1>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">How to add a To-Do?</h2>
                        <ul className="list-decimal xs:ml-10 ml-5 space-y-2">
                            <li>
                                In "Home <NavIcon name="home" className="inline w-6"/>" page, you can click this button <ActionButton name="addrow" size="sm" variant="wine" /> .
                                In "List Manager <NavIcon name="modify" className="inline w-6"/>" page, you can click this button <ActionButton name="addrow" size="sm" variant="cream" /> .
                            </li>
                            <li>
                                "Add Todo" form will show
                                <img src={todoform} width="600px" alt="todoform" className="mx-auto" />
                            </li>
                            <li>
                                The only field required is TITLE and TIME. Time has a default value of <Time /> which is 11:59 PM. You can simply create a To-Do with just clicking the <ActionButton name="addrow" size="sm" variant="wine" /> or <ActionButton name="addrow" size="sm" variant="cream" />, typing a title and clicking <SubmitButton />.
                            </li>
                            <li>
                                Default PRIORITY is set to Low Priority (!). You can choose between the three priority levels: Low Priority (!), Mid Priority (!!), or High Priority (!!!).
                            </li>
                            <li>
                                CATEGORY field is optional. You can categorize your To-Do's and filter your To-Do list in "Home <NavIcon name="home" className="inline w-6"/>" page using the <Controls />.
                            </li>
                            <li>
                                If you do not want a long TITLE, you can use the DETAILS field for more details about your To-Do.
                            </li>
                            <li>
                                The default deadline for a new To-Do is today at 11:59 PM. Deadlines must be set <strong>at least 1 hour</strong> from the current time. If you choose a time less than 1 hour away, the deadline will automatically shift to the next occurrence based on the selected deadline type.
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5 space-y-2">
                                    <li>Time Only sets it tomorrow</li>
                                    <li>Day/s sets it to the next day you have set or next week if you only selected 1 day (ex. Monday)</li>
                                    <li>Monthly sets it to next month</li>
                                </ol>
                            </li>
                            <li>
                                You can choose between 3 deadline types "Time Only", "Day/s", or "Monthly".
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5 space-y-2">
                                    <li>
                                        <b><Time /> Time Only:</b> If you want to create a To-Do for a single-use or everyday task, you can use Time Only deadline type.
                                    </li>
                                    <li>
                                        <b>Day/s:</b> If you want to create a To-Do based on day of the week (Sun, Mon, Tue, Wed, Thu, Fri, Sat). You can use this deadline type.<DeadlineDay />
                                    </li>
                                    <li>
                                        <DeadlineMonth />
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">
                            What's inside "Home <NavIcon name="home" className="inline w-6"/> " page?
                        </h2>
                        <ol className="list-decimal xs:ml-10 ml-5 space-y-2">
                            <li>
                                At the very top of the page, you will see the " <Controls /> " bar. You can use this to either sort or filter the To-Do list in your "Home" page.
                            </li>
                            <li>
                                Under the " <Controls /> " bar is your list of To-Do's. Three types of To-Do's are "Pending", "Completed", and "Inactive". Inactive To-Do's are not visible in "Home <NavIcon name="home" className="inline w-6"/>" page
                            </li>
                            <li>
                                <TodoItem isCompleted={false} />
                            </li>
                            <li>
                                <TodoItem isCompleted={true} />
                            </li>
                            <li>
                                You can "Left-Click" a To-Do to View all the information about your To-Do.
                                <img src={viewtodo} width="600px" alt="viewtodo" className="mx-auto" />
                            </li>
                            <li>
                                Inside the To-Do Info, you can also click the <HeartIcon className="w-6 inline" fill={`${false ? "#e7b574" : "#00000000"}`}/> icon to mark your To-Do as "Favorite". You can also use the " <Controls /> " bar to filter your list by "Favorites".
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">
                            What's inside "List Manager <NavIcon name="modify" className="inline w-6"/> " page?
                        </h2>
                        <ol className="list-decimal xs:ml-10 ml-5  space-y-2">
                            <li>
                                These <ActionButton name="addrow" size="sm" variant="cream" /> <ActionButton name="editrow" size="sm" variant="cream" /> <ActionButton name="deleterow" size="sm" variant="cream" /> <ActionButton name="reset" size="sm" variant="cream" /> are called the Action Buttons.
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5 space-y-2">
                                    <li>
                                        The first one is the <b>"Add Row"</b> <ActionButton name="addrow" size="sm" variant="cream" /> button. You can use this to either add a list or category depends on the current selected list.
                                    </li>
                                    <li>
                                        Beside the "Add Row" button is the <b>"Edit Row"</b> <ActionButton name="editrow" size="sm" variant="cream" /> button. It is used for editing an item in the list.
                                    </li>
                                    <li>
                                        The third button is the <b>"Delete"</b> <ActionButton name="deleterow" size="sm" variant="cream" /> button. You can delete 1 or more selected items.
                                    </li>
                                    <li>
                                        The last button is called <b>"Reset"</b> <ActionButton name="reset" size="sm" variant="cream" /> button. You can use this to unselect all selected items and list in just one click. 
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Under the Action Buttons, you will see 3 list types: Category List, To-Do List, and Sort List.
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5 space-y-2">
                                    <li>
                                        <b>Category List: </b>You can add, edit, and delete categories.
                                    </li>
                                    <li>
                                        <b>To-Do List: </b>You can add, edit, and delete To-Do's.
                                    </li>
                                    <li>
                                        <b>Sort List: </b> You can only change the active status of sort types using the "Edit Row" <ActionButton name="editrow" /> button.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <b>Active Status: </b> You can change the active status of an item by toggling the button <ControlStatusButton /> and change it between "Active" and "Inactive" using the "Edit Row" <ActionButton name="editrow" /> button.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">
                            What's inside "Notifications <NavIcon name="notif" hasnotif={true} className="inline w-6"/> " page?
                        </h2>
                        <ol className="list-decimal xs:ml-10 ml-5 space-y-2">
                            <li>
                                You will see all your app notifications here including:
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5  space-y-2">
                                    <li>
                                        To-Do's that have a deadline for today.
                                    </li>
                                    <li>
                                        Application new version release updates.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                There are 2 types of notifications:
                                <ol className="list-[lower-alpha] xs:ml-10 ml-5 space-y-2">
                                    <li>
                                        Clicked notifications
                                        <NotifContent clicked={true} />
                                    </li>
                                    <li>
                                        Unclicked notifications
                                        <NotifContent clicked={false} />
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Clicking all active notifications will remove the red dot on the bell icon of the Notifications <NavIcon name="notif" className="inline w-6"/> page.
                            </li>
                            <li>You will here this sound <NotifSoundButton /> if you have a new notification!</li>
                        </ol>
                    </div>
                </section>
                <section>
                    <h1 className="text-3xl text-center">More in TODO-To-DO</h1>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">
                            What's inside the "Projects <NavIcon name="projects" className="inline w-6"/> " page?
                        </h2>
                        <ul className="list-disc xs:ml-10 ml-5 space-y-2">
                            <li>You will see all CodeVANIE's Projects in this page.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[clamp(1rem,0.5vw+0.5rem,1.5vw)]">
                            What's <Portfolio />?
                        </h2>
                        <ul className="list-disc ml-10 space-y-2">
                            <li>Click this and you'll see everything about CodeVANIE.</li>
                        </ul>
                    </div>
                </section>
            </article>
        </AboutContentWrapper>
    )
}

function SubmitButton() {
    
    return (
        <button type='button' className="px-5 bg-red-950 text-white rounded-3xl font-bold tracking-widest leading-8 text-[15px]">
            Save
        </button>
    )
}
function Controls() {
    
    return (
        <div className="inline-block border-2 border-ptlbrown-100 border-dashed px-2 bg-yellow-900/75 rounded-3xl  text-ptlbrown-100 w-32 text-lg text-center font-bold">
            Controls
        </div>
    )
}
function Time() {

    return(
        <input className="font-semibold border-2 rounded-lg text-center w-24 tracking-[2px] leading-8" 
        type="text" placeholder='HH:MM' value="23:59" disabled={true} />
    )
}
function DeadlineMonth() {
    const DATES = Array.from({ length: 31 }, (_,i) => i + 1);
    return (
        <div className="w-full border-2 px-1 py-1 text-red-950 rounded-2xl border-yellow-700 bg-ptlbrown-100">
            <h3>DAY OF THE MONTH ( 1 ~ 31 ):<br /><span className="font-normal">If you want to create a To-Do that has a monthly deadline, you can use the "Monthly" deadline type.</span></h3>
            <ol className='w-full flex overflow-x-auto gap-1 p-1 scrollbar-thin scrollbar-thumb-ptlbrown-100 scrollbar-track-red-950'>
                {DATES.map((num, index) => 
                    <li key={index} data-value={num} 
                    className="w-11 h-11 shrink-0 grid place-items-center rounded-sm font-normal cursor-pointer select-none intrct-grow-10 border border-yellow-700">
                        {num}
                    </li>
                )}
            </ol>
        </div>
    )
}
function DeadlineDay() {
    const DAYS = [
        {id: 0, name: "Su"},
        {id: 1, name: "Mo"},
        {id: 2, name: "Tu"},
        {id: 3, name: "We"},
        {id: 4, name: "Th"},
        {id: 5, name: "Fr"},
        {id: 6, name: "Sa"},
    ];

    return (
        <div className={`max-w-sm flex justify-start border-2 items-center p-1 rounded-2xl text-red-950 bg-ptlbrown-100 border-yellow-700`}>
            <h3 className='tracking-widest'>DAYS</h3>
            <ol className='flex gap-x-1 w-full'>
                {DAYS.map((day, index) => 
                    <li key={index} data-value={day.id} 
                        className={`max-w-13 grid aspect-square rounded-full flex-1 place-items-center cursor-pointer text-sm intrct-grow-10 border border-yellow-700`}>
                        {day.name}
                    </li>
                )}
            </ol>
        </div>
    )
}
function TodoItem({ isCompleted }) {
    
    return (
        <section className="bg-yellow-900/70 rounded-4xl p-2">
            <div className={`home-todo ${isCompleted ? "home-todo-completed group" : "home-todo-notcompleted"}`}>
                <h2 className="home-todo-title">{isCompleted ? "Completed" : "Pending"} To-Do</h2>
                <div className={`home-todo-deets ${isCompleted ? "home-todo-deets-completed group-hover:w-7/8" : "home-todo-deets-notcompleted"}`}>
                {isCompleted ? 
                    <span className="tracking-widest md:tracking-[10px] max-xs:text-xs transition-allout-200">COMPLETED</span> : 
                    <>
                        <span className="max-xs:hidden">!!!</span>
                        <span className="max-md:hidden">Category</span>
                        <span>Today, 11:59 PM</span>
                    </>
                }
                </div>
                <HeartIcon className="home-todo-heart" fill={`${!isCompleted ? "#e7b574" : "#00000000"}`}/>
            </div>
        </section>
    )
}
function ControlStatusButton() {
    const [isActive, setIsActive] = useState(true);
    return (
        <button type="button" onClick={() => setIsActive(!isActive)}
        className={`px-2 text-white font-bold tracking-widest self-end rounded-lg leading-8 
            ${isActive ? "shadow-[1px_1px_5px_#26800a,3px_3px_5px_#26800a] bg-green-500" : 
                        "shadow-[1px_1px_5px_#430c0a,3px_3px_5px_#430c0a] bg-red-500"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
        </button>
    )
}
function NotifContent({ clicked }) {

    return (
        <div 
            className={`relative cursor-pointer border p-6 overflow-hidden text-ptlbrown-100 whitespace-pre-line hover:before:absolute hover:before:inset-0 hover:before:bg-red-800/20 active:before:absolute active:before:inset-0 active:before:bg-red-800/20 
            ${clicked ? "bg-red-950/50" : "bg-red-950"}`}>
            <h1 className="text-xl">Welcome to TODO-To-Do!</h1>
            <span className={`absolute flex size-3 right-4 top-4 ${clicked && "hidden"}`}>
                <span className={`absolute h-full w-full animate-ping rounded-4xl bg-red-400 opacity-75`}></span>
                <span className="relative size-3 rounded-full bg-red-500"></span>
            </span>
            <hr />
            <p className="mt-4">Please check the "App Guide" section to learn more about the app.</p>
        </div>
    )
}
function Portfolio() {
    
    return (
        <a href="/" className='inline-flex justify-start gap-x-3 pr-2 intrct-grow-5 transition-out-200'>
            <h1 className="leading-4 text-lg text-end self-baseline-last">
                CodeVANIE's<br />Portfolio
            </h1>   
            <PortfolioIcon className="w-6 xs:scale-115" />
        </a>
    )
}
function NotifSoundButton() {
    const playNotifSound = useNotifSound();
    return (
        <button onClick={playNotifSound} className="align-middle px-2 bg-ptlbrown-300 text-red-950 rounded-lg ring-red-950 ring-2 intrct-btn-1 hover:bg-ptlbrown-200 active:bg-ptlbrown-200">
            <SoundIcon className="w-10"/>
        </button>
    )
}