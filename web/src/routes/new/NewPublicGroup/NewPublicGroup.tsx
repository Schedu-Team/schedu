import React, { useEffect, useState } from "react";
import ToastHelper from "../../../components/ToastHelper";
import { PublicGroup } from "../../../openapi";
import { Api } from "../../../index";
import { useForm } from "react-hook-form";
import { Form, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ErrorToast, SuccessToast } from "../../../components/MyToasts";
import tokenHolder from "../../../components/TokenHolder";

interface NewPublicGroupProps {}

const helper = new ToastHelper();

async function submitForm(data: PublicGroup) {
  await helper.takeoverPromise(Api.publicGroupsAddPost(data, tokenHolder.getAuthOptions()));
}

function NewPublicGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublicGroup>();

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

  const [groups, updateGroups] = useState([] as JSX.Element[]);

  // load all groups
  useEffect(() => {
    Api.groupsAllGet().then((res) => {
      const objs = res.data.response.map((group) => (
        <option value={group.group_id} key={"group_" + group.group_id}>
          {group.name}
        </option>
      ));
      updateGroups(objs);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New Public Group</h2>
      <FormGroup>
        <FormLabel>Group</FormLabel>
        <FormSelect {...register("group_id", { required: true })}>{groups}</FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>Role</FormLabel>
        <FormSelect {...register("default_role_id", { required: true })}>{roles}</FormSelect>
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

export default NewPublicGroup;
