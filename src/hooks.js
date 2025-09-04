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
	const { setTodoFormModal } = useContext(AppContext);

function openAddTodoModal() {
	setTodoFormModal({ type: "add", data: null, status: true });
}
function openEditTodoModal(todo) {
	setTodoFormModal({ type: "edit", data: todo, status: true });
}
function closeTodoModal() {
	setTodoFormModal({ type: null, data: null, status: false });
}
	return {openAddTodoModal, openEditTodoModal, closeTodoModal}
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