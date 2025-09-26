import { useLocation } from "react-router-dom"
import todoicon from "../../assets/images/todotodologo.png"
import { JavaScriptIcon, RctFormIcon, RctRouterIcon, ReactIcon, TailwindIcon } from "../../shared/icons/IconCollection";
import FeatureBox from "../../shared/components/FeatureBox";

export default function ProjectTodoTile({ classDelay }) {
    const { pathname } = useLocation();
    
    return (
        <a href="/" className={`project-tiles bg-black/70 bg-blend-multiply bg-rough-brown bg-cover font-quicks shadow-[2px_0_8px_#e7b574,-2px_0_8px_#e7b574] border-ptlbrown-300/30 hover:border-ptlbrown-100 ${classDelay} ${pathname === "/home" ? "max-w-[281px]" : ""}`}>
            <div className="w-full grid place-items-center gap-3 [container-type:size]">
                <img src={todoicon} alt="todoicon" className="w-17"/>
                <h3 className='text-3xl font-extrabold text-ptlbrown-100 text-shadow-sm text-shadow-yellow-950'>TODO-To-Do</h3>
                <p className="text-ptlbrown-100 leading-tight text-[clamp(0.8rem,2.4cqw+0.5rem,1.8rem)]">
                    A smart and simple task management app designed to help you stay on top of both one-time and recurring tasks.
                </p>
            </div>
            <div className="flex flex-wrap gap-1 text-nowrap text-xs pr-4 max-xs:pr-0">
                <FeatureBox size="sm" variant="todo">
                    <ReactIcon className="w-4 hvr-icon" />
                    React
                </FeatureBox>
                <FeatureBox size="sm" variant="todo">
                    <TailwindIcon className="w-4 hvr-icon" />
                    Tailwind
                </FeatureBox>
                <FeatureBox size="sm" variant="todo">
                    <JavaScriptIcon className="w-4 hvr-icon" />
                    JavaScript
                </FeatureBox>
                <FeatureBox size="sm" variant="todo">
                    <RctRouterIcon className="w-4 hvr-icon" />
                    React Router
                </FeatureBox>
                <FeatureBox size="sm" variant="todo">
                    <RctFormIcon className="w-4 hvr-icon" />
                    React Hook Form
                </FeatureBox>
            </div>
        </a>
    )
}