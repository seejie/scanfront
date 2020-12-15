import React, { useState } from "react";
import styles from "./index.module.less";
import DashItem from '../DashBItem'
import bg1 from '../../../../../assets/block-bg1.png'
import bg2 from '../../../../../assets/block-bg2.png'
import bg3 from '../../../../../assets/block-bg3.png'
import bg4 from '../../../../../assets/block-bg4.png'

const { wrapper } = styles
export default ({info}) => {
  const { LastHeight, LastBlockTime, NetworkPower, PowerIncrement, ActiveMiner, PledgeTotal, TotalCirculation} = info

  const first = ['区块高度', LastHeight, '最新区块时间', LastBlockTime]
  const second = ['全网有效算力', NetworkPower, '24H FIL增量', PowerIncrement]
  const third = ['活跃矿工数', ActiveMiner, '14天历史消息数']
  const fourth = ['质押总量', PledgeTotal, '流通总量', TotalCirculation]
  return (
    <div className={wrapper}>
      <DashItem arr={first} bgImg={bg1}/>
      <DashItem arr={second} bgImg={bg2}/>
      <DashItem arr={third} bgImg={bg3}/>
      <DashItem arr={fourth} bgImg={bg4}/>
    </div>
  )
}
