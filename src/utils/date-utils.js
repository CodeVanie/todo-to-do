
const DAYNAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getDefaultDeadline(date) {
    return { type: "timeonly", dueDate: date, datenums: [] };
}

export function getDefaultDueDate(time) {
    // DEFAULT DUE DATE OF A TODO IS TODAY 11:59 PM
    const { currYear, currMonth, currDate } = getCurrentDateTime();
    let defaultDate = new Date(currYear, currMonth, currDate, 23, 59, 0, 0 );

    if (time) {
        const [hour, minute] = time.split(":");
        defaultDate.setHours(hour, minute);
    }

    return defaultDate;
}

export function toLocaleDate(date) {
    let localeDateString = "Deadline"
    const { currYear, currMonth, currDate } = getCurrentDateTime();
    const dueDate = new Date(date);
    const isSameDate = 
    currYear === dueDate.getFullYear() &&
    currMonth === dueDate.getMonth() &&
    currDate === dueDate.getDate();
    const isTomorrow = 
    currYear === dueDate.getFullYear() &&
    currMonth === dueDate.getMonth() &&
    currDate + 1 === dueDate.getDate();
    const dateLocaleString = dueDate.toLocaleString("en-US", {
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

export function createTodoDeadline(type, time, days) {
    const { now, currMonth, currDate, currHour, currDay } = getCurrentDateTime();

    let newDeadline = newDateVar();
    const [hour, minute] = time.split(":");
    const todayOneHourMore = new Date(now);
    todayOneHourMore.setHours(currHour+1);
    newDeadline.setHours(hour, minute, 0, 0);

    const invalidTime = newDeadline < todayOneHourMore;
    switch (type) {
        case "timeonly":
            invalidTime && newDeadline.setDate(currDate + 1);
        break;
        case "day":
            const nextDeadlineDay = (
                invalidTime 
                ? days.find(num => num > currDay)
                : days.find(num => num >= currDay)
            ) ?? days[0];
            const daysUntilNext = (nextDeadlineDay - currDay + 7) % 7;
            const addDays = daysUntilNext === 0 && invalidTime ? 7 : daysUntilNext;

            newDeadline.setDate(currDate + addDays);
        break;
        case "month":
            const dateNumber = days[0];
            const invalidDate = (dateNumber < currDate) || ((dateNumber === currDate) && invalidTime);
            newDeadline = getSafeDate(newDeadline, dateNumber, 
                currMonth + (invalidDate ? 1 : 0));
        break;
        default:
            break;
    }

    return newDeadline;
}

export function updateTodoDeadline(type, oldDeadline, days) {
    const { now, currMonth, currDate, currDay } = getCurrentDateTime();

    let newDeadline = new Date(setDateToday(oldDeadline));
    const pastDeadlineDue = now > oldDeadline;
    const pastTimeDue = now > setDateToday(oldDeadline);
    if (pastDeadlineDue) {
        switch (type) {
            case "timeonly":
                pastTimeDue && newDeadline.setDate(currDate + 1);
            break;
            case "day":
                const nextDeadlineDay = (
                    pastTimeDue ? 
                    days.find(num => num > currDay) : 
                    days.find(num => num >= currDay) 
                ) ?? days[0];
                const daysUntilNext = (nextDeadlineDay - currDay + 7) % 7;
                const addDays = daysUntilNext === 0 && pastTimeDue ? 7 : daysUntilNext;
                
                newDeadline.setDate(currDate + addDays);
            break;
            case "month":
                const dateNumber = days[0];
                const isNotValidDate = (dateNumber <= currDate) && pastTimeDue;
                newDeadline = 
                    getSafeDate(newDeadline, dateNumber, 
                        currMonth + (isNotValidDate ? 1 : 0))
            break;
            default:
            break;
        }
        return newDeadline;
    }

    return oldDeadline;
}

export function getDateTodayString() {
    const now = newDateVar();
    
    const date = new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
    }).format(now);

    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);

    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: true, // ensures AM/PM
    }).format(now);

    return `${date}, ${dayName} ${time}`;
}

export function toDayNames(days) {
    const newArray = days.map((day) => DAYNAMES[day]);
    return newArray.join(", ");
} 

export function getTodosNearDeadline(todos, notifs) {
    let nearDeadlines = [];
    const todoList = todos;
    const { now } = getCurrentDateTime();
    let notifCount = notifs.length;
    todoList.map((todo) => {
        let todoDate = todo.deadline.dueDate;
        if (todo.status === "Pending" && now < todoDate) {
            let diffMinutes = Math.ceil((todoDate - now) / (1000 * 60));
            let diffHours = Math.ceil((todoDate - now) / (1000 * 60 * 60));
            if (diffMinutes > 0 && diffMinutes < 60) {
                nearDeadlines.push({
                    id: `n_${notifCount++}-${todo.id}M${diffMinutes}`,
                    title: `DEADLINE WARNING:\nLESS THAN ${diffMinutes} MINUTES LEFT!`, 
                    body: `Title: "${todo.label}"\nDEADLINE: ${toLocaleDate(todoDate)}`, 
                    path: `view/${todo.id}`,
                    clicked: false
                }) 
            } else if (diffHours > 0 && diffHours < 24) {
                nearDeadlines.push({
                    id: `n_${notifCount++}-${todo.id}H${diffHours}`,
                    title: `DEADLINE WARNING:\nLESS THAN ${diffHours} HOURS LEFT!`, 
                    body: `Title: "${todo.label}"\nDEADLINE: ${toLocaleDate(todoDate)}`, 
                    path: `view/${todo.id}`,
                    clicked: false
                })
            }
        }
    })
    return nearDeadlines;
}

function getSafeDate(oldDate, dayNumber, month = "") {
    const newDate = new Date(oldDate); // Preserve oldDate time
    month && newDate.setMonth(month, 1); // Specify a month (optional)
    const lastDay = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
    ).getDate(); // Get the last day of the month
    newDate.setDate(Math.min(dayNumber, lastDay)); // Set new date
    return newDate;
}

function setDateToday(date) {
    // Convert a date to today's date. Time is preserved.
    const oldDate = new Date(date);
    const newDate = new Date();
    newDate.setHours(oldDate.getHours(), oldDate.getMinutes(), 0, 0);
    return newDate;
}

function getCurrentDateTime() {
    const now = new Date();
    const currYear = now.getFullYear();
    const currMonth = now.getMonth();
    const currDate = now.getDate();
    const currDay = now.getDay();
    const currHour = now.getHours();
    const currMinute = now.getMinutes();
    const currSecond = now.getSeconds();
    const currMillis = now.getMilliseconds();

    return { now, currYear, currMonth, currDate, currDay, currHour, currMinute, currSecond, currMillis }
}

function newDateVar() {
    const { now } = getCurrentDateTime();
    const newDate = now;
    newDate.setSeconds(0,0);
    return newDate;
}