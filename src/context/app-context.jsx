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
            favorite: false
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
            category: "Dentist",
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
            favorite: false
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
            favorite: false
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
        }
    ];
const initialCategories = [
            {
                id: "c_1",
                label: "Food"
            }, 
            {
                id: "c_2",
                label: "Morning"
            }, 
            {
                id: "c_3",
                label: "Dentist"
            }, 
            {
                id: "c_4",
                label: "Self"
            }, 
            {
                id: "c_5",
                label: "Friends"
            }, 
            {
                id: "c_6",
                label: "Cooking"
            }];
const sortTypes = [
            {
                id: "s_1",
                label: "Priority"
            }, 
            {
                id: "s_2",
                label: "Deadline"
            }, 
            {
                id: "s_3",
                label: "Letters"
            }];

function AppContextProvider({ children }) {
    const [todoFormModal, setTodoFormModal] = useState({type: null, data: null, status: false});
    const [categories, setCategories] = useState(initialCategories);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Priority");
    const [tasks, setTasks] = useState(initialTodos);
    const appContext = { tasks, setTasks, categories, setCategories, todoFormModal, setTodoFormModal, sortTypes, filteredCategory, setFilteredCategory, selectedSort, setSelectedSort };
    return (
        <AppContext.Provider value={appContext}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider