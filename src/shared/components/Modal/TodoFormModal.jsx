import { memo, useContext, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import { AppContext } from "../../../context/app-context.jsx";
import { FormWrapper, Title, Priority, Category, Details, Deadline, Time, DeadlineHeader, DeadlinePicker, Statement } from '../Form/form.js'
import { SubmitButton, EraseButton, StatusButton } from '../Button/buttons.js'
import ModalBackground from "./ModalBackground.jsx";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper.jsx";
import { getDateTodayString, getDefaultDueDate, toLocaleDate } from "../../../utils.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
	status: "Pending"
};

const TodoFormModal = memo(function TodoFormModal() {
	const { pathname } = useLocation();
	const { action, todoid } = useParams();
    const navigate = useNavigate();
    const { listData, setTodos } = useContext(AppContext);
	const [isOpen, setIsOpen] = useState(true);
    const [isShowing, setIsShowing] = useState(isOpen);
	const editTodoData = action === "edit" ? listData[1].list.find(t => t.id === todoid) : null;

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
    },[watch("deadline")]);

    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            action === "add" ? setValue("id", `t_${listData[1].list.length}`) : reset(editTodoData);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

	async function onSave(data) {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			action === "add" ? 
				setTodos((prev) => [...prev, data]) : 
				setTodos((prev) => 
					prev.map((todo) => 
						(todo.id === data.id ? data : todo)));
			
			setIsOpen(false);
			reset();
		} catch (error) {
			setError("root", { message: "Error submitting form." });
			console.error("Error submitting form:", error);
		}
	}

	function onAnimationEnd() {
		if (!isOpen) {
			setIsShowing(false);
			navigate(`/${pathname.split("/")[1]}`);
		}
	}

    return isShowing ? createPortal(
		<ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
			<TodoFormModalWrapper isOpen={isOpen} onClose={() => setIsOpen(false)} 
				title={action === "add" ? "Add Todo" : "Edit Todo"} >
				<p className="text-xs text-center font-bold">
					<span>Today: </span>{getDateTodayString()}
				</p>
				<EraseButton onErase={() => reset()} />
				<FormWrapper onSubmit={handleSubmit(onSave)}>
					<div className="absolute top-0 right-0">
						<StatusButton isActive={getValues("status") !== "Inactive"} onClick={() => setValue("status", `${action === "edit" ? getValues("status") !== "Inactive" ? "Inactive" : editTodoData.status === "Inactive" ? "Pending" : editTodoData.status : "Pending" }`, { shouldDirty: true, shouldValidate: true, shouldTouch: true })} />
					</div>
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
							return "Time format is invalid. Please use HH:MM.";
							}
							if (value.datenums.length === 7) {
								return "You can use the time field for daily tasks.";
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
								error={fieldState.error?.message.split(" ")[0] === "Time"}/>
							</DeadlineHeader>
							<DeadlinePicker value={field.value} onChange={field.onChange} setError={setError}/>
							<Statement errors={errors} statement={deadlineStatement} />
						</Deadline>
						)}
					/>
					<SubmitButton isSubmitting={isSubmitting} isValid={isValid} />
				</FormWrapper>
			</TodoFormModalWrapper>
		</ModalBackground>,
      	document.body
    ) : null;
});

export default TodoFormModal