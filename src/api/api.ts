const api = '/api/v0/'
export default {
  // 网络概览
  homestatic: `${api}homestatic`,
  // 算力走势
  minerlistbypower: `${api}minerlistbypower`,
  // basefee
  basefee: `${api}basefee`,
  // 搜索信息ID/区块哈希/矿工ID
  queryTarget: `${api}queryTarget`,
  // 最近14天消息数
  histMsgNum: `${api}histMsgNum`,
  // 矿工账户|矿工概览
  overview: `${api}miner/overview`,
  // 矿工账户|账户概览
  actorOverview: `${api}miner/ActorOverview`,
  // 矿工账户|挖矿统计
  minedStatic: `${api}miner/MinedStatic`,
  // 矿工账户|算力变化
  minerPowerChange: `${api}miner/GetMinerPowerChange`,
  // 矿工账户|账户变化
  minerAccountChange: `${api}miner/GetMinerAccountChange`,
  // 转账列表
  transferList: `${api}miner/GetTransferList`,
  // 消息列表
  messageList: `${api}miner/GetMessageList`,
  // 区块列表
  blockList: `${api}miner/GetBlockList`,
}
