import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ToastHelper from "../../components/ToastHelper";
import { PermissionRequest } from "../../openapi";
import { Api } from "../../index";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";

interface NewPermissionProps {}

const helper = new ToastHelper();

async function submitForm(data: PermissionRequest) {
  await helper.takeoverPromise(Api.permissionsAddPost(data));
}

function NewPermission() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionRequest>();

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Permission</h2>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl type="text" {...register("name", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Description</FormLabel>
        <Form.Control
          as="textarea"
          {...register("description", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Type</FormLabel>
        <FormControl type="number" {...register("type", { required: true })} />
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

export default NewPermission;
