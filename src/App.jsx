import { useState, createContext } from "react"
import { Header, Footer } from "./components/body.js"
import { Outlet } from "react-router-dom"

const initialTodos = [
        {
            id: "t_0",
            label: "I Task Number Zero",
            priority: "!!!",
            category: "Food",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "month",
                label: "Day 31 of the Month",
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
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
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                due: [2],
                time: "00:00"
            },
            favorite: false
        }];
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
                label: "Deadline"
            }, 
            {
                id: "s_2",
                label: "Priority"
            }, 
            {
                id: "s_3",
                label: "Letters"
            }];

export const DataContext = createContext();

function App() {
    const [modal, setModal] = useState({
        type: null,
        data: null
    })
    const [categories, setCategories] = useState(initialCategories);
    const [tasks, setTasks] = useState(initialTodos);
    const dataContext = { tasks, setTasks, categories, setCategories, modal, setModal, sortTypes };
    
    // const now = new Date();
    // const sixMonthsFromNow = new Date(now);
    // sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    // const shortDateTime = sixMonthsFromNow.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
            <DataContext.Provider value={dataContext}>
                <Outlet />
            </DataContext.Provider>
            </main>
            <Footer />
        </div>
    )
}

export default App
