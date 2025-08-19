import { useEffect, useState } from "react"
import { Header, Content, Footer } from "./components/body.js"

function App() {

  // Stateful variable to track the selected pages in navigation bar
  const [selectedPage, setSelectedPage] = useState("home");
  // Stateful variable to track the list of categories
  const [categories, setCategories] = useState([
          {
              id: "c_1",
              text: "All"
          }, 
          {
              id: "c_2",
              text: "Daily"
          }, 
          {
              id: "c_3",
              text: "Monthly"
          }]);
  const sortTypes = [
          {
              id: "s_1",
              text: "Deadline"
          }, 
          {
              id: "s_2",
              text: "Priority"
          }, 
          {
              id: "s_3",
              text: "Letters"
          }];
  const now = new Date();
  const shortDateTime = now.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  // Stateful variable to track the list of tasks
  const [tasks, setTasks] = useState([
          {
              id: "t_1",
              text: "Eat Breakfast",
              prirty: "!!!",
              category: categories[1].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_2",
              text: "Take a shower",
              prirty: "!",
              category: categories[2].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_3",
              text: "Walk the dog",
              prirty: "!!",
              category: categories[1].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_4",
              text: "Brace Adjustment",
              prirty: "!!",
              category: categories[2].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_5",
              text: "Drink Vitamins",
              prirty: "!",
              category: categories[1].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_6",
              text: "Drink Vitamins",
              prirty: "!",
              category: categories[2].text,
              duedate: shortDateTime
          }, 
          {
              id: "t_7",
              text: "Drink Vitamins",
              prirty: "!",
              category: categories[1].text,
              duedate: shortDateTime
          }]);

    var headFootBG = selectedPage === "modify" ? "bg-[url(/images/content-bg.jpg)] text-yellow-900" : 
                                                 "bg-[url(/images/header-bg.jpg)] bg-cover text-ptlbrown-100";

  return (
    <div className="main-app">
        <Header currentPage={selectedPage} 
                onNavBarClick={setSelectedPage} 
                bgImage={headFootBG}/>
        <Content selectedPage={selectedPage} 
                       tasks={tasks} 
                       categories={categories} 
                       sortTypes={sortTypes}
                       onDeleteTask={setTasks}
                       onDeleteCateg={setCategories}/>
        <Footer bgImage={headFootBG}/>
    </div>
  )
}

export default App
