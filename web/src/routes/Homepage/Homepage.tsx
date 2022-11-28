import React, { useEffect, useState } from "react";
import { ListGroup, Row } from "react-bootstrap";
import { Api } from "../../index";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import axios from "axios";

import L from "leaflet";

interface HomepageProps {}

interface IpInfo {
  ip: string;
  latlng: [number, number];
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

async function getLocation(): Promise<IpInfo> {
  const resp = await axios.get("https://geolocation-db.com/json/");
  if (resp.status !== 200) {
    console.error(resp);
    throw Error(resp.statusText);
  }
  return {
    ip: resp.data.IPv4,
    latlng: [resp.data.latitude, resp.data.longitude],
  };
}

function MyMarker(this: any) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [ip, setIp] = useState<string>("");

  const map = useMap();

  useEffect(() => {
    getLocation().then((res) => {
      setPosition(res.latlng);
      setIp(res.ip);
      map.setView(res.latlng);
    });
  }, []);

  return (
    <Marker position={position}>
      <Popup>Your IP address: {ip}</Popup>
    </Marker>
  );
}

function MyLeaflet() {
  return (
    <MapContainer center={[0, 0]} zoom={13} scrollWheelZoom={false} style={{ height: "30em" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMarker />
    </MapContainer>
  );
}

function Homepage() {
  const [groups, updateGroups] = useState([] as JSX.Element[]);

  // load all groups
  useEffect(() => {
    Api.groupsAllGet().then((res) => {
      const objs = res.data.response.map((group) => (
        <a
          href="#"
          className="list-group-item list-group-item-action"
          aria-current="true"
          key={"group_" + group.group_id}
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{group.name}</h5>
            <small>17 people</small> {/*TODO: calculate*/}
          </div>
          <p className="mb-1"> {group.description}...</p>
          <small className="text-muted">Next deadline: in 2 days</small> {/*TODO: calculate*/}
        </a>
      ));
      updateGroups(objs);
    });
  }, []);

  return (
    <>
      <MyLeaflet />
      <Row>
        <div className="col-md-6">
          <h2>Your upcoming deadlines</h2>
          <ListGroup>
            <a href="#" className="list-group-item list-group-item-action" aria-current="true">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">F22_CO-560-A</h5>
                <small>Tomorrow</small>
              </div>
              <p className="mb-1">DBWS Deadline for Assignment 3...</p>
              <small className="text-muted">10 people completed</small>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">F22_CO-562-A</h5>
                <small>3 days left</small>
              </div>
              <p className="mb-1">OS Deadline for Assignment 4...</p>
              <small className="text-muted">2 people completed</small>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">F22_JTMS-12</h5>
                <small>Wed, 25th Oct</small>
              </div>
              <p className="mb-1">PRP Deadline for Problem Set 2...</p>
              <small className="text-muted">0 people completed</small>
            </a>
          </ListGroup>
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col spacer ml-1"></div>
        <div className="col-sm-5">
          <h2>Your groups</h2>
          <div className="list-group">{groups}</div>
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Row>
    </>
  );
}

export default Homepage;
