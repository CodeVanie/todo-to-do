import { HeartIcon } from "../../icons/IconCollection";

export default function FavoriteButton({ todo, onClick }) {
    
    return (
        <button onClick={onClick} 
            className={`absolute right-3 top-3 intrct-btn-2 transition-out-200 
            ${todo.favorite ? "text-ptlbrown-100" : 
                              "text-transparent"}`}>
            <HeartIcon stroke="#e7b574"/>
        </button>
    )
}