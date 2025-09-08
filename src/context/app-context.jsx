import { createContext, useState } from "react";

export const AppContext = createContext();

const initialTodos = [
        {
            id: "t_0",
            label: "I Task Number Zero",
            priority: "!!!",
            category: "Food",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut provident reprehenderit dolores et optio eum labore cum aspernatur perferendis, impedit eius quisquam neque temporibus earum consequuntur facilis omnis rem fuga!", 
            deadline: {
                type: "month",
                label: "Month(31)",
                due: [31],
                time: "12:00"
            },
            favorite: true
        },
        {
            id: "t_1",
            label: "V Task Number One",
            priority: "!!",
            category: "Morning",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [3],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_2",
            label: "Z Task Number Two",
            priority: "!!!",
            category: "",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                due: [6],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_3",
            label: "R Task Number Three",
            priority: "!",
            category: "Self",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [5],
                time: "00:00"
            },
            favorite: true
        },
        {
            id: "t_4",
            label: "G Task Number Four",
            priority: "!!",
            category: "Friends",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [4],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_5",
            label: "S Task Number Five",
            priority: "!!!",
            category: "Cooking",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                due: [5],
                time: "00:00"
            },
            favorite: true
        },
        {
            id: "t_6",
            label: "L Task Number Six",
            priority: "!",
            category: "Friends",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                due: [0],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_7",
            label: "A Task Number Seven",
            priority: "!!",
            category: "Food",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [3],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_8",
            label: "E Task Number Eight",
            priority: "!!!",
            category: "Morning",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [2],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_9",
            label: "Y Task Number Nine",
            priority: "!!",
            category: "Self",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "",
                label: "",
                due: [],
                time: "00:00"
            },
            favorite: true
        },
        {
            id: "t_10",
            label: "L Task Number Ten",
            priority: "!",
            category: "Morning",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [7],
                time: "12:45"
            },
            favorite: false
        },
        {
            id: "t_11",
            label: "B Task Number Eleven",
            priority: "!",
            category: "Cooking",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 
            deadline: {
                type: "month",
                label: "Month(21)",
                due: [21],
                time: "12:00"
            },
            favorite: true
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
                label: "Morning",
                active: true
            }, 
            {
                id: "c_4",
                label: "Dentist",
                active: false
            }, 
            {
                id: "c_5",
                label: "Self",
                active: true
            }, 
            {
                id: "c_6",
                label: "Friends",
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

export default function AppContextProvider({ children }) {
    const [formModal, setFormModal] = useState({action: null, data: null, status: false});
    const [categories, setCategories] = useState(initialCategories);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Newest");
    const [todos, setTodos] = useState(initialTodos);
    const listData = [
        {id: "list_c", label: "Category", type: "category", list: categories},
        {id: "list_t", label: "To-Do", type: "todo", list: todos},
        {id: "list_s", label: "Sort", type: "sort", list: sortTypes}
    ];
    const appContext = { listData, todos, setTodos, categories, setCategories, formModal, setFormModal, sortTypes, filteredCategory, setFilteredCategory, selectedSort, setSelectedSort };
    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
}