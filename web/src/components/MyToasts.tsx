import {useState} from "react";
import {Toast} from "react-bootstrap";

// @ts-ignore
function SuccessToast({ body }) {
  const [show, changeShow] = useState(true);

  return (
    <Toast
      show={show}
      onClose={() => changeShow(false)}
      bg={"success"}
      className={"mt-2"}
    >
      <Toast.Header>Success</Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

// @ts-ignore
function ErrorToast({ body }) {
  const [show, changeShow] = useState(true);

  return (
    <Toast
      show={show}
      onClose={() => changeShow(false)}
      bg={"danger"}
      className={"mt-2"}
    >
      <Toast.Header>Error</Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export { SuccessToast, ErrorToast };
