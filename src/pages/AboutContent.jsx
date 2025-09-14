
export default function AboutContent() {
    console.log("AboutContent rendered");
    return (
        <article className="flex flex-col text-justify p-3 gap-y-2 max-w-6xl font-semibold relative z-10 text-ptlbrown-100 mx-auto">
            <h1 className="text-3xl self-center font-bold">WHAT IS TODO-To-Do?</h1>
            <p className="indent-7">
                TODO-To-Do is a smart and simple task management app designed to help you stay on top of both one-time and recurring tasks. With all the essentials like creating, updating, deleting, sorting, and filtering tasks, it makes organizing your day effortless. You’ll also get handy features such as notifications, task completion tracking, favorites, and an easy-to-follow app guide — all wrapped with smooth routing so every task has its own place.
            </p>
            <p className="indent-7">
                What sets TODO-To-Do apart is its unique approach to deadlines. Unlike most todo apps that only handle single-use tasks, this one adapts to your routines. When a deadline is reached, the app automatically rolls the task over to the next cycle — perfect for things like weekly reports, monthly bills, or any recurring responsibility. It’s not just a todo list, it’s your personal system for keeping up with the tasks that keep coming back.
            </p>
        </article>
    )
}