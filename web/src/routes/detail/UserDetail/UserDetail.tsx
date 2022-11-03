import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../../../openapi";
import { Api } from "../../../index";

interface UserDetailProps {}

function UserDetail() {
  let { id } = useParams();
  const user_id = Number(id);

  const [user, updateUser] = useState<User>();

  // load all elements
  useEffect(() => {
    Api.usersAllGet().then((res) => {
      // TODO: get single
      const found = res.data.response.find((val) => {
        return val.user_id === user_id;
      });
      console.log(found);
      updateUser(found);
    });
  }, []);

  return (
    <>
      <h3>
        {user?.first_name} {user?.last_name}
      </h3>
      <hr />
      <p>Email: {user?.email ?? "unspecified"}</p>
      <p>Graduation year: {user?.graduation_year ?? "unspecified"}</p>
    </>
  );
}

export default UserDetail;
