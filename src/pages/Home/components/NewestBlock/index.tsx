import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import {formatTimeStamp, abbr} from '@/utils'
import {useHistory} from 'react-router-dom'
import { Table } from 'antd';

const { wrapper } = styles
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

      const now = Math.round(new Date().getTime() / 1000)
      const arr = list.map((item, key) => {
        const {time, block_info, ...rest} = item
        let ids = [], miners = [], tags = [], msg = [], rewards = []

        block_info.forEach(el => {
          el.cid && ids.push(el.cid)
          el.miner && miners.push(el.miner)
          el.tag && tags.push(el.tag)
          el.message && msg.push(el.message)
          el.reward && rewards.push(el.reward)
        });

        return {
          time: formatTimeStamp((block_info[0] || {}).timestap || 0, now),
          ids,
          miners,
          tags,
          msg,
          rewards,
          ...rest,
          key
        }
      })
      setList(arr)
      onUpdate(list[0])
    }
  }, [])
  
  const history = useHistory()
  const jump2 = (path, id) => history.push(`/${path}/${id}`)

  const columns = [{
    title: '高度',
    dataIndex: 'height',
    render: text => <a onClick={jump2.bind(this, 'height', text)}>{text}</a>,
  }, {
    title: '时间',
    dataIndex: 'time',
  }, {
    title: 'ID',
    dataIndex: 'ids',
    render: arr => arr.map((el, idx) => <div key={idx}><a onClick={jump2.bind(this, 'block', el)}>{abbr(el)}</a></div>)
  }, {
    title: '矿工',
    dataIndex: 'miners',
    render: arr => arr.map((el, idx) => <div key={idx}><a onClick={jump2.bind(this, 'miner', el)}>{el}</a></div>)
  }, {
    title: '标签',
    dataIndex: 'tags',
    render: arr => arr.map((el, idx) => <div key={idx}>{el}</div>)
  }, {
    title: '消息',
    dataIndex: 'msg',
    render: arr => arr.map((el, idx) => <div key={idx}>{el}</div>)
  }, {
    title: '奖励',
    dataIndex: 'rewards',
    render: arr => arr.map((el, idx) => <div key={idx}>{el}</div>)
  }]


  return (
    <div className={wrapper}>
      <Table 
        columns={columns} 
        dataSource={list} 
        size="middle"
        pagination={false}
      />
    </div>
  )
}
