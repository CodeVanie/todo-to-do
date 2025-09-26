
export default function HeaderWrapper({ children, currentPage }) {
    
    return (
        <header className={`sticky top-0 z-20 transition-allout-500 bg-rough-brown bg-cover border-b
            ${/^\/modify/.test(currentPage) ? "text-red-950 border-red-950" : 
            "bg-center bg-black/60 bg-blend-darken text-ptlbrown-100 border-ptlbrown-300"}`}>

            <nav className='h-full max-w-6xl flex mx-auto'>
                {children}
            </nav>
        </header>
    )
}