import { portfolio, portfoliod } from "../../assets/images/logos"

function BackToPortfolio({ currentPage }) {
    return (
        <a href="/" className='flex grow max-sm:basis-1/10 basis-1/5 justify-end items-center'>
            <span className="max-md:hidden">←</span>
            <div className="relative w-7 h-7 max-md:w-6 max-md:h-6 hover:w-8 hover:h-8">
                <img src={portfoliod} alt={portfoliod} 
                className={`absolute object-contain transition duration-300 ease-in-out 
                ${currentPage === "/modify" ? "opacity-[1]" : "opacity-[0]"}`}/>
                <img src={portfolio} alt={portfolio} 
                className={`absolute object-contain transition duration-300 ease-in-out 
                ${currentPage === "/modify" ? "opacity-[0]" : "opacity-[1]"}`}/>
            </div>
        </a>
    )
}

export default BackToPortfolio