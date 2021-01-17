import React, { useEffect, useState } from "react";
import DashItem from '../DashBItem'
import bg1 from '../../../../../assets/block-bg1.png'
import {formatTimeStamp} from '@/utils/index'

export default ({data}) => {
  const {info, tempT, tempH} = data
  const { LastHeight, LastBlockTime} = info
  let now = Math.round(new Date().getTime() / 1000)
  const timestap = tempT || LastBlockTime || now

  const [time, setTime] = useState('') 
  useEffect(() => {
    const timer = setInterval(() => {
      const temp = formatTimeStamp(Math.round(timestap), now)
      now += 1
      setTime(temp)
    }, 1000)

    return () => clearInterval(timer)
  })

  const first = ['区块高度', tempH || LastHeight, '', '最新区块时间', time]

  return (
    <DashItem arr={first} bgImg={bg1}/>
  )
}
