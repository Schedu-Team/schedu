import React from "react";
import SearchResults from "../../../components/SearchResults";
import { User } from "../../../openapi";
import { Api } from "../../../index";
import { Link } from "react-router-dom";

interface UserSearchResultsPageProps {}

function UserSearchResultsPage() {
  return SearchResults<User>({
    getData: () => {
      return Api.usersAllGet().then((res) => res.data.response);
    },
    filter: (user, query) => {
      const queryL = query.toLowerCase();
      return (
        user.graduation_year?.toString().includes(queryL) ||
        user.email?.toLowerCase().includes(queryL) ||
        (user.first_name + " " + user.last_name).toLowerCase().includes(queryL)
      );
    },
    show: (user) => (
      <Link
        to={"/users/" + user.user_id}
        key={"user_" + user.user_id}
        className={'list-group-item list-group-item-action"'}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            {user.first_name} {user.last_name}
          </h5>
        </div>
        <p className="mb-1"> Graduation: {user.graduation_year}</p>
        <small>Email: {user.email}</small>
      </Link>
    ),
  });
}

export default UserSearchResultsPage;
