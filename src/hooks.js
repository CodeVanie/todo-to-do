import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "./context/app-context";

export function useAutosizeTextArea(textAreaRef, value) {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);
}

export function useControlledList() {
  	const { listData, filteredCategory, selectedSort } = useContext(AppContext);
    const controlledList = useMemo(() => {
        let list = listData[1].list.filter((t,_) => t.status !== "Inactive");


        if (filteredCategory === "c_1") {
          return list.filter((t,_) => t.favorite);
        } else if (filteredCategory !== "c_0") {
            return list.filter((t,_) => t.category === 
            listData[0].list.find(c => c.id === filteredCategory).label);
        }

        if (selectedSort === "s_0") {
            return list.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
        } else if (selectedSort === "s_1") {
            return list.sort((a, b) => b.priority.length - a.priority.length);
        } else if (selectedSort === "s_3") {
            return list.sort((a, b) => a.label.localeCompare(b.label));
        }

        return list;
    },[listData[1].list, filteredCategory, selectedSort]);

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
        setSelectedType("");
    }, []);

	return { selectedItems, setSelectedItems, selectedType, 
        setSelectedType, handleSelectedItems, unselectAll }
}

export function useControls() {
    const { listData } = useContext(AppContext);

    const filterList = useMemo(() => {
        let list = [
            {id: "c_0", label: "All", active: true}, 
            {id: "c_1", label: "Favorites", active: true}, 
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