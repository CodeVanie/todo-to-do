
import ProjectsContentWrapper from "../../layouts/ProjectsContentWrapper"
import ProjectsWrapper from "../../layouts/ProjectsWrapper"
import ProjectsTilesSoon from "./ProjectsTilesSoon"
import ProjectTodoTile from "./ProjectTodoTile"

export default function ProjectsContent() {
    
    return (
        <ProjectsContentWrapper>
            <article className="p-10 space-y-10 bg-yellow-950/50 rounded-2xl">
                <h1 className="text-[clamp(2rem,2vw+1rem,7vw)] text-ptlbrown-100 text-shadow-lg text-shadow-ptlbrown-100/50 text-center">CodeVANIE's Projects</h1>
                <ProjectsWrapper>
                    <ProjectTodoTile />
                    <ProjectsTilesSoon classDelay="[animation-delay:0.1s]" />
                    <ProjectsTilesSoon classDelay="[animation-delay:0.3s]" />
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