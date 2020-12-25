const api = '/api/v0/'
export default {
  // 网络概览
  homestatic: `${api}homestatic`,
  // 算力走势
  minerlistbypower: `${api}minerlistbypower`,
  // basefee
  basefee: `${api}basefee`,
  // 搜索信息ID/区块哈希/矿工ID
  queryTarget: `${api}Search`,
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
  // deadLines
  deadLinesList: `${api}miner/GetDeadLinesList`,
  // 区块详情|区块概览
  blockOverview: `${api}block/BlockOverview`,
  // 区块详情|消息列表
  blockMessageList: `${api}block/BlockMessageList`,
  // 签名展示信息
  getSignature: {
    method: 'post',
    url: `${api}miner/MinerPreAuthentication`,
  },
  // 签名验证
  setSignature: {
    method: 'post',
    url: `${api}miner/MinerAuthentication`
  },
  // 区块高度详情
  heightInfo: `${api}GetEpochInfo`,
  // 挖矿排行|算力增速
  rankankPowerApi: `${api}MiningRank/RankankPowerApi`,
  // 挖矿排行|有效算力
  minerPower: `${api}MiningRank/MinerPower`,
  // 挖矿排行|矿工
  miner: `${api}MiningRank/Miner`,
  // 挖矿排行|出块数量
  createBlockApi: `${api}MiningRank/CreateBlockApi`,
}
