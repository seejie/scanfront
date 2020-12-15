import React, { useState } from "react";
import styles from "./index.module.less";
import { useWebSocket } from "ahooks";

const { wrapper, row, col } = styles
export default () => {
  // todo
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
  } = useWebSocket("ws://115.236.22.234:11224/ws")

  const items = () => {
    const list = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},{name: 6},{name: 7},{name: 8},{name: 9}]
    return list.map((el, idx) => {
      return (
        <div className={row} key={idx}>
          <div className={col}>{el.name}</div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
        </div>
      )
    })
  }

  return (
    <div className={wrapper}>
      <div className={row}>
        <div className={col}>高度</div>
        <div className={col}>时间</div>
        <div className={col}>ID</div>
        <div className={col}>矿工</div>
        <div className={col}>标签</div>
        <div className={col}>消息</div>
        <div className={col}>奖励</div>
      </div>
      {items()}
    </div>
  )
}
