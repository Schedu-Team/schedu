import React, {useEffect, useState} from "react";
import {Form, FormControl, FormGroup, FormLabel, FormSelect} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Api } from "../../index";
import { useForm } from "react-hook-form";
import {GroupRequest, TemporaryRole} from "../../openapi";
import ToastHelper from "../../components/ToastHelper";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";

interface NewTemporaryRoleProps {}

const helper = new ToastHelper();

async function submitForm(data: TemporaryRole) {
  await helper.takeoverPromise(Api.temporaryRolesAddPost(data));
}

function NewTemporaryRole() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemporaryRole>();


  const [roles, updateRoles] = useState([] as JSX.Element[]);

  // load all groups
  useEffect(() => {
    Api.rolesAllGet().then((res) => {
      const objs = res.data.response.map((role) => (
        <option value={role.role_id} key={"role_" + role.role_id}>
          {role.name}
        </option>
      ));
      updateRoles(objs);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Temporary Role</h2>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl type="datetime-local" {...register("expiry_date", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Role id</FormLabel>
        <FormSelect {...register("role_id", { required: true })}>
          {roles}
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

export default NewTemporaryRole;
