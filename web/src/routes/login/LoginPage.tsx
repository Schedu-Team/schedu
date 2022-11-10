import React from "react";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../openapi";
import { Api } from "../../index";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { ErrorToast, SuccessToast } from "../../components/MyToasts";
import ToastHelper from "../../components/ToastHelper";
import tokenHolder from "../../components/TokenHolder";

const helper = new ToastHelper();

async function submitForm(data: LoginRequest) {
  const res = await helper.takeoverPromise(Api.userLoginPost(data));
  tokenHolder.setToken(res?.Token);
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  return (
    <>
      <Form onSubmit={handleSubmit((data) => submitForm(data))}>
        <h2>Login</h2>
        <FormGroup>
          <FormLabel>Login</FormLabel>
          <FormControl type={"login"} {...register("login", { required: true })}></FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl type={"password"} {...register("password", { required: true })}></FormControl>
        </FormGroup>
        <FormGroup>
          <Button type="submit" className={"mt-3"}>
            Submit
          </Button>
        </FormGroup>

        {helper.showSuccess && <SuccessToast body={helper.successContent}></SuccessToast>}
        {helper.showError && <ErrorToast body={helper.errorContent}></ErrorToast>}
      </Form>
      <br />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          tokenHolder.setToken(undefined);
        }}
      >
        <h2>Or sign out</h2>
        <FormGroup>
          <Button type="submit" className={"mt-3"} variant={"secondary"}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}

export default LoginPage;
