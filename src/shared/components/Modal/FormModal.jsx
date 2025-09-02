import { createContext, useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import { AppContext } from "../../../context/app-context.jsx";
import { FormTitle, Form, Title, Priority, Category, Details, Deadline, Time, DeadlineHeader, DeadlinePicker, Statement } from '../Form/form.js'
import { CloseButton, SubmitButton } from '../Button/buttons.js'
import ModalBackground from "./ModalBackground";
import FormModalWrapper from "../../../layouts/FormModalWrapper.jsx";

export const FormContext = createContext();

function FormModal({ type, isOpen, onClose, modifyValues }) {
  const { tasks, setTasks } = useContext(AppContext);
  const [isShowing, setIsShowing] = useState(isOpen);
  const [deadlineStatement, setDeadlineStatement] = useState("");
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

  async function onSubmit(data) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      
      type === "add" ? 
        setTasks((prev) => [...prev, data]) : 
        setTasks((prev) => 
            prev.map((task) => 
                (task.id === data.id ? data : task)));

      onClose();
      reset();
    } catch (error) {
      setError("root", { message: "Error submitting form." });
      console.error("Error submitting form:", error);
    }
  }

  useEffect(() => {
    if (getValues("deadline.type")) {
      if (getValues("deadline.type") === "timeonly") {
        setDeadlineStatement(
          `Complete Before: [ Time: ${getValues(
            "deadline.time"
          )} ] [ Day: Today ]`
        );
      } else if (getValues("deadline.type") === "day") {
        setDeadlineStatement(
          `Complete Before: [ Time: ${getValues(
            "deadline.time"
          )} ] [ ${getValues("deadline.label")} ]`
        );
      } else if (getValues("deadline.type") === "month") {
        let warnNoDate = `\n (If that date doesn’t exist in a month, 
                your deadline will move to the last day of that month.)`;
        setDeadlineStatement(
          `Complete Before: [ Time: ${getValues(
            "deadline.time"
          )} ] [ ${getValues("deadline.label")} ] ${
            getValues("deadline.due")[0] > 28 ? warnNoDate : ""
          }`
        );
      }
    }
  }, [watch("deadline")]);

  useEffect(() => {
    if (isOpen) {
      setIsShowing(true);
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  useEffect(() => {
    if (type === "edit" && modifyValues) {
        console.log("in: ", modifyValues);
        reset(modifyValues);
    } else {
        reset(defaultFormValues);
    }
  }, [type, modifyValues, reset]);

function onAnimationEnd() {
  if (!isOpen) setIsShowing(false);
};

  return isShowing ? createPortal(
        <ModalBackground isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
          <FormModalWrapper isOpen={isOpen} onAnimationEnd={onAnimationEnd}>
            <CloseButton onClose={onClose} />
            <FormTitle>{type === "add" ? "Add Task" : "Edit Task"}</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title register={register} />
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Priority value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Category value={field.value} onChange={field.onChange} />
                )}
              />
              <Details register={register} errors={errors} />
              <Controller
                name="deadline"
                control={control}
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
                        onChange={(time) =>
                          field.onChange({ ...field.value, time })
                        }
                        error={fieldState.error?.message}
                      />
                    </DeadlineHeader>
                    <DeadlinePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Deadline>
                )}
              />
              <Statement errors={errors} statement={deadlineStatement} />
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                onSave={() => {
                    (type === "add") && setValue("id", `t_${tasks.length}`);
                }}
              />
            </Form>
          </FormModalWrapper>
        </ModalBackground>,
    document.body
  ) : null;
}

export default FormModal;
