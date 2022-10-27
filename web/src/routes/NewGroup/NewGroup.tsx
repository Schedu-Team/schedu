import React, { FC } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface NewGroupProps {}

const NewGroup: FC<NewGroupProps> = () => (
  <Form action={"https://webhook.site/4ed79268-6ab0-442e-bf44-f9e21df64303"}>
    <h2>Create New Group</h2>
    <FormGroup>
      <FormLabel>Name</FormLabel>
      <FormControl type="text" id="name" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Description</FormLabel>
      <Form.Control as="textarea" id="description"/>
    </FormGroup>
    <FormGroup>
      <Button type="submit" className={"mt-3"}>
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default NewGroup;
