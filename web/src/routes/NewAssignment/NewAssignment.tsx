import React, { FC } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface NewAssignmentProps {}

const NewAssignment: FC<NewAssignmentProps> = () => (
  <Form>
    <h2>Create New Assigment</h2>
    <FormGroup>
      <FormLabel>Deadline</FormLabel>
      <FormControl type="datetime-local" />
    </FormGroup>
    <FormGroup>
      <FormLabel>Text</FormLabel>
      <Form.Control as="textarea" />
    </FormGroup>
    <FormGroup>
      <Button type="submit" className={"mt-3"}>
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default NewAssignment;
