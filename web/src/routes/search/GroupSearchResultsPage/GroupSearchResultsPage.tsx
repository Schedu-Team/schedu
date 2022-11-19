import React from "react";
import SearchResults from "../../../components/SearchResults";
import { Api } from "../../../index";
import { Group } from "../../../openapi";
import { Link } from "react-router-dom";

interface GroupSearchResultsPageProps {}

function GroupSearchResultsPage() {
  return SearchResults<Group>({
    getData: () => {
      return Api.groupsAllGet().then((res) => res.data.response);
    },
    filter: (group, query) => {
      return (
        group.name.toLowerCase().includes(query.toString().toLowerCase()) ||
        group.description.toLowerCase().includes(query.toLowerCase())
      );
    },
    show: (group) => (
      <Link
        to={"/groups/" + group.group_id}
        key={"group_" + group.group_id}
        className={'list-group-item list-group-item-action"'}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{group.name}</h5>
          <small>17 people</small> {/*TODO: calculate*/}
        </div>
        <p className="mb-1"> {group.description}...</p>
        <small className="text-muted">Next deadline: in 2 days</small> {/*TODO: calculate*/}
      </Link>
    ),
    acString: (group) => group.name,
  });
}

export default GroupSearchResultsPage;
