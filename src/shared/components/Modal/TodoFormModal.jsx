import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import { AppContext } from "../../../context/app-context.jsx";
import { FormWrapper, Title, Priority, Category, Details, Deadline, Time, DeadlineHeader, DeadlinePicker, Statement } from '../Form/form.js'
import { SubmitButton, EraseButton } from '../Button/buttons.js'
import ModalBackground from "./ModalBackground.jsx";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper.jsx";
import { getDateToday, getDefaultDueDate, toLocaleDate } from "../../../utils.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TodoFormModal() {
	const { pathname } = useLocation();
	const { action, todoid } = useParams();
    const navigate = useNavigate();
    const { listData, setTodos } = useContext(AppContext);
	const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [formType, setFormType] = useState(action);
	const editTodoData = action === "edit" ? listData[1].list.find(t => t.id === todoid) : null;

    const defaultFormValues = {
        id: "",
        label: "",
        priority: "!",
        category: "",
        details: "",
        deadline: {
          type: "timeonly",
		  dueDate: getDefaultDueDate(),
          datenums: [],
		  time: "23:59"
        },
        favorite: false,
		completed: false
    };
    const {
      register,
      control,
      watch,
      handleSubmit,
      setValue,
      getValues,
      setError,
      reset,
      formState: { errors, isSubmitting, isValid },
    } = useForm({
      defaultValues: { ...defaultFormValues },
      mode: "onChange",
    });
    const deadlineStatement = useMemo(() => {
		if (getValues("deadline.type") !== "month") {
			return `Complete Before: [ ${toLocaleDate(getValues("deadline.dueDate"))} ]`;
		} else {
			let warnNoDate = `\n (If that date doesn’t exist in a month, your deadline will move to the last day of that month.)`; 
			return `Complete Before: [ ${toLocaleDate(getValues("deadline.dueDate"))} ] ${getValues("deadline.dueDate").getDate() > 28 ? warnNoDate : ""}`
		}
    },[watch("deadline")])

    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setFormType(action);
            action === "add" ? setValue("id", `t_${listData[1].list.length}`) : reset(editTodoData);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen, action]);

async function onSave(data) {
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		action === "add" ? 
			setTodos((prev) => [...prev, data]) : 
			setTodos((prev) => 
				prev.map((todo) => 
					(todo.id === data.id ? data : todo)));

		handleClose();
		reset();
	} catch (error) {
		setError("root", { message: "Error submitting form." });
		console.error("Error submitting form:", error);
	}
}
function handleClose() {
    setIsOpen(false);
}
function onAnimationEnd() {
    if (!isOpen) {
        setIsShowing(false);
        navigate(`/${pathname.split("/")[1]}`);
    }
}

    return isShowing ? createPortal(
		<ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
			<TodoFormModalWrapper isOpen={isOpen} onClose={handleClose} 
				title={formType === "add" ? "Add Todo" : "Edit Todo"} >
				<p className="text-xs text-center">{getDateToday()}</p>
				<EraseButton onErase={() => reset()} />
				<FormWrapper onSubmit={handleSubmit(onSave)}>
					<Title register={register} />
					<div className="flex max-sm:flex-col max-sm:gap-y-3 sm:gap-x-3 sm:justify-around">
						<Controller name="priority" control={control} render={({ field }) => (
						<Priority value={field.value} onChange={field.onChange} />)}/>
						<Controller name="category" control={control} render={({ field }) => (
						<Category value={field.value} onChange={field.onChange} />)}/>
					</div>
					<Details register={register} errors={errors} />
					<Controller name="deadline" control={control}
						rules={{
						validate: (value) => {
							if (!value.time) {
							return "Time is required.";
							}
							if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value.time)) {
							return "Invalid time format. Please use HH:MM.";
							}
							return true;
						},
						}}
						render={({ field, fieldState }) => (
						<Deadline>
							<DeadlineHeader>
							<Time
								value={field.value}
								onChange={field.onChange}
								error={fieldState.error?.message}/>
							</DeadlineHeader>
							<DeadlinePicker value={field.value} onChange={field.onChange}/>
							<Statement errors={errors} statement={deadlineStatement} />
						</Deadline>
						)}
					/>
					<SubmitButton
						isSubmitting={isSubmitting}
						isValid={isValid}
					/>
				</FormWrapper>
			</TodoFormModalWrapper>
		</ModalBackground>,
      	document.body
    ) : null;
};