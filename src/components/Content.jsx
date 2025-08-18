import AboutContent from "../pages/AboutContent"
import ModifyContent from "../pages/ModifyContent"
import ProfileContent from "../pages/ProfileContent"
import HomeContent from "../pages/HomeContent"
import ProjectsContent from "../pages/ProjectsContent"

function Content({ selectedPage, tasks, categories, sortTypes, onDeleteTask, onDeleteCateg }) {

    return (
        <>
            <main className="border border-yellow-700 w-full h-full">
                {selectedPage === "home" && <HomeContent tasks={tasks} 
                                    categories={categories} sortTypes={sortTypes}/>}
                {selectedPage === "aboutme" && <AboutContent />}
                {selectedPage === "projects" && <ProjectsContent />}
                {selectedPage === "modify" && <ModifyContent tasks={tasks} 
                                    categories={categories} 
                                    sortTypes={sortTypes} 
                                    onDeleteTask={onDeleteTask}
                                    onDeleteCateg={onDeleteCateg}/>}
                {selectedPage === "profile" && <ProfileContent />}
            </main>
        </>
    )
}

export default Content