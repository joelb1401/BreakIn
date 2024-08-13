import {
  person,
  edge,
  ai,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "search",
    title: "Search",
  },
  {
    id: "profile",
    title: "Create A Profile",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Industry Professional",
    icon: person,
  },
  {
    title: "Gain An Edge",
    icon: edge,
  },
  {
    title: "AI Connection Message",
    icon: ai,
  },
];

const tree = [
  {
    icon: person,
    children:[{}, {}, {}, {}],
  },
];

export { services, tree };
