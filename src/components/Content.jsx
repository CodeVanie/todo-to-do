import AboutContent from "./AboutContent"
import ModifyContent from "./ModifyContent"
import Profile from "./Profile"
import HomeContent from "./HomeContent"
import ProjectsContent from "./ProjectsContent"

function Content({ selectedPage, tasks, categories, sortTypes, onDeleteTask, onDeleteCateg }) {

    return (
        <>
            <div className="border border-yellow-700 w-full h-full">
                {selectedPage === "home" && <HomeContent tasks={tasks} 
                                    categories={categories} sortTypes={sortTypes}/>}
                {selectedPage === "aboutme" && <AboutContent />}
                {selectedPage === "projects" && <ProjectsContent />}
                {selectedPage === "extra1" && <ModifyContent tasks={tasks} 
                                    categories={categories} 
                                    sortTypes={sortTypes} 
                                    onDeleteTask={onDeleteTask}
                                    onDeleteCateg={onDeleteCateg}/>}
                {selectedPage === "extra2" && <Profile />}
            </div>
        </>
    )
}

export default Content