import { request } from "ice";
export default {
  async homestatic(params) {
    return await request({
      url: `/api/v0/homestatic`,
      params,
    });
  },
  async minerlistbypower(params) {
    return await request({
      url: `/api/v0/minerlistbypower`,
      params,
    });
  },
  async basefee(params) {
    return await request({
      url: `/api/v0/basefee`,
      params,
    });
  },
  
};

