import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
import api from "../../../../api"

export default ({duration}) => {
  const [data, setData] = useState([])
  useEffect(() => { 
    api.basefee({duration}).then(res => {
      const list = res.map(el =>{
        return {
          time: moment(el.timestamp * 1000).format("HH:mm"),
          value: Math.round(+el.base_fee),
        }
      })
      console.log(list)
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
        formatter: function formatter(v) {
          return (v | 0) + ' nonaFil'
        },
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

  return (
    <Line {...config} />
  )
}
