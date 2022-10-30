import React, { useEffect, useState } from "react";
import ToastHelper from "../../../components/ToastHelper";
import { DelayedAssignment } from "../../../openapi";
import { Api } from "../../../index";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ErrorToast, SuccessToast } from "../../../components/MyToasts";

interface NewDelayedAssignmentProps {}

const helper = new ToastHelper();

async function submitForm(data: DelayedAssignment) {
  await helper.takeoverPromise(Api.delayedAssignmentsAddPost(data));
}

function NewDelayedAssignment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DelayedAssignment>();

  const [assignments, updateAssignments] = useState([] as JSX.Element[]);

  // load all groups
  useEffect(() => {
    Api.assignmentsAllGet().then((res) => {
      const objs = res.data.response.map((assignment) => (
        <option
          value={assignment.assignment_id}
          key={"role_" + assignment.assignment_id}
        >
          {assignment.text.slice(0, Math.min(10, assignment.text.length - 1))}
        </option>
      ));
      updateAssignments(objs);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Delayed Assignment</h2>
      <FormGroup>
        <FormLabel>Deadline</FormLabel>
        <FormControl
          type="datetime-local"
          {...register("publication_date", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Assignment</FormLabel>
        <FormSelect {...register("assignment_id", { required: true })}>
          {assignments}
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"}>
          Submit
        </Button>
      </FormGroup>

      {helper.showSuccess && (
        <SuccessToast body={helper.successContent}></SuccessToast>
      )}
      {helper.showError && <ErrorToast body={helper.errorContent}></ErrorToast>}
    </Form>
  );
}

export default NewDelayedAssignment;
