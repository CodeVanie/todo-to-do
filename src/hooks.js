import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "./context/app-context";

export function useAutosizeTextArea(textAreaRef, value) {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);
}

export function useFormModalControl() {
	const { setFormModal } = useContext(AppContext);

function openAddModal() {
	setFormModal({action: "add", data: null, status: true });
}
function openEditModal(item) {
	setFormModal({action: "edit", data: item, status: true });
}
function closeModal() {
	setFormModal({action: null, data: null, status: false });
}
	return { openAddModal, openEditModal, closeModal }
}

export default function useControlledList() {
  	const { tasks, filteredCategory, selectedSort } = useContext(AppContext);
    const controlledList = useMemo(() => {
        let list = [...tasks];

        if (filteredCategory !== "All") {
            return tasks.filter((t,_) => t.category === filteredCategory)
        }

        if (selectedSort === "Priority") {
            return [...tasks].sort((a, b) => b.priority.length - a.priority.length);
        } else if (selectedSort === "Letters") {
            return [...tasks].sort((a, b) => a.label.localeCompare(b.label));
        }

        return list;
    },[tasks, filteredCategory, selectedSort]);

	return { controlledList, selectedSort, filteredCategory }
}