import { createContext, useEffect, useState } from "react";
import { updateTodoDeadline } from "../utils";

export const AppContext = createContext();

const todoStatuses = ["Pending", "Completed", "Inactive"];

const now = new Date();
now.setHours(23);
now.setMinutes(59);
const initialTodos = [
        {
            id: "t_0",
            label: "Notifications Todo",
            priority: "!!!",
            category: "",
            details: "This Todo is a sample TODO which will trigger a notification when the deadline is today.", 
            deadline: {
                type: "timeonly",
                dueDate: now,
                datenums: [],
                time: "23:59"
            },
            favorite: true,
            status: todoStatuses[0]
        },
        {
            id: "t_1",
            label: "Completed Todo",
            priority: "!!",
            category: "",
            details: "This Todo is a sample TODO which will show what it would look like if a TODO is completed.", 
            deadline: {
                type: "timeonly",
                dueDate: now,
                datenums: [],
                time: "23:59"
            },
            favorite: false,
            status: todoStatuses[1]
        },
        {
            id: "t_2",
            label: "Inactive Todo",
            priority: "!",
            category: "",
            details: "This Todo is a sample TODO which is in Inactive status and will not be displayed in Home page.", 
            deadline: {
                type: "timeonly",
                dueDate: now,
                datenums: [],
                time: "23:59"
            },
            favorite: false,
            status: todoStatuses[2]
        },
        {
            id: "t_3",
            label: "Learn React (Days Deadline)",
            priority: "!!!",
            category: "Programming",
            details: "Local Storage\nZustand\nRedux", 
            deadline: {
                type: "day",
                dueDate: new Date("2025-09-09T20:15:00+08:00"),
                datenums: [0, 2, 4],
                time: "20:15"
            },
            favorite: true,
            status: todoStatuses[0]
        },
        {
            id: "t_4",
            label: "Morning Walk (Time Only Deadline)",
            priority: "!",
            category: "Fitness",
            details: "Record walk via strava.\nTake a picture", 
            deadline: {
                type: "timeonly",
                dueDate: new Date("2025-09-12T23:00:00+08:00"),
                datenums: [],
                time: "23:00"
            },
            favorite: false,
            status: todoStatuses[0]
        },
        {
            id: "t_5",
            label: "Brace Adjustment (Monthly Deadline)",
            priority: "!!",
            category: "Dentist",
            details: "Cleaning every 6 months\nFillings every other month", 
            deadline: {
                type: "month",
                dueDate: new Date("2025-09-14T02:59:00+08:00"),
                datenums: [14],
                time: "02:59"
            },
            favorite: false,
            status: todoStatuses[0]
        }
    ];
const initialCategories = [
            {
                id: "c_3",
                label: "Food",
                active: true
            }, 
            {
                id: "c_4",
                label: "Fitness",
                active: true
            }, 
            {
                id: "c_5",
                label: "Self",
                active: false
            }, 
            {
                id: "c_6",
                label: "Dentist",
                active: true
            }, 
            {
                id: "c_7",
                label: "Programming",
                active: true
            }, 
            {
                id: "c_8",
                label: "Cooking",
                active: true
            }];
const initialSortTypes = [
            {
                id: "s_1",
                label: "Priority",
                active: true
            },
            {
                id: "s_2",
                label: "Deadline",
                active: true
            },
            {
                id: "s_3",
                label: "A-Z",
                active: false
            }];

export default function AppContextProvider({ children }) {
    const [categories, setCategories] = useState(initialCategories);
    const [sortTypes, setSortTypes] = useState(initialSortTypes);
    const [filteredCategory, setFilteredCategory] = useState("c_0");
    const [selectedSort, setSelectedSort] = useState("s_0");
    const [todos, setTodos] = useState(initialTodos);

    useEffect(() => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.status === todoStatuses[0]) {
                    const {type, dueDate, datenums} = todo.deadline;
                    return {
                        ...todo,
                        deadline: {
                            ...todo.deadline,
                            dueDate: updateTodoDeadline(type, dueDate, datenums)
                        }
                    }
                } else return todo
            })
        );
    }, [])
    const listData = [
        {id: "list_c", label: "Category", type: "category", list: categories},
        {id: "list_t", label: "To-Do", type: "todo", list: todos},
        {id: "list_s", label: "Sort", type: "sort", list: sortTypes}
    ];

    const appContext = { listData, setTodos, setCategories, setSortTypes, filteredCategory, setFilteredCategory, selectedSort, setSelectedSort };

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
}