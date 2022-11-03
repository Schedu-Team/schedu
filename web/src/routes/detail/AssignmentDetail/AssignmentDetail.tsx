import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Assignment } from "../../../openapi";
import { Api } from "../../../index";

interface AssignmentDetailProps {}

function AssignmentDetail() {
  let { id } = useParams();
  const assignment_id = Number(id);

  const [assignment, updateAssignment] = useState<Assignment>();

  // load all elements
  useEffect(() => {
    Api.assignmentsAllGet().then((res) => {
      // TODO: get single
      const found = res.data.response.find((val) => {
        return val.assignment_id === assignment_id;
      });
      updateAssignment(found);
    });
  }, []);

  return (
    <>
      <h3>Until {assignment?.deadline}</h3>
      <hr />
      <p>{assignment?.text}</p>
    </>
  );
}

export default AssignmentDetail;
