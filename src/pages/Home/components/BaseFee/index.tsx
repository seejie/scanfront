import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Line } from "@ant-design/charts";
import moment from "moment";
import api from "../../../../api"

const { wrapper } = styles
export default () => {
  // basefee
  const [basefee, setBasefee] = useState<Array<AnyObject>>([])
  useEffect(() => { api.basefee().then(res => setBasefee(res)) }, [])

  const basefeeList = basefee.map((item) => {
    return {
      time: moment(item.timestamp).format("HH:mm"),
      value: item.base_fee * Math.pow(10, 9),
    };
  });

  const config = {
    data: basefeeList,
    xField: "time",
    yField: "value",

    yAxis: {
      label: {
        formatter: function formatter(v) {
          if (v === '0') {
            return v + "attoFIL";
          } else {
            return Number(v).toFixed(2) + "nanoFIL";
          }
        },
      },
    },
    legend: { position: "top" },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      }
    }
  }

  return (
    <>
      <Line {...config} />
    </>
  )
}
