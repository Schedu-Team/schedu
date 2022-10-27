import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { UserRequest } from "../../openapi";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";
import ToastHelper from "../../components/ToastHelper";
import { Api } from "../../index";

interface NewUserProps {}

const helper = new ToastHelper();

async function submitForm(userRequestForm: UserRequestForm) {
  const password_hash = "dummy-hash"; // TODO: password hashing on the server side
  const password_salt = "dummy-salt";
  const graduation_year = Number(
    userRequestForm.graduation_month.split("-")[0]
  );
  const userRequest: UserRequest = {
    email: userRequestForm.email,
    first_name: userRequestForm.fname,
    graduation_year: graduation_year,
    last_name: userRequestForm.lname,
    password_hash: password_hash,
    password_salt: password_salt,
  };
  await helper.takeoverPromise(Api.usersAddPost(userRequest));
}

interface UserRequestForm {
  fname: string;
  lname: string;
  password: string;
  email: string;
  graduation_month: string;
}

function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequestForm>();

  return (
    <Form onSubmit={handleSubmit((data) => submitForm(data))}>
      <h2>Create New User</h2>
      <FormGroup>
        <FormLabel>First name</FormLabel>
        <FormControl type="text" {...register("fname", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Last name</FormLabel>
        <FormControl type="text" {...register("lname", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormControl type="email" {...register("email", { required: true })} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          {...register("password", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Graduation month</FormLabel>
        <FormControl
          type="month"
          {...register("graduation_month", { required: true })}
        />
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

export default NewUser;
