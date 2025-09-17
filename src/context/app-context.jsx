import { createContext, useEffect, useState } from "react";
import { updateTodoDeadline } from "../utils";
import { useLocalStorage } from "../hooks";

export const AppContext = createContext();

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
    }
];

export default function AppContextProvider({ children }) {
    const [categories, setCategories] = useLocalStorage("categories", []);
    const [sortTypes, setSortTypes] = useLocalStorage("sorttypes", initialSortTypes);
    const [filteredCategory, setFilteredCategory] = useLocalStorage("filteredcategory", "c_0");
    const [selectedSort, setSelectedSort] = useLocalStorage("selectedsort", "s_0");
    const [todos, setTodos] = useLocalStorage("todos", []);

    useEffect(() => {
        if (todos.length > 0) {
            setTodos(prev => prev.map(todo => {
                if (todo.status === "Pending") {
                    const {type, dueDate, datenums} = todo.deadline;
                    return {...todo,
                        deadline: {
                            ...todo.deadline,
                            dueDate: updateTodoDeadline(type, dueDate, datenums)
                        }
                    }
                } else return todo
            }));
        }
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