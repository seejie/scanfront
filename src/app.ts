import { createApp, request, IAppConfig } from "ice";
import NotFound from "@/components/NotFound";
const appConfig: IAppConfig = {
  app: {
    rootId: "ice-container",
    request: {
      baseURL: "http://115.236.22.234:11224",
      interceptors: {
        // request: {
        
        //   onError: (error) => {
        //     return Promise.reject(error);
        //   },
        // },
        // response: {
        //   onConfig: (response) => {
           
        //   },
        // },
      },
    },
  },
  router: {
    type: "hash",
  },
  auth: {
    // 可选的，设置无权限时的展示组件，默认为 null
    NoAuthFallback: NotFound,
    // 或者传递一个函数组件
    // NoAuthFallback: () => <div>没有权限..</div>
  },
};

createApp(appConfig);
