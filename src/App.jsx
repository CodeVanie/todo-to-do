import { useState } from "react"
import { Header, Content, Footer } from "./components/body.js"

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

function App() {

    const [selectedPage, setSelectedPage] = useState("home");
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [categories, setCategories] = useState([
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
            }]);
        const [tasks, setTasks] = useState([
        {
            id: "t_0",
            title: "Task Number One",
            priority: "!",
            category: "Food",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                values: [1],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_2",
            title: "Task Number Two",
            priority: "!!",
            category: "Morning",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                values: [3],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_3",
            title: "Task Number Three",
            priority: "!!!",
            category: "Dentist",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                values: [6],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_4",
            title: "Task Number Four",
            priority: "!",
            category: "Self",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                values: [5],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_5",
            title: "Task Number Five",
            priority: "!!",
            category: "Friends",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                values: [4],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_6",
            title: "Task Number Six",
            priority: "!!!",
            category: "Cooking",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                values: [5],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_7",
            title: "Task Number Seven",
            priority: "!",
            category: "Friends",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "month",
                label: "Deadline",
                values: [0],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_8",
            title: "Task Number Eight",
            priority: "!!",
            category: "Food",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                values: [3],
                time: "00:00"
            },
            favorite: false
        },
        {
            id: "t_9",
            title: "Task Number Nine",
            priority: "!!!",
            category: "Morning",
            details: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ipsa placeat earum modi laboriosam et alias quo expedita quas possimus. Nobis magnam qui aspernatur dolorum iusto ducimus nam expedita suscipit.", 
            deadline: {
                type: "day",
                label: "Deadline",
                values: [2],
                time: "00:00"
            },
            favorite: false
        }
    ]);
    

    // const now = new Date();
    // const sixMonthsFromNow = new Date(now);
    // sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    // const shortDateTime = sixMonthsFromNow.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });

    var headFootBG = selectedPage === "modify" ? "bg-[url(/images/content-bg.jpg)] text-red-950" : 
                                                 "bg-[url(/images/header-bg.jpg)] bg-cover text-ptlbrown-100";

    return (
        <div className="flex flex-col min-h-screen">
            <Header currentPage={selectedPage} 
                    onNavBarClick={setSelectedPage} 
                    bgImage={headFootBG}/>
            <Content selectedPage={selectedPage} 
                    tasks={tasks} 
                    categories={categories} 
                    sortTypes={sortTypes} 
                    setTasks={setTasks} 
                    setCategories={setCategories} 
                    filteredCategory={filteredCategory} 
                    setFilteredCategory={setFilteredCategory} 
                    isAddModalOpen={isAddModalOpen} 
                    setIsAddModalOpen={setIsAddModalOpen} />
            <Footer bgImage={headFootBG}/>
        </div>
    )
}

export default App
