import React, { FC } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface NewUserProps {}

const NewUser: FC<NewUserProps> = () => (
  <Form>
    <h2>Create New User</h2>
    <FormGroup>
      <FormLabel>First name</FormLabel>
      <FormControl type="text" name="fname" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Last name</FormLabel>
      <FormControl type="text" name="lname" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Email</FormLabel>
      <FormControl type="email" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Password</FormLabel>
      <FormControl type="password" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Graduation month</FormLabel>
      <FormControl type="month" />
    </FormGroup>
    <FormGroup>
      <Button type="submit" className={"mt-3"}>
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default NewUser;
