import api from "@/api";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";

const { wrapper, cell } = styles
export default ({id, duration = '1d'}) => {
  const [statistics, setStatistics] = useState({})
  useEffect(() => {
    api.minedStatic({miner: id, duration}).then(res=> {
      setStatistics(res)
    })
  }, [duration])
 
  return (
    <div className={wrapper}>
      <div className={cell}>算力增量：{statistics.power_delta}</div>
      <div className={cell}>算力增速：{statistics.power_delta_rate}</div>
      <div className={cell}>出块奖励占比：{statistics.rewards_ratio}</div>
      <div className={cell}>出块数量：{statistics.mined_block}</div>
      <div className={cell}>出块奖励：{statistics.mined_block_reward}</div>
      <div className={cell}>幸运值：{statistics.lucky_value}</div>
      <div className={cell}>出块份数：{statistics.win_count}</div>
      <div className={cell}>挖矿效率：{statistics.ave_profit}</div>
    </div>
  )
}
