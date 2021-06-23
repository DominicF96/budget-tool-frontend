import {
  faChartPie,
  faExchangeAlt,
  faHome,
  faPlaneDeparture,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const routes = [
  {
    url: "/dashboard",
    title: "routes.dashboard",
    icon: faHome,
    showInSideBar: true,
  },
  {
    url: "/budget",
    title: "routes.budget",
    icon: faChartPie,
    showInSideBar: true,
  },
  {
    url: "/transactions",
    title: "routes.transactions",
    icon: faExchangeAlt,
    showInSideBar: true,
  },
  {
    url: "/projects",
    title: "routes.projects",
    icon: faPlaneDeparture,
    showInSideBar: true,
  },
  {
    url: "/profile",
    title: "routes.profile",
    icon: faUser,
    showInSideBar: false,
  },
];

export default routes;
