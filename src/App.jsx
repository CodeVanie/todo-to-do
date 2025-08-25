import { useState } from "react"
import { Header, Content, Footer } from "./components/body.js"

function App() {

  // Stateful variable to track the selected pages in navigation bar
  const [selectedPage, setSelectedPage] = useState("home");
  // Stateful variable to track the list of categories
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

  const now = new Date();
  const sixMonthsFromNow = new Date(now);
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const shortDateTime = sixMonthsFromNow.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  
  // Stateful variable to track the list of tasks
  const [tasks, setTasks] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
                 isAddModalOpen={isAddModalOpen} 
                 setIsAddModalOpen={setIsAddModalOpen} />
        <Footer bgImage={headFootBG}/>
    </div>
  )
}

export default App
