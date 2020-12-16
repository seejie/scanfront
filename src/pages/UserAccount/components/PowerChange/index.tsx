import api from "@/api";
import React, { useEffect, useState } from "react";
import { DualAxes } from '@ant-design/charts';

export default ({id}) => {
  const [data, setData] = useState({})
  useEffect(() =>{
    api.minerPowerChange({miner: id}).then(res => {
      const n = 1024*1024*1024*1024
      const list = res.map(el =>{
        const { quality_adj_power, raw_byte_power, timestamp } = el
        return {
          quality_adj_power: quality_adj_power / n,
          raw_byte_power: raw_byte_power / n,
          time: new Date(timestamp).toLocaleString().replace('下午', '').replace('上午', '')
        }
      })
      setData(list)
    })
  }, [])

  const config = {
    data: [data, data],
    xField: 'time',
    yField: ['quality_adj_power', 'raw_byte_power'],
    meta: {
      consumeTime: {
        alias: '有效算力增量',
        formatter: function formatter(v) {
          return Number((v / 60).toFixed(2));
        },
      },
      completeTime: {
        alias: '有效算力',
        formatter: function formatter(v) {
          return Number((v / 100).toFixed(1));
        },
      },
    },
    geometryOptions: [
      {
        geometry: 'column',
        color: '#586bce',
      },
      {
        geometry: 'line',
        color: '#29cae4',
      },
    ],
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
        autoEllipsis: false,
      },
      tickCount: data.length / 2,
    },
    yAxis: {
      consumeTime: {
        label: {
          formatter: function formatter(v) {
            return ''.concat(v, '分');
          },
        },
      },
      completeTime: {
        label: {
          formatter: function formatter(v) {
            return ''.concat(v);
          },
        },
      },
    },
    legend: {
      itemName: {
        formatter: function formatter(text, item) {
          return item.value === 'consumeTime' ? '有效算力增量' : '有效算力';
        },
      },
    },
  };

  return (
    <>
      <DualAxes {...config} />
    </>
  )
}
