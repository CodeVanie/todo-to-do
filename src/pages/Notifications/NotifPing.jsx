
export default function NotifPing({isClicked }) {

    return (
        <span className={`absolute flex size-3 right-4 top-4 ${isClicked && "hidden"}`}>
            <span className={`absolute h-full w-full animate-ping rounded-4xl bg-red-400 opacity-75`}></span>
            <span className="relative size-3 rounded-full bg-red-500"></span>
        </span>
    )
}