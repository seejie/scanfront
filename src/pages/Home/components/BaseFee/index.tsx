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
          value: el.base_fee,
        }
      })
      console.log(list)
      setData(list)
    }) 
  }, [duration])

  // const config = {
  //   data: basefeeList,
  //   xField: "time",
  //   yField: "value",
  //   yAxis: {
  //     label: {
  //       formatter: function formatter(v) {
  //         if (v === '0') {
  //           return v + "attoFIL";
  //         } else {
  //           return Number(v).toFixed(2) + "nanoFIL";
  //         }
  //       },
  //     },
  //   },
  //   legend: { position: "top" },
  //   smooth: true,
  //   animation: {
  //     appear: {
  //       animation: "path-in",
  //       duration: 5000,
  //     }
  //   }
  // }
// todo
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    label: {},
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return (v | 0) + ' nonaFil'
        },
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
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
    // theme: {
    //   geometries: {
    //     point: {
    //       diamond: {
    //         active: {
    //           style: {
    //             shadowColor: '#FCEBB9',
    //             shadowBlur: 2,
    //             stroke: '#F6BD16',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    interactions: [{ type: 'marker-active' }],
  };

  return (
    <>
    {/* todo */}
      <Line {...config} />
    </>
  )
}
