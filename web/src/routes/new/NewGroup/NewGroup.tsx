import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Api } from "../../../index";
import { useForm } from "react-hook-form";
import { GroupRequest } from "../../../openapi";
import ToastHelper from "../../../components/ToastHelper";
import { ErrorToast, SuccessToast } from "../../../components/MyToasts";

interface NewGroupProps {}

const helper = new ToastHelper();

async function submitForm(groupRequest: GroupRequest) {
  await helper.takeoverPromise(Api.groupsAddPost(groupRequest));
}

function NewGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupRequest>();
  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Group</h2>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl type="text" {...register("name", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Description</FormLabel>
        <Form.Control as="textarea" id="description" {...register("description")} />
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"}>
          Submit
        </Button>
      </FormGroup>

      {helper.showSuccess && <SuccessToast body={helper.successContent}></SuccessToast>}
      {helper.showError && <ErrorToast body={helper.errorContent}></ErrorToast>}
    </Form>
  );
}

export default NewGroup;
