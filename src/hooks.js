import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "./context/app-context";

export function useAutosizeTextArea(textAreaRef) {
    if (textAreaRef) {
        textAreaRef.style.height = "auto";
        textAreaRef.style.height = textAreaRef.scrollHeight + "px";
    }
}

export function useControlledList() {
  	const { listData, filteredCategory, selectedSort } = useContext(AppContext);
    const controlledList = useMemo(() => {
        let list = listData[1].list.filter((t,_) => t.status !== "Inactive");

        if (filteredCategory === "c_1") {
          list =  list.filter((t,_) => t.favorite);
        } else if (filteredCategory === "c_2") {
            list =  list.filter((t,_) => t.status === "Completed");
        } else if (filteredCategory !== "c_0") {
            list =  list.filter((t,_) => t.category === 
            listData[0].list.find(c => c.id === filteredCategory).label);
        }

        list = [...list]
        list.sort((a, b) => {

            if (a.status === "Completed" && b.status !== "Completed") return 1;
            if (b.status === "Completed" && a.status !== "Completed") return -1;

            if (selectedSort === "s_0") {
                return b.id.localeCompare(a.id, undefined, { numeric: true });
            } else if (selectedSort === "s_1") {
                return b.priority.length - a.priority.length;
            } else if (selectedSort === "s_2") {
                return a.deadline.dueDate - b.deadline.dueDate;
            } else if (selectedSort === "s_3") {
                return a.label.localeCompare(b.label);
            }

            return 0;
        });

        return list;
    },[listData[1].list, listData[0].list, filteredCategory, selectedSort]);

	return { controlledList, selectedSort, filteredCategory }
}

export function useSelect() {
	const [selectedItems, setSelectedItems] = useState(new Set());
	const [selectedType, setSelectedType] = useState("todo");

    const handleSelectedItems = useCallback((itemid, type) => {
        if (type !== selectedType) {
            setSelectedType(type);
            setSelectedItems(new Set([itemid]));
        } else {
            setSelectedItems(prev => {
            const newSelectedItems = new Set(prev);
            newSelectedItems.has(itemid)
                ? newSelectedItems.delete(itemid)
                : newSelectedItems.add(itemid);
            return newSelectedItems;
            });
        }
    }, [selectedType]);
    
    const unselectAll = useCallback(() => {
        setSelectedItems(new Set());
    }, []);


    const handleSheetSelect = useCallback((sheetType) => {
        if (selectedType !== sheetType) {
            setSelectedItems(new Set());
            setSelectedType(sheetType);
        }
    },[selectedType]);

	return { selectedItems, setSelectedItems, selectedType, 
        setSelectedType, handleSelectedItems, handleSheetSelect, unselectAll }
}

export function useControls() {
    const { listData } = useContext(AppContext);

    const filterList = useMemo(() => {
        let list = [
            {id: "c_0", label: "All", active: true}, 
            {id: "c_1", label: "Favorites", active: true}, 
            {id: "c_2", label: "Completed", active: true}, 
        ...listData[0].list];

        return list.filter((c,_) => c.active);
    },[listData[0].list]);

    const sortList = useMemo(() => {
        let list = [
            {id: "s_0", label: "Newest", active: true},
        ...listData[2].list];

        return list.filter((s,_) => s.active);
    },[listData[2].list]);

    return { filterList, sortList };
}

export function useLocalStorage(key, initVal) {
    const [value, setValue] = useState(() => {
        const storedItem = localStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : initVal;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
}

export default function useNotifSound(path = "/sounds/notif-sound.mp3") {
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/notif-sound.mp3");
        audioRef.current.load();
    }, [])

    function playNotifSound() {
        if (audioRef.current) {
            const sound = audioRef.current.cloneNode();
            sound.play();
        }
    }

    return playNotifSound;
}