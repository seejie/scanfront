import React from "react";
import styles from "./index.module.less";
import Search from '@/components/Search'

const { wrapper, info } = styles
export default ({ price = 0, profit = 0, total = 0 }) => {
  const txt = `FIL单价 ${price} | 24H平均挖矿收益 ${profit} ｜ 近24H产出量 ${total}`

  return (
    <div className={wrapper}>
      <Search />
      <div className={info}>{txt}</div>
    </div>
  )
}
