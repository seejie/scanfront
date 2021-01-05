import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import DashItem from '../DashBItem'
import bg1 from '../../../../../assets/block-bg1.png'
import bg2 from '../../../../../assets/block-bg2.png'
import bg3 from '../../../../../assets/block-bg3.png'
import bg4 from '../../../../../assets/block-bg4.png'
import {formatTimeStamp} from '@/utils/index'

const { wrapper } = styles
export default ({info, tempT, tempH}) => {
  const { LastHeight, LastBlockTime, NetworkPower, PowerIncrement, ActiveMiner, PledgeTotal, TotalCirculation} = info
  const now = Math.round(new Date().getTime() / 1000)
  let timestap = tempT || LastBlockTime || now
  const time = formatTimeStamp(Math.round(timestap), now) 

  const first = ['区块高度', tempH || LastHeight, '', '最新区块时间', time]
  const second = ['全网有效算力', NetworkPower, '当前全网有效算力（有效存储空间）的总和', '24H FIL增量', PowerIncrement, '近24h累计增加的FIL数量']
  const third = ['活跃矿工数', ActiveMiner, '当前有效算力值大于0的矿工数', '14天历史消息数']
  const fourth = ['质押总量', PledgeTotal, '当前矿工进行挖矿所质押的FIL总和', '流通总量', TotalCirculation, '当前链上流通的FIL总量']
  return (
    <div className={wrapper}>
      <DashItem arr={first} bgImg={bg1}/>
      <DashItem arr={second} bgImg={bg2}/>
      <DashItem arr={third} bgImg={bg3} chart={true}/>
      <DashItem arr={fourth} bgImg={bg4}/>
    </div>
  )
}
