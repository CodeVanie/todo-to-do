import { PortfolioIcon } from "../../shared/icons/IconCollection"

export default function Portfolio() {
    return (
        <a href="/" className='basis-2/14 sm:basis-1/5 flex justify-end gap-x-3 items-center pr-2 lg:hover:scale-110 transition-out-200 z-1'>
            <h1 className="max-lg:hidden leading-4 text-lg text-end font-bold whitespace-pre-line pt-1">
                {`CodeVANIE's\nPortfolio`}
            </h1>
            <PortfolioIcon className={`w-6 xs:scale-115 max-lg:active:scale-150 transition-out-200`}/>
        </a>
    )
}