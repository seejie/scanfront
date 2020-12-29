import React from "react";

const 消息ID = {
  title: '消息ID',
  dataIndex: 'cid',
}

const 区块高度 = cb => {
  return {
    title: '区块高度',
    dataIndex: 'height',
    render: text => <a onClick={cb.bind(this, text)}>{text}</a>
  } 
}

const 时间 = {
  title: '时间',
  dataIndex: 'timestamp',
}

const 发送方 = {
  title: '发送方',
  dataIndex: 'from',
}

const 接收方 = {
  title: '接收方',
  dataIndex: 'to',
}

export default (jump2Miner, jump2Height) => {
  return {
    message: [消息ID, 区块高度(jump2Height), 时间, 发送方, 接收方, {
      title: '方法',
      dataIndex: 'method',
    }, {
      title: '金额',
      dataIndex: 'value',
    }, {
      title: '附加费',
      dataIndex: 'total_cost',
    }],
    block: [区块高度(jump2Height), {
      title: '区块ID',
      dataIndex: 'block_cid'
    }, {
      title: '奖励',
      dataIndex: 'reward',
    }, 时间, {
      title: '消息数',
      dataIndex: 'message_num',
    }, {
      title: '区块大小',
      dataIndex: 'size',
    }],
    transfer: [时间, 消息ID, 发送方, 接收方, {
      title: '净收入',
      dataIndex: '',
    }, {
      title: '类型',
      dataIndex: '',
    }],
    deadLines: [{
      title: 'DeadLine',
      dataIndex: '',
    }, {
      title: 'Partitions',
      dataIndex: '',
    }, {
      title: 'Total Sectors',
      dataIndex: '',
    }, {
      title: 'Fault Sectors',
      dataIndex: '',
    }, {
      title: 'Recovery Sectors',
      dataIndex: '',
    }, {
      title: 'Terminated Sectors',
      dataIndex: '',
    }, {
      title: 'Prowen Partitions',
      dataIndex: '',
    }, {
      title: 'Open',
      dataIndex: '',
    }]
  }
}
