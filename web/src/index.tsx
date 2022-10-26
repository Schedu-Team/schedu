import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import Homepage from "./routes/Homepage/Homepage";
import NewAssignment from "./routes/NewAssignment/NewAssignment";
import NewGroup from "./routes/NewGroup/NewGroup";
import NewUser from "./routes/NewUser/NewUser";
import NewPermission from "./routes/NewPermission/NewPermission";
import NewRole from "./routes/NewRole/NewRole";
import NewAttachment from "./routes/NewAttachment/NewAttachment";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NotFound from "./routes/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/new",
        element: (
          <div>
            <h3>Maintenance page</h3>
            <ButtonGroup>
              <Link to={"/new/assignment"} className={"m-1"}>
                <Button variant={"secondary"}>New Assignment</Button>
              </Link>
              <Link to={"/new/attachment"} className={"m-1"}>
                <Button variant={"secondary"}>New Attachment</Button>
              </Link>
              <Link to={"/new/group"} className={"m-1"}>
                <Button variant={"secondary"}>New Group</Button>
              </Link>
              <Link to={"/new/permission"} className={"m-1"}>
                <Button variant={"secondary"}>New Permission</Button>
              </Link>
              <Link to={"/new/role"} className={"m-1"}>
                <Button variant={"secondary"}>New Role</Button>
              </Link>
              <Link to={"/new/user"} className={"m-1"}>
                <Button variant={"secondary"}>New User</Button>
              </Link>
            </ButtonGroup>
            <hr />
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "assignment",
            element: <NewAssignment />,
          },
          {
            path: "attachment",
            element: <NewAttachment />,
          },
          {
            path: "group",
            element: <NewGroup />,
          },
          {
            path: "user",
            element: <NewUser />,
          },
          {
            path: "permission",
            element: <NewPermission />,
          },
          {
            path: "role",
            element: <NewRole />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
