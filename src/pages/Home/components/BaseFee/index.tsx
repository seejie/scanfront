import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
import api from "../../../../api"

export default ({duration}) => {
  const [data, setData] = useState([])
  useEffect(() => { 
    api.basefee({duration}).then(res => {
      const list = res.map((el, idx) =>{
        // console.log(el.base_fee, `----${idx}----`)
        return {
          time: moment(el.timestamp * 1000).format("HH:mm"),
          value: +(+el.base_fee).toPrecision(4),
        }
      })
      setData(list)
    }) 
  }, [duration])

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    smooth: true,
    yAxis: {
      label: {
        formatter: v => (v | 0) + ' nonaFil'
        // formatter: v => {
        //   console.log(v,11)
        //   return (v | 0) + ' nonaFil'
        // }
      },
    },
    point: {
      size: 3,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowColor: 'yellow',
          shadowBlur: 4,
          stroke: 'transparent',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  }

  return <Line {...config} />
}
