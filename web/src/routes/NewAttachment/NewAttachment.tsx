import React from "react";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

interface NewAttachmentProps {}

function NewAttachment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}> {/*TODO*/}
      <h2>Create New Attachment</h2>
      <FormGroup>
        <FormLabel>Attachment file</FormLabel>
        <FormControl type="file" {...register("file", { required: true })} />
      </FormGroup>
      <FormGroup>
        <Button type="submit" className={"mt-3"}>
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
}

export default NewAttachment;
