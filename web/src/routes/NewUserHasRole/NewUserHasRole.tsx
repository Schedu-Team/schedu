import styles from './NewUserHasRole.module.scss';
import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Api } from "../../index";
import ToastHelper from "../../components/ToastHelper";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";

interface NewUserHasRoleProps {}

const helper = new ToastHelper();

async function submitForm() {}

function NewUserHasRole() {
  const [roles, updateRoles] = useState([] as JSX.Element[]);

  /*
  useEffect(() => {
    Api.rolesAllGet().then((res) => {
      const objs = res.data.map((role) => (
        <option value={role.role_id} key={"role_" + role.role_id}>
          {role.name}
        </option>
      ));
      updateRoles(objs);
    });
  }, []);
  */
  const [users, updateUsers] = useState([] as JSX.Element[]);
  useEffect(() => {
    Api.usersAllGet().then((res) => {
      const objs = res.data.map((user) => (
        <option value={user.user_id} key={"user_" + user.user_id}>
          {user.first_name + " " + user.last_name}
        </option>
      ));
      updateUsers(objs);
    });
  }, []);

  return (
    <Form>
      <h2>Create New User Has Role Relation</h2>
      <FormGroup>
        <FormLabel>User</FormLabel>
        <FormSelect>
          {/*<option disabled selected hidden>Select User</option>*/}
          {users}
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>Role</FormLabel>
        <FormSelect>
          {/*<option disabled selected hidden>Select Group</option>*/}
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

export default NewUserHasRole;
