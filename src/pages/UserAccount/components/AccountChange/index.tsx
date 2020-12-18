import React, { useState, useEffect } from "react";
import api from "@/api";
import { Line } from '@ant-design/charts';
import {timestr} from '@/utils'

export default ({id}) => {
  const [data, setData] = useState([])
  useEffect(() =>{
    api.minerAccountChange({miner: id}).then(arr => {
      const list = []
      const n = 1000000000000000000 
      arr.forEach(el => {
        const {timestamp, available_balance, balance, pledge_balance} = el
        const date = timestr(timestamp)
        list.push({
          date,
          type: '总余额',
          value: Math.round(balance / n)
        })
        list.push({
          date,
          type: '可用余额',
          value: Math.round(available_balance / n)
        })
        list.push({
          date,
          type: '质押金额',
          value: Math.round(pledge_balance / n)
        })
      })
      setData(list)
    })
  }, [])

  const config = {
    data: data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#28E895', '#38A9FF', '#FF7C0F'],
    point: {
      shape: function shape({type}) {
        return type === 'Gas fuel' ? 'square' : 'circle';
      },
      style: function style(_ref2) {
        var date = _ref2.date;
        return { r: Number(date) % 4 ? 0 : 3 };
      },
    },
  };

  return (
    <>
      <Line {...config} />
    </>
  )
}
