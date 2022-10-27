import React, { FC } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface NewRoleProps {}

const NewRole: FC<NewRoleProps> = () => (
  <Form>
    <h2>Create New Role</h2>
    <FormGroup>
      <FormLabel>Name</FormLabel>
      <FormControl type="text" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Description</FormLabel>
      <Form.Control as="textarea" />
    </FormGroup>
    <FormGroup>
      <Button type="submit" className={"mt-3"}>
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default NewRole;
