import React, { useEffect, useState } from "react";
import { Api } from "../index";
import { Badge, Collapse, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { API_ENDPOINT } from "../react-app-env";

function HealthIndicator() {
  const [health, updateHealth] = useState<boolean>();
  const [open, setOpen] = useState(true);
  const [resp, setResp] = useState<JSX.Element>();

  useEffect(() => {
    Api.serviceStatusGet()
      .then((res) => {
        const isOk = res.status === 200;
        updateHealth(isOk);
        if (isOk) {
          console.info("Connected to the server");
          setTimeout(() => {
            setOpen(false);
          }, 2500);
        } else {
          console.error("Unable to connect to the server!");
          console.error(res);
          setResp(
            <>
              <h5>
                Status code {res.status} {res.statusText}
              </h5>
              <p>
                Endpoint in use: <b>{API_ENDPOINT}</b>
              </p>
              <hr />
              <h6>Detailed response</h6>
              <p>{JSON.stringify(res)}</p>
            </>
          );
        }
      })
      .catch((res) => {
        console.error(res);
        updateHealth(false);
        setResp(
          <>
            <p>
              Endpoint in use: <b>{API_ENDPOINT}</b>
            </p>
            <h6>Detailed response</h6>
            <p>{JSON.stringify(res)}</p>
          </>
        );
      });
  }, []);

  const popover = (
    <Popover>
      <Popover.Header as="h3">
        {health === undefined ? "Loading..." : health ? "OK" : "Unsuccessful connection to the server"}
      </Popover.Header>
      <Popover.Body>{resp}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger={"click"} placement={"bottom"} overlay={popover} defaultShow={health === false}>
      <div className={"m-1"}>
        <Collapse in={open} dimension="width">
          <Badge pill bg={health === undefined ? "info" : health ? "success" : "danger"} className={"m-1 p-2"}>
            {health === false && <Spinner animation="grow" variant={"light"} role={"status"} size={"sm"} />}{" "}
            {health === undefined ? "Connecting..." : health ? "Connected" : "Connection failed"}
          </Badge>
        </Collapse>
      </div>
    </OverlayTrigger>
  );
}

export default HealthIndicator;
