import Tooltip from "@/components/Tooltip";
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

const map = {
  'Total Sectors': '此分区中的扇区号，包括故障和终止的扇区',
  'Fault Sectors': '已检测/已声明故障且尚未恢复的扇区区',
  'Recovery Sectors': '失败的扇区，有望在下一个PoSt中恢复',
  'Terminated Sectors': '扇区已终止，但尚未从分区中删除',
  'Prowen Partitions': '自证明期开始以来，带有PoSt提交的分区编号',
  Open: '证明期的第一个时期（ <= CurrentEpoch ）'
}

const tooltip = title => {
  return (
    <>
      {title}
      <Tooltip txt={map[title]} />
    </>
  )
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
      title: tooltip('Total Sectors'),
      dataIndex: '',
    }, {
      title: tooltip('Fault Sectors'),
      dataIndex: '',
    }, {
      title: tooltip('Recovery Sectors'),
      dataIndex: '',
    }, {
      title: tooltip('Terminated Sectors'),
      dataIndex: '',
    }, {
      title: tooltip('Prowen Partitions'),
      dataIndex: '',
    }, {
      title: tooltip('Open'),
      dataIndex: '',
    }]
  }
}
