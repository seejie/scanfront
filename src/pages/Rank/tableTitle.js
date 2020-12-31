import React from "react";

const 排名 = {
  title: '排名',
  dataIndex: 'rank',
}

const 有效算力占比 = {
  title: '有效算力/占比',
  dataIndex: 'power_and_proportion',
}

const 矿工 = cb => {
  return {
    title: '矿工',
    dataIndex: 'miner',
    render: (text, el) => <a onClick={cb.bind(this, el.miner)}>{text}</a>,
  }
}

const 有效算力 = {
  title: '有效算力',
  dataIndex: 'power',
}

const 标签 = {
  title: '标签',
  dataIndex: 'miner_tag',
}

const 算力增量24h = {
  title: '24H算力增量',
  dataIndex: 'power_growth_day',
}

const 挖矿效率24h = {
  title: '24H挖矿效率',
  dataIndex: 'mining_efficiency',
}

const 出块奖励24h = {
  title: '24H出块奖励',
  dataIndex: 'mining_reward_day',
}

export default (jump2Miner, jump2Tag) => {
  return {
    miner: [排名, {
      title: '矿工',
      dataIndex: 'miner',
      render: (text, el) => <a onClick={jump2Tag.bind(this, text)}>{el.miner_tag || el.miner || '--'}</a>,
    }, 有效算力占比, 出块奖励24h, 挖矿效率24h, 算力增量24h],
    minerPower: [排名, 矿工(jump2Miner), 标签, 有效算力占比, 出块奖励24h, 挖矿效率24h, 算力增量24h],
    createBlockApi: [排名, 矿工(jump2Miner), 标签, {
      title: '出块分数',
      dataIndex: 'create_block_number',
    }, {
      title: '幸运值',
      dataIndex: 'luck_value',
    }, {
      title: '出块奖励/占比',
      dataIndex: 'reward_and_proportion',
    }, 有效算力],
    rankankPowerApi: [排名, 矿工(jump2Miner), 标签, {
      title: '矿机当量',
      dataIndex: '',
    }, {
      title: '算力增量',
      dataIndex: 'power_growt',
    }, 有效算力]
  }
}
