import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from "@/api";
import { Pie } from '@ant-design/charts';

const { top, middle, bottom, cell, strong, row, right, chart, col, large } = styles
export default ({id}) => {
  const [overview, setOverview] = useState({}) 
  useEffect(() =>{
    api.overview({miner: id}).then(res =>{
      setOverview(res)
    })
  }, [id])

  const data = [{
      type: '分类一',
      value: 27,
    }, {
      type: '分类二',
      value: 25,
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
          <span className={right}>累计出块份数：{overview.win_count}</span>
        </div>
        <div className={row}>
          累计出块奖励：{overview.mined_block_reward}
          <span className={right}>扇区大小：{overview.sector}</span>
        </div>
        <div className={row}>
          扇区状态：{overview.raw_bytes_power}
          <span className={right}>
            <span style={{color: '#20A126'}}>{overview.sector_live}有效 </span>
            <span style={{color: '#BD3B26'}}>{overview.sector_faulty}错误 </span>
            <span style={{color: '#D9A900'}}>{overview.sector_active}恢复中 </span>
            {+overview.sector_live + +overview.sector_faulty + +overview.sector_active}全部
          </span>
        </div>
      </div>
    </>
  )
}
