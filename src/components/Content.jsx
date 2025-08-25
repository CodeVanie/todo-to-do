import AboutContent from "../pages/AboutContent"
import ModifyContent from "../pages/ModifyContent"
import ProfileContent from "../pages/ProfileContent"
import HomeContent from "../pages/HomeContent"
import ProjectsContent from "../pages/ProjectsContent"
import { createContext } from "react"

export const DataContext = createContext();

function Content({ selectedPage, tasks, categories, sortTypes, setTasks, setCategories, isAddModalOpen, setIsAddModalOpen }) {

    const contextData = { tasks, categories, sortTypes, setTasks, setCategories, isAddModalOpen, setIsAddModalOpen };

    return (
        <main className="flex-grow">
            {selectedPage === "home" && (
                <DataContext.Provider value={contextData}>
                    <HomeContent />
                </DataContext.Provider>
            )}
            {selectedPage === "aboutme" && <AboutContent />}
            {selectedPage === "projects" && <ProjectsContent />}
            {selectedPage === "modify" && (
                <DataContext.Provider value={contextData}>
                    <ModifyContent />
                </DataContext.Provider>
            )}
            {selectedPage === "profile" && <ProfileContent />}
        </main>
    )
}

export default Content