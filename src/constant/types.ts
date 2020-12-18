export interface AnyObject {
  [propName: string]: any;
}

export interface Api {
  [propsName: string]: (params?: AnyObject) => Promise<any>;
}

export const tableTile = {
  message: ['消息ID', '区块高度', '时间', '发送方', '接收方', '方法', '金额', '附加费'],
  block: ['区块高度', '区块ID', '奖励', '时间', '消息数', '区块大小'],
  transfer: ['时间', '消息ID', '发送方', '接收方', '净收入', '类型'],
  deadLines: ['DeadLine', 'Partitions', 'Total Sectors', 'Fault Sectors', 'Recovery Sectors', 'Terminated Sectors', 'Prowen Partitions', 'Open']
}
