/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import DashboardAdmin from "layouts/admin_dashboard";
import Admins from "layouts/admins";
import Books from "layouts/books";
import Members from "layouts/members";
import BookDashboard from "layouts/book-dashboard";
import Borrowings from "layouts/borrowings";
import UserBorrowings from "layouts/user-borrowings";
import UserBooks from "layouts/user-books";
import VisitForm from "layouts/visit-form";
import VisitFormAdmin from "layouts/visit-form-admin";

export const adminRoutes = [
  {
    type: "collapse",
    name: "Dashboard Admin",
    key: "dashboard-admin",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard-admin",
    component: <DashboardAdmin />,
  },
  {
    type: "collapse",
    name: "Borrowings",
    key: "borrowings",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/borrowings",
    component: <Borrowings />,
  },
  {
    type: "collapse",
    name: "Books",
    key: "books",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/books",
    component: <Books />,
  },
  {
    type: "collapse",
    name: "Members",
    key: "members",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/members",
    component: <Members />,
  },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admins",
    component: <Admins />,
  },
  {
    type: "collapse",
    name: "Visit Form",
    key: "visit-form-admin",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/visit-form-admin",
    component: <VisitFormAdmin />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  // {
  //   type: "collapse",
  //   name: "Create New Admin",
  //   key: "create-new-admin",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/create-new-admin",
  //   component: <SignUpAdmin />,
  // },
];

export const userRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "User Borrowings",
    key: "user-borrowings",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/user/borrowings",
    component: <UserBorrowings />,
  },
  {
    type: "collapse",
    name: "User Books",
    key: "user-books",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user/books",
    component: <UserBooks />,
  },
]

export const guestRoutes = [
  {
    type: "collapse",
    name: "Main Page",
    key: "main-page",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/main-page",
    component: <BookDashboard />,
  },
  {
    type: "collapse",
    name: "Visit Form",
    key: "visit-form",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/visit-form",
    component: <VisitForm />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
]