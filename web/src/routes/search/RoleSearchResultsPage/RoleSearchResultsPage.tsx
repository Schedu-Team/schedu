import React from "react";
import SearchResults from "../../../components/SearchResults";
import { Role } from "../../../openapi";
import { Api } from "../../../index";
import { Link } from "react-router-dom";

interface RoleSearchResultsPageProps {}

function RoleSearchResultsPage() {
  return SearchResults<Role>({
    getData: () => {
      return Api.rolesAllGet().then((res) => res.data.response);
    },
    filter: (role, query) => {
      const queryL = query.toLowerCase();
      return role.name.toLowerCase().includes(queryL) || role.description.toLowerCase().includes(queryL);
    },
    show: (role) => (
      <Link
        to={"/roles/" + role.role_id}
        key={"role_" + role.role_id}
        className={'list-group-item list-group-item-action"'}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{role.name}</h5>
        </div>
        <p className="mb-1"> {role.description}...</p>
      </Link>
    ),
    acString: (role) => role.name,
  });
}

export default RoleSearchResultsPage;
