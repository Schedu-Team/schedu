import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Api } from "../../index";
import { FieldValues, useForm } from "react-hook-form";
import {GroupRequest} from "../../openapi";

interface NewGroupProps {}

async function submitForm(groupRequest: GroupRequest) {
  const res = await Api.groupsAddPost(groupRequest);
  console.log(res);
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
        <Form.Control
          as="textarea"
          id="description"
          {...register("description")}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"}>
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
}

export default NewGroup;
