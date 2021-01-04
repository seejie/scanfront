import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from "@/api";
import { Pie } from '@ant-design/charts';
import Tooltip from '@/components/Tooltip'

const { top, middle, bottom, cell, strong, row, right, chart, col, large } = styles
export default ({id}) => {
  const [overview, setOverview] = useState({}) 
  useEffect(() =>{
    api.overview({miner: id}).then(res =>{
      setOverview(res)
    })
  }, [id])

  const data = [{
      type: '可用余额',
      value: parseInt(overview?.available_balance || 0),
    }, {
      type: '质押余额',
      value: parseInt(overview?.pledge_founds || 0),
    }, {
      type: '奖励锁仓',
      value: parseInt(overview?.vesting_founds || 0),
    }
  ];

  const config = {
    width: 120,
    height: 120,
    legend: false,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.4,
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: false
    },
  };

  return (
    <>
      <div className={top}>
        <div className={chart}>
          <Pie {...config} />
        </div>
        <div className={col}>
          <span>账户余额</span>
          <span className={large}>{overview.balance}</span>
        </div>
        <div className={col}>
          <span>可用余额：{overview.available_balance}</span>
          <span>质押余额：{overview.pledge_founds}</span>
          <span>奖励锁仓：{overview.vesting_founds}</span>
        </div>
      </div>

      <div className={middle}>
        <div className={cell}>
          有效算力：
          <span className={strong}>{overview.quality_adjusted_power}</span>
        </div>
        <div className={cell}>占比：{overview.proportion}</div>
        <div className={cell}>排名：{overview.rank}</div>
      </div>

      <div className={bottom}>
        <div className={row}>
          原值算力：{overview.raw_bytes_power}
          <span className={right}>
            累计出块份数<Tooltip txt="Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和" />：
            {overview.win_count}
          </span>
        </div>
        <div className={row}>
          累计出块奖励：{overview.mined_block_reward}
          <span className={right}>扇区大小：{overview.sector_size}</span>
        </div>
        <div className={row}>
          扇区状态：{overview.raw_bytes_power}
          <span className={right}>
            <span style={{color: '#20A126'}}>{overview.sector_active} 有效, </span>
            <span style={{color: '#BD3B26'}}>{overview.sector_faulty} 错误, </span>
            <span style={{color: '#D9A900'}}>{overview.sector_recoveries} 恢复中, </span>
            {/*{+overview.sector_live + +overview.sector_faulty}全部*/}
            {overview.sector_live} 全部
          </span>
        </div>
      </div>
    </>
  )
}
