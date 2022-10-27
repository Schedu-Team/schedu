import React, { useEffect, useState } from "react";
import { Form, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Api } from "../../index";
import ToastHelper from "../../components/ToastHelper";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";

interface NewUserMemberOfGroupProps {}

const helper = new ToastHelper();

async function submitForm() {}

function NewUserMemberOfGroup() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<GroupRequest>();

  const [groups, updateGroups] = useState([] as JSX.Element[]);

  // load all groups
  useEffect(() => {
    Api.groupsAllGet().then((res) => {
      const objs = res.data.map((group) => (
        <option value={group.group_id} key={"group_" + group.group_id}>
          {group.name}
        </option>
      ));
      updateGroups(objs);
    });
  }, []);

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
      <h2>Create New Member</h2>
      <FormGroup>
        <FormLabel>User</FormLabel>
        <FormSelect>
          {/*<option disabled selected hidden>Select User</option>*/}
          {users}
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>Group</FormLabel>
        <FormSelect>
          {/*<option disabled selected hidden>Select Group</option>*/}
          {groups}
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

export default NewUserMemberOfGroup;
