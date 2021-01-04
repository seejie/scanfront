import api from "@/api";
import Tooltip from "@/components/Tooltip";
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
      <div className={cell}>
        出块数量<Tooltip txt="出块数 = 挖矿出块数量（block）的总和" />
        ：{statistics.mined_block}
      </div>
      <div className={cell}>出块奖励：{statistics.mined_block_reward}</div>
      <div className={cell}>
        幸运值<Tooltip txt="实际爆块数量和理论爆块数量的比值。若矿工有效算力低于1PiB，则该值存在较大随机性，仅供参考" />
        ：{statistics.lucky_value}
      </div>
      <div className={cell}>
        出块份数<Tooltip txt="Filecoin挖矿模型中，一个高度（tipset）下可能有多个区块（block），每个区块可能获得多份奖励（win count）。累计出块份数=每次出块获得奖励份数的总和"/>
        ：{statistics.win_count}</div>
      <div className={cell}>挖矿效率：{statistics.ave_profit}</div>
    </div>
  )
}
