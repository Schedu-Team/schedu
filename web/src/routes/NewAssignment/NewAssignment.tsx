import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import ToastHelper from "../../components/ToastHelper";
import { AssignmentRequest } from "../../openapi";
import { Api } from "../../index";

interface NewAssignmentProps {}

const helper = new ToastHelper();

async function submitForm(data: AssignmentRequest) {
  await helper.takeoverPromise(Api.assignmentsAddPost(data));
}

function NewAssignment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentRequest>();

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Assignment</h2>
      <FormGroup>
        <FormLabel>Deadline</FormLabel>
        <FormControl
          type="datetime-local"
          {...register("deadline", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Text</FormLabel>
        <Form.Control as="textarea" {...register("text", { required: true })} />
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"}>
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
}

export default NewAssignment;
