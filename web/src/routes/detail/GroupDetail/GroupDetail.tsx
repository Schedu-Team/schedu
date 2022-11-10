import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Group } from "../../../openapi";
import { Api } from "../../../index";

interface GroupDetailProps {}

function GroupDetail() {
  let { id } = useParams();
  const group_id = Number(id);

  const [group, updateGroup] = useState<Group>();

  // load all elements
  useEffect(() => {
    Api.groupsAllGet().then((res) => {
      // TODO: get single
      const found_group = res.data.response.find((val) => {
        return val.group_id === group_id;
      });
      updateGroup(found_group);
      Api.usersAllGet({})
    });
  }, []);

  return (
    <>
      <h3>{group?.name}</h3>
      <hr />
      <p>{group?.description}</p>
    </>
  );
}

export default GroupDetail;
