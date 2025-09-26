
import { useLocation } from "react-router-dom"
import { JavaScriptIcon, RctRouterIcon, ReactIcon, TailwindIcon } from "../../shared/icons/IconCollection";
import FeatureBox from "../../shared/components/FeatureBox";

export default function ProjectFolioTile() {
    const { pathname } = useLocation();
    
    return (
        <a href="https://vanie-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className={`project-tiles bg-black/80 bg-blend-multiply bg-smooth-purple bg-cover bg-center font-zendots shadow-[2px_0_8px_#FFB3E3,-2px_0_8px_#FFB3E3] border-purple-400/30 hover:border-ptlpink ${pathname === "/home" ? "max-w-[281px]" : ""}`}>
            <div className="w-full grid place-items-center gap-4 [container-type:size] pt-1">
                <img src="/images/vanieportlogo.png" alt="folioicon" className="w-17"/>
                <h3 className='text-[17px] text-center font-extrabold text-ptlpink text-shadow-sm text-shadow-pink-950'>CodeVANIE's Portfolio</h3>
                <p className="text-pink-300 text-[clamp(0.6rem,2.5cqw+0.3rem,1.8rem)]">
                    An interactive portfolio highlighting my journey, skills, projects, and resume with easy ways to connect.
                </p>
            </div>
            <div className="flex flex-wrap gap-1 pr-4 max-xs:pr-0 text-nowrap text-[10px]">
                <FeatureBox size="sm" variant="folio">
                    <ReactIcon className="w-4 hvr-icon" />
                    React
                </FeatureBox>
                <FeatureBox size="sm" variant="folio">
                    <TailwindIcon className="w-4 hvr-icon" />
                    Tailwind
                </FeatureBox>
                <FeatureBox size="sm" variant="folio">
                    <JavaScriptIcon className="w-4 hvr-icon" />
                    JavaScript
                </FeatureBox>
                <FeatureBox size="sm" variant="folio">
                    <RctRouterIcon className="w-4 hvr-icon" />
                    React Router
                </FeatureBox>
            </div>
        </a>
    )
}