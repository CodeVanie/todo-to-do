import HeartIcon from "../../icons/IconCollection";

export default function FavoriteButton({ todo, onClick }) {
    return (
        <button onClick={onClick} 
            className={`absolute right-3 top-3  hover:scale-110 active:scale-110 transition-out-200 cursor-pointer 
            ${todo.favorite ? "text-ptlbrown-100" : 
                              "text-ptlbrown-100/0"}`}>
            <HeartIcon />
        </button>
    )
}