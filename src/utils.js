
export function getDefaultDeadline() {
    return { type: "timeonly", datenums: [] };
} 

export function getDefaultDueDate() {
    let defaultDate = new Date();
    const now = new Date();
    const hoursNow = now.getHours();
    if (hoursNow > 18) {
        defaultDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            23,
            59,
            0
        )
    } else {
        defaultDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            0
        )
    }

    return defaultDate;
}

export function toLocaleDate(date) {
    let localeDateString = "Deadline"
    const now = new Date();
    const isSameDate = 
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate();
    const isTomorrow = 
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() + 1 === date.getDate();
    const dateLocaleString = date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
    isSameDate ? 
    localeDateString = "Today," + dateLocaleString.split(",")[1] : 
    isTomorrow ? 
    localeDateString = "Tomorrow," + dateLocaleString.split(",")[1] : 
    localeDateString = dateLocaleString;

    return localeDateString
}

export function getDeadline({ type, dueDate, datenums }) {
    // When creating a TODO, dueDate is the most nearest deadline date
    // based on the user's chosen deadline days (datenums);
    const now = new Date();
    const oldDeadline = new Date(dueDate);
    let newDeadline = new Date(dueDate);
    const isPastDeadline = now > oldDeadline;
    if (type === "month") {
        const isPastDate = (now.getDate() > datenums[0]);
        newDeadline = isPastDate && isPastDeadline ? 
            getSafeDate(newDeadline, datenums[0], now.getMonth() + 1) : // Past deadline - push to next month
            getSafeDate(newDeadline, datenums[0], now.getMonth()); // Not past deadline - stay in current Month.
    } else if (type === "day") {
        const nextDeadlineDay = 
            (isPastDeadline ? datenums.find(num => num > now.getDay()) : 
            datenums.find(num => num >= now.getDay())) ?? datenums[0];

        const daysUntilNext  = (nextDeadlineDay - now.getDay() + 7) % 7;
        // If we are past the deadline and the next deadline is today, 
        // the next deadline will be set to next week. else, we move to the next one
        newDeadline.setDate(
        daysUntilNext === 0 && isPastDeadline 
            ? now.getDate() + 7 
            : now.getDate() + daysUntilNext
        );
    } else if (type === "timeonly" && datenums.length === 0) {
        isPastDeadline ? 
            newDeadline.setDate(now.getDate() + 1) : 
            newDeadline.setDate(now.getDate());
    }
    return newDeadline
}

export function getDateToday() {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const now = new Date();

    return now.toLocaleString().split(",")[0] + ", " + days[now.getDay()];
} 

export function getTodosNearDeadline(todos) {
    let nearDeadlines = [];
    const todoList = todos;
    const now = new Date();
    todoList.map((todo) => {
        let todoDate = todo.deadline.dueDate;
        if (todo.status === "Pending" && now < todoDate) {
            let diffMinutes = Math.floor((todoDate - now) / (1000 * 60));
            let diffHours = Math.floor((todoDate - now) / (1000 * 60 * 60));
            if (diffMinutes > 1 && diffMinutes < 60) {
                nearDeadlines.push({
                    title: `DEADLINE WARNING: LESS THAN ${diffMinutes} MINUTES LEFT!`, 
                    body: `COMPLETE YOUR TODO\nTODO: "${todo.label}"\nDEADLINE: ${toLocaleDate(todoDate)}`, 
                    clicked: false
                }) 
            } else if (diffHours > 0 && diffHours < 24) {
                nearDeadlines.push({
                    title: `DEADLINE WARNING: LESS THAN ${diffHours} HOURS LEFT!`, 
                    body: `COMPLETE YOUR TODO\nTODO: "${todo.label}"\nDEADLINE: ${toLocaleDate(todoDate)}`, 
                    clicked: false
                })
            }
        }
    })
    console.log(nearDeadlines);
}

export function getSafeDate(oldDate, dayNumber, month = "") {
    const newDate = new Date(oldDate);
    month && newDate.setMonth(month, 1);
    // Find last day of the month
    const lastDay = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
    ).getDate();

    newDate.setDate(Math.min(dayNumber, lastDay));
    return newDate;
}

export function setDateToday(date) {
    const newDate = new Date(date);
    newDate.setMonth(new Date().getMonth());
    newDate.setDate(new Date().getDate());
    return newDate;
}