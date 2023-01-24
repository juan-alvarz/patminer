/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AllInbox from '@material-ui/icons/AllInbox';
import Publish from "@material-ui/icons/Publish";
import Inbox from "@material-ui/icons/Inbox";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import PartsUpload from "views/PartsUpload/PartsUpload.js";
import PartsDetailList from "views/PartsDetail/List.js";
import InboxPage from "views/Inbox/Inbox.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/parts",
    name: "Parts Detail",
    rtlName: "Parts Detail",
    icon: AllInbox,
    component: PartsDetailList,
    layout: "/admin",
  },
  {
    path: "/parts-upload",
    name: "Parts Upload",
    rtlName: "Parts Upload",
    icon: Publish,
    component: PartsUpload,
    layout: "/admin",
  },
  {
    path: "/inbox",
    name: "Inbox",
    rtlName: "Inbox",
    icon: Inbox,
    component: InboxPage,
    layout: "/admin",
  },
  // {
  //   path: "/static-pages",
  //   name: "Static Pages",
  //   rtlName: "Static Pages",
  //   icon: Pages,
  //   component: StaticPages,
  //   layout: "/admin",
  // },
  // {
  //   path: "/glossary",
  //   name: "Glossary",
  //   rtlName: "Glossary",
  //   icon: BorderColor,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // }
];

export default dashboardRoutes;
