import Layout from "@/Layouts/BasicLayout";
import NotFound from "@/components/NotFound";
import Home from "@/pages/Home";
import UserAccount from "@/pages/UserAccount";
import Rank from "@/pages/Rank";
import Statistics from "@/pages/Statistics";
import BlockList from "@/pages/BlockList";
import BlockInfo from "@/pages/BlockInfo";

const routerConfig = [{
  path: "/",
  component: Layout,

  children: [{
      path: "/home",
      exact: true,
      component: Home,
    }, { 
      path: "/", 
      exact: true, 
      redirect: "/home" 
    }, { 
      path: "/userAccount", 
      exact: true, 
      component: UserAccount,
    }, { 
      path: "/rank", 
      exact: true, 
      component: Rank,
    }, { 
      path: "/statistics", 
      exact: true, 
      component: Statistics,
    }, { 
      path: "/blockList", 
      exact: true, 
      component: BlockList,
    }, { 
      path: "/blockInfo", 
      exact: true, 
      component: BlockInfo,
    }, {
      component: NotFound,
    },
  ],
}];

console.log(routerConfig);

export default routerConfig;
