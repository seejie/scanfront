import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import classNames from 'classnames'
import {formatTimeStamp, abbr} from '@/utils'
import {useHistory} from 'react-router-dom'

const { wrapper, row, col, highlight } = styles
export default ({onUpdate}) => {
  const [list, setList] = useState([])
  useEffect(() =>{
    const ws = new WebSocket("ws://115.236.22.234:11224/ws");
    ws.onmessage = ({data}) => {
      let list
      try {
        list = JSON.parse(data)
      } catch (error) {
        list = []
      }
      setList(list)
      onUpdate(list[0])
    }
  }, [])
  
  const history = useHistory()
  const items = () => {
    const now = Math.round(new Date().getTime() / 1000)
    return list.map((el, idx) => {
      const {height, block_info} = el
      const handleClick = () => history.push(`/height/${height}`)
      const time = formatTimeStamp((block_info[0] || {}).timestap || 0, now)

      let ids = '', miners = '', tags = '', msg = '', rewards = ''
      block_info.forEach(el => {
        ids += abbr(el.cid) +'\r\n'
        miners += el.miner + '\r\n'
        tags += el.tag + '\r\n'
        msg += el.message + '\r\n'
        rewards += el.reward + '\r\n'
      });
      
      return (
        <div className={row} key={idx}>
          <div className={classNames([col, highlight])} onClick={handleClick}>
            {height}
          </div>
          <div className={col}>{time}</div>
          {/* <div className={classNames([col, highlight])} dangerouslySetInnerHTML={ids}>{ids}</div> */}
          <div className={classNames([col, highlight])} >{ids}</div>
          <div className={col}>{miners}</div>
          <div className={col}>{tags}</div>
          <div className={col}>{msg}</div>
          <div className={col}>{rewards}</div>
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
