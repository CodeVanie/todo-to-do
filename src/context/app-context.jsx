import { createContext, useEffect, useState } from "react";
import { getDeadline, getTodosNearDeadline } from "../utils";

export const AppContext = createContext();

const todoStatuses = ["In Progress", "Completed", "Closed"];

const initialTodos = [
        {
            id: "t_0",
            label: "Learn React JS",
            priority: "!!!",
            category: "Programming",
            details: "Local Storage\nZustand\nRedux", 
            deadline: {
                type: "day",
                dueDate: new Date("2025-09-09T20:15:00+08:00"),
                datenums: [2,4,0],
                time: "20:15"
            },
            favorite: true,
            status: todoStatuses[0]
        },
        {
            id: "t_1",
            label: "Brace Adjustment",
            priority: "!!",
            category: "Dentist",
            details: "Cleaning every 6 months\nFillings every other month", 
            deadline: {
                type: "month",
                dueDate: new Date("2025-08-31T23:59:00+08:00"),
                datenums: [31],
                time: "23:59"
            },
            favorite: false,
            status: todoStatuses[0]
        },
        {
            id: "t_2",
            label: "Walk in the Morning",
            priority: "!",
            category: "Fitness",
            details: "Record walk via strava.\nTake a picture", 
            deadline: {
                type: "timeonly",
                dueDate: new Date("2025-09-11T08:00:00+08:00"),
                datenums: [],
                time: "08:00"
            },
            favorite: false,
            status: todoStatuses[0]
        }
    ];
const initialCategories = [
            {
                id: "c_2",
                label: "Food",
                active: true
            }, 
            {
                id: "c_3",
                label: "Fitness",
                active: true
            }, 
            {
                id: "c_4",
                label: "Self",
                active: false
            }, 
            {
                id: "c_5",
                label: "Dentist",
                active: true
            }, 
            {
                id: "c_6",
                label: "Programming",
                active: true
            }, 
            {
                id: "c_7",
                label: "Cooking",
                active: true
            }];
const sortTypes = [
            {
                id: "s_1",
                label: "Newest",
                active: true
            }, 
            {
                id: "s_2",
                label: "Priority",
                active: true
            },
            {
                id: "s_3",
                label: "Deadline",
                active: true
            },
            {
                id: "s_4",
                label: "Letters",
                active: false
            }];
const initialNotifs = [
    {
        id: "n_0",
        title: "Welcome to TODO-To-Do!",
        body: `Please check the "App Guide" section to learn more about the app.`,
        clicked: false
    },
    {
        id: "n_1",
        title: "Welcome TODO User!",
        body: `You can use this To-Do List application to list all your tasks.`,
        clicked: false
    },
    {
        id: "n_2",
        title: "Wanna see more from CodeVANIE?",
        body: `Check CodeVANIE's Portfolio!`,
        clicked: false
    }
]

export default function AppContextProvider({ children }) {
    const [categories, setCategories] = useState(initialCategories);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Newest");
    const [todos, setTodos] = useState(initialTodos);
    const [notifs, setNotifs] = useState(initialNotifs);
    const [hasNotif, setHasNotif] = useState(false);

    useEffect(() => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.status === todoStatuses[0]) {
                    return {
                        ...todo,
                        deadline: {
                            ...todo.deadline,
                            dueDate: getDeadline(todo.deadline)
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

    const appContext = { notifs, setNotifs, listData, setTodos, setCategories, filteredCategory, setFilteredCategory, selectedSort, setSelectedSort, hasNotif, setHasNotif };

    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
}