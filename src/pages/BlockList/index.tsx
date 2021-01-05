import React, { useState, useEffect } from "react";
import styles from './index.module.less';
import listIcon from '../../../assets/list-icon.png'
import api from "@/api";
import {formatTimeStamp, abbr} from '@/utils'
import {useHistory} from 'react-router-dom'
import { Table } from 'antd';

const {title, panel} = styles

export default () => {
  const pageSize = 25
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  useEffect(() => {
    api.blocks({
      size: pageSize,
      page
    }).then(res => {
      console.log(res)
      const {Total, List} = res
      setTotal(Total)
      const now = Math.round(new Date().getTime() / 1000)
      const arr = List.map((item, key) => {
        const {time, blocks, ...rest} = item
        let ids = [], miners = [], msg = [], rewards = []

        blocks.forEach(el => {
          el.block_id && ids.push(el.block_id)
          el.miner && miners.push(el.miner)
          el.msg_num && msg.push(el.msg_num)
          el.reward && rewards.push(el.reward)
        });

        return {
          time: formatTimeStamp((blocks[0] || {}).timestap || now, now),
          ids,
          miners,
          msg,
          rewards,
          ...rest,
          key
        }
      })
      setList(arr)
    })
  }, [page])

  const onPageChanged = num => setPage(num)
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
    title: '消息',
    dataIndex: 'msg',
    render: arr => arr.map((el, idx) => <div key={idx}>{el}</div>)
  }, {
    title: '奖励',
    dataIndex: 'rewards',
    render: arr => arr.map((el, idx) => <div key={idx}>{el}</div>)
  }]

  return (
    <>
      <div className={title}>
        <img src={listIcon} alt=""/>
        区块列表
      </div>
      <div className={panel}>
        <Table 
          columns={columns} 
          dataSource={list} 
          size="middle"
          pagination={{
            position: ['bottomCenter'],
            total: total,
            showQuickJumper: true,
            showSizeChanger: false,
            pageSize,
            onChange: onPageChanged
          }}
        />
      </div>
    </>
  );
};
