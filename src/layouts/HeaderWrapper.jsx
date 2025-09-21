
export default function HeaderWrapper({ children, currentPage }) {
    
    return (
        <header className={`sticky top-0 z-20 min-h-14 transition-allout-500 bg-rough-brown bg-cover border-b
            ${/^\/modify/.test(currentPage) ? "text-red-950" : 
            "bg-center bg-black/40 bg-blend-multiply text-ptlbrown-100"}`}>

            <nav className='h-full max-w-6xl flex mx-auto'>
                {children}
            </nav>
        </header>
    )
}