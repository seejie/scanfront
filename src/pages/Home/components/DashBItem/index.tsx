import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import { TinyArea } from "@ant-design/charts";
import api from '@/api'

const { wrapper, title, value, line, graph } = styles
export default ({arr, bgImg, chart = false}) => {

  // 14天消息数
  const [recent, setRecent] = useState([])
  useEffect(() => { api.histMsgNum().then(res => {
    const arr = res.map(el => el.msg_num)
    setRecent(arr)
  }) }, [])

  const config = {
    height: 50,
    line: {
      color: "transparent",
    },
    autoFit: false,
    data: recent,
    smooth: true,
    areaStyle: function areaStyle() {
      return { fillOpacity: 1, fill: "l(270) 0:#7CD4FF 1:#83FF6C " };
    },
  };

  return (
    <div className={wrapper} style={{ backgroundImage: `url(${bgImg})` }}>
      <div className={title}>{arr[0]}</div>
      <div className={value}>{arr[1]}</div>
      <div className={line}></div>
      <div className={title}>{arr[2]}</div> 
      <div className={value}>{arr[3]}</div>  
      { chart && <TinyArea {...config} className={graph}/>}
    </div>
  )
}
