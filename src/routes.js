import {
  faChartPie,
  faExchangeAlt,
  faHome,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

const routes = [
  {
    url: "/dashboard",
    title: "routes.dashboard",
    icon: faHome,
  },
  {
    url: "/budget",
    title: "routes.budget",
    icon: faChartPie,
  },
  {
    url: "/transactions",
    title: "routes.transactions",
    icon: faExchangeAlt,
  },
  {
    url: "/projects",
    title: "routes.projects",
    icon: faPlaneDeparture,
  },
];

export default routes;
