import { ActionButtonIcon, HeartIcon, NavIcon } from "../shared/icons/IconCollection";
import todoform from "../assets/images/addtodoform.png";"../assets/images/addtodoform.png";
import viewtodo from "../assets/images/viewtodo.png";

export default function AboutContent() {
    // console.log("AboutContent rendered");

    return (
        <article className="flex flex-col text-justify p-3 gap-y-10 max-w-6xl relative z-10 text-ptlbrown-100 mx-auto">
            <section className="space-y-5 font-semibold">
                <h1 className="text-3xl text-center font-bold">What is TODO-To-Do?</h1>
                <p className="indent-7">
                    TODO-To-Do is a smart and simple task management app designed to help you stay on top of both one-time and recurring tasks. With all the essentials like creating, updating, deleting, sorting, and filtering tasks, it makes organizing your day effortless. You’ll also get handy features such as notifications, task completion tracking, favorites, and an easy-to-follow app guide — all wrapped with smooth routing so every task has its own place.
                </p>
                <p className="indent-7">
                    What sets TODO-To-Do apart is its unique approach to deadlines. Unlike most todo apps that only handle single-use tasks, this one adapts to your routines. When a deadline is reached, the app automatically rolls the task over to the next cycle — perfect for things like weekly reports, monthly bills, or any recurring responsibility. It’s not just a todo list, it’s your personal system for keeping up with the tasks that keep coming back.
                </p>
            </section>
            <section className="space-y-5 p-3">
                <h1 className="text-3xl text-center font-bold">How to use TODO-To-DO?</h1>
                <div>
                    <h2 className="text-xl font-semibold">How to add a To-Do?</h2>
                    <ul className="list-decimal ml-7 space-y-2">
                        <li>
                            In "Home <NavIcon name="home" className="inline w-6"/>" page, you can click this button <ListAddButton /> .
                            In "List Manager <NavIcon name="modify" className="inline w-6"/>" page, you can click this button <ActionButton /> .
                        </li>
                        <li>
                            "Add Todo" form will show
                            <img src={todoform} width="600px" alt="todoform" className="mx-auto" />
                        </li>
                        <li>
                            The only field required is TITLE and TIME. Time has a default value of <Time /> which is 11:59 PM. You can simply create a To-Do with just clicking the <ListAddButton /> or <ActionButton />, typing a title and clicking <SubmitButton />.
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
                            The default deadline in creating a To-Do is Today, 11:59 PM. However, creating a To-Do after 9 PM makes the default deadline Tomorrow, 11:59 PM.
                        </li>
                        <li>
                            You can choose between 3 deadline types "Time Only", "Day/s", or "Monthly".
                            <ol className="ml-7 list-[lower-alpha] space-y-2">
                                <li>
                                    <span className="font-bold"><Time /> Time Only:</span> If you want to create a To-Do for a single-use or everyday task, you can use Time Only deadline type.
                                </li>
                                <li>
                                    <span className="font-bold">Day/s:</span> If you want to create a To-Do based on day of the week (Sun, Mon, Tue, Wed, Thu, Fri, Sat). You can use this deadline type.<DeadlineDay />
                                </li>
                                <li>
                                    <DeadlineMonth />
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">
                        What's inside the "Home <NavIcon name="home" className="inline w-6"/>" page?
                    </h2>
                    <ol className="list-decimal ml-7 space-y-2">
                        <li>
                            At the very top of the page, you will see the " <Controls /> " bar. You can use this to either sort or filter the To-Do list in your "Home" page.
                        </li>
                        <li>
                            Under the " <Controls /> " bar is your list of To-Do's. Three types of To-Do's are "Pending", "Completed", and "Inactive". Inactive To-Do's are not visible in "Home <NavIcon name="home" className="inline w-6"/>" page
                        </li>
                        <li>
                            <PendingTodo />
                        </li>
                        <li>
                            <CompletedTodo />
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
            </section>
        </article>
    )
}

function ListAddButton() {
    
    return (
        <button
            className="inline-block bg-yellow-950/75 rounded-full shadow-[2px_0_8px_#160403,-2px_0_8px_#160403] cursor-pointer p-1 hover:scale-110 hover:bg-yellow-950 border-2 border-ptlbrown-200 transition-out-200 active:bg-yellow-950 w-8 active:scale-105">

            <ActionButtonIcon name="addrow" className="text-ptlbrown-200" fillInside="#e7b57400"/>
        </button> 
    )
}

function ActionButton() {
    
    return (
        <button 
        className='bg-ptlbrown-100 rounded-full border-2 border-red-950 w-8 p-1 enabled:cursor-pointer enabled:hover:scale-110 transition-out-200 disabled:bg-ptlbrown-100/20 disabled:border-red-950/20 shadow-[2px_0_8px_#160403,-2px_0_8px_#160403]'>
            <ActionButtonIcon name="addrow" className="text-red-950"/>
        </button>
    )    
}

function SubmitButton() {
    
    return (
        <button type='button'
        className="bg-red-950 w-20 self-center cursor-pointer text-white py-2 rounded-3xl  font-bold tracking-widest hover:scale-110 transition-out-200" >
            Save
        </button>
    )
}

function Controls() {
    
    return (
        <div className="inline-block border-2 border-ptlbrown-100 border-dashed px-2 bg-yellow-900/75 rounded-3xl cursor-pointer text-ptlbrown-100 w-32 text-lg text-center font-bold">
            Controls
        </div>
    )
}

function Time() {

    return(
        <input className="font-semibold border-2 rounded-lg p-1 outline-0 text-center w-24 tracking-[2px] placeholder:text-yellow-800/50" 
        type="text" placeholder='HH:MM' value="23:59" disabled={true} />
    )
}

function DeadlineMonth() {
    const DATES = Array.from({ length: 31 }, (_,i) => i + 1);
    return (
        <div className="w-full border-2 px-1 py-1 text-red-950 rounded-2xl border-yellow-700 bg-ptlbrown-100">
            <h3 className='text-left whitespace-pre-line'><span className="font-bold">DAY OF THE MONTH ( 1 ~ 31 ):</span>{`\n`}If you want to create a To-Do that has a monthly deadline, you can use the "Monthly" deadline type.</h3>
            <ol className='w-full flex overflow-x-auto gap-1 p-1 scrollbar-thin scrollbar-thumb-ptlbrown-100 scrollbar-track-red-950'>
                {DATES.map((num, index) => 
                    <li key={index} data-value={num} 
                    className="w-11 h-11 shrink-0 grid place-items-center rounded-sm font-normal cursor-pointer select-none hover:scale-110 border border-yellow-700">
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
                        className={`max-w-13 grid aspect-square rounded-full flex-1 place-items-center cursor-pointer text-sm hover:scale-110 border border-yellow-700`}>
                        {day.name}
                    </li>
                )}
            </ol>
        </div>
    )
}

function PendingTodo() {
    
    return (
        <section className="bg-yellow-900/70 rounded-4xl p-2">
            <div className="home-todo home-todo-notcompleted">
                <h2 className="home-todo-title">Pending To-Do</h2>
                <div className="home-todo-deets home-todo-deets-notcompleted">
                    <span className="max-xs:hidden">!!!</span>
                    <span className="max-md:hidden">Category</span>
                    <span>Today, 11:59 PM</span>
                </div>
                <HeartIcon className="home-todo-heart" fill={`${false ? "#e7b574" : "#00000000"}`}/>
            </div>
        </section>
    )
}

function CompletedTodo() {
    
    return (
        <section className="bg-yellow-900/70 rounded-4xl p-2">
            <div className="home-todo home-todo-completed group">
                <h2 className="home-todo-title">Completed To-Do</h2>
                <div className="home-todo-deets home-todo-deets-completed group-hover:w-7/8">
                    <span className="tracking-widest md:tracking-[10px] transition-allout-200">COMPLETED</span>
                </div>
                <HeartIcon className="home-todo-heart" fill={`${true ? "#e7b574" : "#00000000"}`}/>
            </div>
        </section>
    )
}