import React from "react";
import Tooltip from "@/components/Tooltip";

const map = {
  出块分数: 'Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和',
  幸运值: '实际爆块数量和理论爆块数量的比值。若矿工有效算力低于1PiB，则该值存在较大随机性，仅供参考。',
  '出块奖励/占比': '在选定周期内，矿工获得出块奖励与累计产出区块奖励的比值',
  矿机当量: '以官方Benchmark推荐配置（AMD Ryzen Threadripper 3970X、NVidia GTX 2080Ti、128GB 2133mhz）视为1台基准矿机，矿机当量为该矿工换算成标准矿机的数量（矿工的算力增速与该基准矿机增速的比值）。',
  算力增量: '在选定周期内，矿工的有效算力增量',
  '24H挖矿效率': '近24h矿工平均每T算力所挖出的FIL数量',
  '24H算力增量': '近24h矿工有效算力的增量',
}

const tooltip = title => {
  return (
    <>
      {title}
      <Tooltip txt={map[title]} />
    </>
  )
}

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
  title: tooltip('24H算力增量'),
  dataIndex: 'power_growth_day',
}

const 挖矿效率24h = {
  title: tooltip('24H挖矿效率'),
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
      render: (text, el) => <a onClick={jump2Tag.bind(this, el)}>{el.miner_tag || el.miner || '--'}</a>,
    }, 有效算力占比, 出块奖励24h, 挖矿效率24h, 算力增量24h],
    minerPower: [排名, 矿工(jump2Miner), 标签, 有效算力占比, 出块奖励24h, 挖矿效率24h, 算力增量24h],
    createBlockApi: [排名, 矿工(jump2Miner), 标签, {
      title: tooltip('出块分数'),
      dataIndex: 'create_block_number',
    }, {
      title: tooltip('幸运值'),
      dataIndex: 'luck_value',
    }, {
      title: tooltip('出块奖励/占比'),
      dataIndex: 'reward_and_proportion',
    }, 有效算力],
    rankankPowerApi: [排名, 矿工(jump2Miner), 标签, {
      title: tooltip('矿机当量'),
      dataIndex: '',
    }, {
      title: tooltip('算力增量'),
      dataIndex: 'power_growt',
    }, 有效算力]
  }
}
