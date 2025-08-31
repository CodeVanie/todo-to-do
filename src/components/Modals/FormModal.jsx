import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DataContext } from "../../App";
import CloseButton from "../Buttons/CloseButton";
import Title from "../Form/Title";
import Priority from "../Form/Priority";
import Category from "../Form/Category";
import Details from "../Form/Details";
import Deadline from "../Form/Deadline";
import SubmitButton from "../Buttons/SubmitButton";
import DeadlineHeader from "../Form/DeadlineHeader";
import Time from "../Form/Time";
import { useForm, Controller } from "react-hook-form";
import ModalBackground from "./ModalBackground";
import FormModalWrapper from "./FormModalWrapper";
import FormTitle from "../Form/FormTitle";
import Form from "../Form/Form";
import Statement from "../Form/Statement";
import DeadlinePicker from "../Form/DeadlinePicker";

export const FormContext = createContext();
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
};

function FormModal({ type = "add", isOpen = false, onClose }) {
    const { tasks, setTasks } = useContext(DataContext);
    const [deadlineStatement, setDeadlineStatement] = useState("This task should be completed before the end of the day");
    const { register, control, watch, handleSubmit,
            setValue, getValues, setError, reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        defaultValues: { ...defaultFormValues },
        mode: "onChange"
    });
    
    async function onSubmit(data) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
            setTasks(prev => [...prev, data]);
            onClose();
            reset();
        } catch (error) {
            setError("root", {message: "Error submitting form."});
            console.error("Error submitting form:", error);
        }
    }

    useEffect(() => {
        if (getValues("deadline.type")) {
            if (getValues("deadline.type") === "timeonly") {
                setDeadlineStatement(
                    `Complete Before: [ Time: ${getValues("deadline.time")} ] [ Day: Today ]`)
            } else if (getValues("deadline.type") === "day") {
                setDeadlineStatement(
                    `Complete Before: [ Time: ${getValues("deadline.time")} ] [ ${getValues("deadline.label")} ]`
                )
            } else if (getValues("deadline.type") === "month") {
                let warnNoDate = `\n (If that date doesn’t exist in a month, 
                your deadline will move to the last day of that month.)`
                setDeadlineStatement(
                    `Complete Before: [ Time: ${getValues("deadline.time")} ] [ ${getValues("deadline.label")} ] ${getValues("deadline.due")[0] > 28 ? warnNoDate : ""}` 
                )
            }
        }
    }, [watch("deadline")])

    useEffect(() => {
        isOpen
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

  return createPortal(
    <>{!isOpen ? null : (
        <ModalBackground>
            <FormModalWrapper>
                <CloseButton onClose={onClose} />
                <FormTitle>Add Task</FormTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Title register={register} />
                    <Controller name="priority" control={control} render={({ field }) => (
                        <Priority value={field.value} onChange={field.onChange} />)}/>
                    <Controller name="category" control={control} render={({ field }) => (
                        <Category value={field.value} onChange={field.onChange} />)}/>
                    <Details register={register} errors={errors} />
                    <Controller name="deadline" control={control} rules={
                    {
                        validate: (value) => {
                            if (!value.time) {
                                return "Time is required.";
                            }
                            if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value.time)) {
                                return "Invalid time format. Please use HH:MM.";
                            }
                            return true;
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <Deadline>
                            <DeadlineHeader>
                                <Time 
                                    value={field.value.time} 
                                    onChange={(time) => field.onChange({ ...field.value, time })} 
                                    error={fieldState.error?.message} />
                            </DeadlineHeader>
                            <DeadlinePicker value={field.value} onChange={field.onChange} />
                        </Deadline>
                    )}/>
                    <Statement errors={errors} statement={deadlineStatement}/>
                    <SubmitButton 
                        isSubmitting={isSubmitting} 
                        isValid={isValid} 
                        onSave={() => setValue("id", `t_${tasks.length}`)} />
                </Form>
            </FormModalWrapper>
        </ModalBackground>
      )}
    </>,
    document.body
  );
}

export default FormModal;
