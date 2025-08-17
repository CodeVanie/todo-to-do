import { useState } from "react"
import Content from "./components/Content"
import Header from "./components/Header"
import Footer from "./components/Footer";

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
              text: "Alphabetical"
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

  return (
    <>
      <div className="flex flex-col">
        <header><Header currentPage={selectedPage} onNavBarClick={setSelectedPage}/></header>
        <main><Content selectedPage={selectedPage} 
                       tasks={tasks} 
                       categories={categories} 
                       sortTypes={sortTypes}
                       onDeleteTask={setTasks}
                       onDeleteCateg={setCategories}/></main>
        <Footer />
      </div>
    </>
  )
}

export default App
