
export default function NotifActionButton({ onAction, children }) {

    return (
        <button onClick={onAction} className="lg:px-6 lg:py-2 md:text-lg text-sm px-2 py-1 xxs:py-3 sm:py-4 rounded-full bg-ptlbrown-200 border-2 border-ptlbrown-200 hover:border-red-950 leading-3 text-red-950 shadow-xl/30 shadow-black">
            {children}
        </button>
    )
}