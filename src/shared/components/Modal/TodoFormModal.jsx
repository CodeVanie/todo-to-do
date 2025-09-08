import { useContext, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import { AppContext } from "../../../context/app-context.jsx";
import { FormWrapper, Title, Priority, Category, Details, Deadline, Time, DeadlineHeader, DeadlinePicker, Statement } from '../Form/form.js'
import { SubmitButton, EraseButton } from '../Button/buttons.js'
import ModalBackground from "./ModalBackground.jsx";
import TodoFormModalWrapper from "../../../layouts/TodoFormModalWrapper.jsx";

export default function TodoFormModal({ action = "add", isOpen, onClose, modifyValues }) {
    // console.log("TodoFormModal Rendered");
    const { todos, setTodos } = useContext(AppContext);
    const [isShowing, setIsShowing] = useState(isOpen);
    const [formType, setFormType] = useState(action)
    const defaultFormValues = {
        id: "",
        label: "",
        priority: "!",
        category: "",
        details: "",
        deadline: {
          type: "timeonly",
          label: "",
          due: [],
          time: "00:00",
        },
        favorite: false,
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
        if (getValues("deadline.type")) {
            if (getValues("deadline.type") === "timeonly") {
                return `Complete Before: [ Time: ${getValues("deadline.time")} ] [ Day: Today ]`
            } else if (getValues("deadline.type") === "day") {
                return `Complete Before: [ Time: ${getValues("deadline.time")} ] [ ${getValues("deadline.label")} ]`
            } else if (getValues("deadline.type") === "month") {
                let warnNoDate = `\n (If that date doesn’t exist in a month, your deadline will move to the last day of that month.)`;
                return `Complete Before: [ Time: ${getValues("deadline.time")} ] [ ${getValues("deadline.label")} ] ${getValues("deadline.due")[0] > 28 ? warnNoDate : ""}`
            }
        }
    },[watch("deadline")])

    useEffect(() => {
        if (isOpen) {
            setIsShowing(true);
            setFormType(action);
            action === "add" ? setValue("id", `t_${todos.length}`) : reset(modifyValues);
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

		onClose();
		reset();
	} catch (error) {
		setError("root", { message: "Error submitting form." });
		console.error("Error submitting form:", error);
	}
}

function onAnimationEnd() {
	if (!isOpen) setIsShowing(false);
};

    return isShowing ? createPortal(
		<ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
			<TodoFormModalWrapper isOpen={isOpen} onClose={onClose} 
				title={formType === "add" ? "Add Todo" : "Edit Todo"} >
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
								value={field.value.time}
								onChange={(time) => field.onChange({ ...field.value, time })}
								error={fieldState.error?.message}/>
							</DeadlineHeader>
							<DeadlinePicker value={field.value} onChange={field.onChange}/>
						</Deadline>
						)}
					/>
					<Statement errors={errors} statement={deadlineStatement} />
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