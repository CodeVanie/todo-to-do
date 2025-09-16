
export default function StatusButton({ isActive, onClick }) {

    return (
        <button type="button" onClick={onClick}
        className={`py-1 px-2 self-end w-auto text-white font-bold tracking-widest rounded-lg cursor-pointer hover:scale-105 transition-out-200 active:scale-97 
            ${isActive ? "shadow-[1px_1px_5px_#26800a,3px_3px_5px_#26800a] bg-green-500" : 
                                    "shadow-[1px_1px_5px_#430c0a,3px_3px_5px_#430c0a] bg-red-500"}`}>
            {isActive ? "ACTIVE" : "INACTIVE"}
        </button>
    )
}