import React, { useState } from "react";
import styles from "./index.module.less";
import { TinyArea, Line } from "@ant-design/charts";

const { wrapper, title, value, line } = styles
export default ({arr, bgImg,}) => {

  const data3 = [264, 417, 438, 887, 309, 397, 550, 
    592, 492, 467, 513, 546, 983, 340
  ]
  const config = {
    height: 50,
    line: {
      color: "transparent",
    },
    autoFit: false,
    data: data3,
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
      { arr[2] && <div className={title}>{arr[2]}</div> }
      { arr[3] && <div className={value}>{arr[3]}</div> }  
      { !arr[3] && <TinyArea {...config} />}
    </div>
  )
}
