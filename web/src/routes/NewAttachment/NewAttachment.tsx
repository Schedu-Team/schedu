import React, { FC } from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface NewAttachmentProps {}

const NewAttachment: FC<NewAttachmentProps> = () => (
  <Form>
    <h2>Create New Attachment</h2>
    <FormGroup>
      <FormLabel>Attachment file</FormLabel>
      <FormControl type="file" />
    </FormGroup>
    <FormGroup>
      <Button type="submit" className={"mt-3"}>
        Submit
      </Button>
    </FormGroup>
  </Form>
);

export default NewAttachment;
