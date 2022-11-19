import React from "react";
import SearchResults from "../../../components/SearchResults";
import { Assignment } from "../../../openapi";
import { Api } from "../../../index";
import { Link } from "react-router-dom";

interface AssignmentSearchResultsPageProps {}

function AssignmentSearchResultsPage() {
  return SearchResults<Assignment>({
    getData: () => {
      return Api.assignmentsAllGet().then((res) => res.data.response);
    },
    filter: (assignment, query) => {
      return (
        assignment.deadline.toLowerCase().includes(query.toLowerCase()) ||
        assignment.text.toLowerCase().includes(query.toLowerCase())
      );
    },
    show: (assignment) => (
      <Link
        to={"/assignments/" + assignment.assignment_id}
        key={"assignment_" + assignment.assignment_id}
        className={'list-group-item list-group-item-action"'}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{assignment.deadline}</h5>
        </div>
        <p className="mb-1"> {assignment.text.slice(0, 30)}...</p>
      </Link>
    ),
    acString: (assignment) => assignment.text.slice(0, 30),
  });
}

export default AssignmentSearchResultsPage;
