import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Role } from "../../../openapi";
import { Api } from "../../../index";

interface RoleDetailProps {}

function RoleDetail() {
  let { id } = useParams();
  const role_id = Number(id);

  const [role, updateRole] = useState<Role>();

  // load all elements
  useEffect(() => {
    Api.rolesAllGet().then((res) => {
      // TODO: get single
      const found = res.data.response.find((val) => {
        return val.role_id === role_id;
      });
      updateRole(found);
    });
  }, []);

  return (
    <>
      <h3>{role?.name}</h3>
      <hr />
      <p>{role?.description}</p>
    </>
  );
}

export default RoleDetail;
