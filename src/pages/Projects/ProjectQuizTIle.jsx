import { useLocation } from "react-router-dom"
import { ExpressJSIcon, MongoDBIcon, NodeJSIcon, QuizMaTaIcon, RctFormIcon, RctRouterIcon, ReactIcon, TailwindIcon, TypeScriptIcon } from "../../shared/icons/IconCollection";
import zodicon from "../../assets/images/zodicon.png"
import FeatureBox from "../../shared/components/FeatureBox";

export default function ProjectQuizTile({ classDelay }) {
    const { pathname } = useLocation();
    
    return (
        <a href="https://quizmata.onrender.com" target="_blank" rel="noopener noreferrer" className={`project-tiles bg-[#1f184a] font-monst-alter shadow-[2px_0_8px_#a6b1ff,-2px_0_8px_#a6b1ff] border-[#0b002e] hover:border-[#a6b1ff] ${classDelay} ${pathname === "/home" ? "max-w-[281px]" : ""}`}>
            <div className="w-full grid place-items-center [container-type:size]">
                <QuizMaTaIcon className="size-19"/>
                <h3 className='text-[28px] font-extrabold text-[#a6b1ff] text-shadow-sm text-shadow-[#0b002e] mb-3'>QuizMaTa</h3>
                <p className="text-[#a6b1ff] leading-tight text-[clamp(0.6rem,2.5cqw+0.35rem,1.8rem)]">
                    An interactive quiz platform where users can create and take quizzes — perfect for learning, teaching, or just having fun.
                </p>
            </div>
            <div className="flex flex-wrap gap-1 text-nowrap text-[11px] pr-4 max-xs:pr-0">
                <FeatureBox size="sm" variant="quiz">
                    <TailwindIcon className="w-4 hvr-icon" />
                    Tailwind
                </FeatureBox>
                <FeatureBox size="sm" variant="quiz">
                    <TypeScriptIcon className="w-4 hvr-icon" />
                    TypeScript
                </FeatureBox>
                <FeatureBox size="sm" variant="quiz">
                    <RctRouterIcon className="w-4 hvr-icon" />
                    React Router
                </FeatureBox>
                <FeatureBox size="sm" variant="quiz">
                    <RctFormIcon className="w-4 hvr-icon" />
                    React Hook Form
                </FeatureBox>
                <FeatureBox size="sm" variant="quiz">
                    <img src={zodicon} alt="zodicon" className='w-4 hvr-icon' />
                    Zod
                </FeatureBox>
                <FeatureBox size="sm" variant="quiz">
                    <MongoDBIcon className="w-4 hvr-icon" />
                    <ExpressJSIcon className="w-4 hvr-icon" />
                    <ReactIcon className="w-4 hvr-icon" />
                    <NodeJSIcon className="w-4 hvr-icon" />
                    M.E.R.N Stack
                </FeatureBox>
            </div>
        </a>
    )
}