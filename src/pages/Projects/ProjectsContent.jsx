
import ProjectsContentWrapper from "../../layouts/ProjectsContentWrapper"
import ProjectsWrapper from "../../layouts/ProjectsWrapper"
import ProjectFolioTile from "./ProjectFolioTile"
import ProjectsTilesSoon from "./ProjectsTilesSoon"
import ProjectTodoTile from "./ProjectTodoTile"
import ProjectQuizTile from "./ProjectQuizTIle"

export default function ProjectsContent() {
    
    return (
        <ProjectsContentWrapper>
            <article className="p-10 space-y-10 bg-maroon/75 rounded-2xl">
                <h1 className="text-[clamp(2rem,2vw+1rem,7vw)] font-semibold text-ptlbrown-100 text-shadow-lg text-shadow-ptlbrown-100/50 text-center animate-titleentry"><span className="underline-from-left">CodeVANIE's Projects</span></h1>
                <ProjectsWrapper>
                    <ProjectFolioTile />
                    <ProjectTodoTile classDelay="[animation-delay:0.1s]" />
                    <ProjectQuizTile classDelay="[animation-delay:0.3s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:0.5s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:0.7s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:0.9s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:1.1s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:1.3s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:1.5s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:1.7s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:1.9s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:2.1s]" />
                </ProjectsWrapper>
            </article>
        </ProjectsContentWrapper>
    )
}