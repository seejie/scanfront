import Layout from "@/Layouts/BasicLayout";
import NotFound from "@/components/NotFound";
import Home from "@/pages/Home";

const routerConfig = [
  {
    path: "/",
    component: Layout,

    children: [
      {
        path: "/home",
        exact: true,
        component: Home,
      },
      { path: "/", exact: true, redirect: "/home" },

      {
        component: NotFound,
      },
    ],
  },
];

console.log(routerConfig);

export default routerConfig;
