import Layout from "@/Layouts";
import NotFound from "@/components/NotFound";
import Home from "@/pages/Home";
import UserAccount from "@/pages/UserAccount";
import Rank from "@/pages/Rank";
import Statistics from "@/pages/Statistics";
import BlockList from "@/pages/BlockList";
import Block from "@/pages/Block";
import Height from "@/pages/Height";
import Message from "@/pages/Message";
import User from "@/pages/NormalUser";

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
      path: "/miner/:id", 
      exact: false, 
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
      path: "/block/:id", 
      exact: true, 
      component: Block,
    }, { 
      path: "/height/:id", 
      exact: true, 
      component: Height,
    }, { 
      path: "/message/:id", 
      exact: true, 
      component: Message,
    }, { 
      path: "/user/:id", 
      exact: true, 
      component: User,
    }, {
      component: NotFound,
    },
  ],
}];

export default routerConfig;
