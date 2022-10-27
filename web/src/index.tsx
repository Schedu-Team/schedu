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
import NewDelayedAssignment from "./routes/NewDelayedAssignment/NewDelayedAssignment";
import NewTemporaryRole from "./routes/NewTemporaryRole/NewTemporaryRole";
import NewPublicGroup from "./routes/NewPublicGroup/NewPublicGroup";
import NewUserHasRole from "./routes/NewUserHasRole/NewUserHasRole";
import NewUserHasCompletedAssignment from "./routes/NewUserHasCompletedAssignment/NewUserHasCompletedAssignment";
import NewAssignmentCreatedByUser from "./routes/NewAssignmentCreatedByUser/NewAssignmentCreatedByUser";
import NewUserMemberOfGroup from "./routes/NewUserMemberOfGroup/NewUserMemberOfGroup";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NotFound from "./routes/NotFound/NotFound";
import { DefaultApi } from "./openapi";
import { API_ENDPOINT } from "./react-app-env";
import ToastHelper from "./components/ToastHelper";
import {ErrorToast, SuccessToast} from "./components/MyToasts";

export const Api = new DefaultApi(undefined, API_ENDPOINT);

const router = createBrowserRouter(
  [
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
              <h5>Entities:</h5>
              <ButtonGroup>
                <Link to={"/new/assignment"} className={"m-1"}>
                  <Button variant={"secondary"}>New Assignment</Button>
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
                </ButtonGroup>
                <ButtonGroup>
                <Link to={"/new/user"} className={"m-1"}>
                  <Button variant={"secondary"}>New User</Button>
                </Link>
                <Link to={"/new/member"} className={"m-1"}>
                  <Button variant={"secondary"}>New Member</Button>
                </Link>
                <Link to={"/new/temporary_role"} className={"m-1"}>
                  <Button variant={"secondary"}>New Temporary Role</Button>
                </Link>
                <Link to={"/new/delayed_assignment"} className={"m-1"}>
                  <Button variant={"secondary"}>New Delayed Assignment</Button>
                </Link>
                </ButtonGroup>
                <h5>Relations:</h5>
                <ButtonGroup>
                <Link to={"/new/public_group"} className={"m-1"}>
                  <Button variant={"secondary"}>New Public Group</Button>
                </Link>
                <Link to={"user_created_assignment"} className={"m-1"}>
                  <Button variant={"secondary"}>New Assignment Creation</Button>
                </Link>
                <Link to={"user_has_role"} className={"m-1"}>
                  <Button variant={"secondary"}>New User Has Role</Button>
                </Link>
                <Link to={"user_has_completed_assignment"} className={"m-1"}>
                  <Button variant={"secondary"}>New Assignment Completion</Button>
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
            {
              path: "temporary_role",
              element: <NewTemporaryRole />,
            },
            {
              path: "delayed_assignment",
              element: <NewDelayedAssignment />
            },
            {
              path: "public_group",
              element: <NewPublicGroup />
            },
            {
              path: "member",
              element: <NewUserMemberOfGroup />
            },
            {
              path: "user_created_assignment",
              element: <NewAssignmentCreatedByUser />
            },
            {
              path: "user_has_role",
              element: <NewUserHasRole />
            },
            {
              path: "user_has_completed_assignment",
              element: <NewUserHasCompletedAssignment />
            }
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

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
