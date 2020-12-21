import React, { useEffect, useState } from "react";
import styles from './index.module.less';
import { Table } from 'antd';
import classNames from 'classnames'
import api from '../../api'
import {timeStr} from '../../utils/index'

const {title, panel, subTitle, info, row, label, value, heigtLight} = styles
const imgBase = '../../../assets/' 

export default () => {
  const id = window.location.href.split('/').reverse()[0]
  const [block, setBlock] = useState({})
  useEffect(() => {
    api.blockOverview({block_cid: id}).then(res => {
      setBlock(res)
    })
  }, [id])

  const parentOnClick = id => console.log(id)
  const parents = () => {
    if (!block.parents) return
    return block.parents.map(el => {
      const handleClicke = parentOnClick(el)
      return <span onClick={handleClicke} key={el}>{el}</span>
    })
  }

  const [list, setList] = useState([])
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [method, setMethod] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    api.blockMessageList({
      block_cid: id,
      size,
      page,
      method
    }).then(res => {
      const {List, Total, Methods} = res
      console.log(res)
      setList(List)
      setTotal(Total)
      setMethod(Methods)
    })
  }, [])

  const columns = [{
    title: '消息ID',
    dataIndex: 'message',
  }, {
    title: '发送方',
    dataIndex: 'from',
  }, {
    title: '接收方',
    dataIndex: 'to',
  }, {
    title: '方法',
    dataIndex: 'method',
  }, {
    title: '金额',
    dataIndex: 'value',
  }, {
    title: '状态',
    dataIndex: 'status',
  }];

  return (
    <>
      <div className={title}>
        <img src={`${imgBase}list-icon.png`} alt=""/>
        区块列表
      </div>

      <div className={panel}>
        <div className={subTitle}>
          区块概览
        </div>
        <div className={info}>
          <div className={row}>
            <div className={label}>区块ID</div>
            <div className={value}>{block.block_cid}</div>
          </div>
          <div className={row}>
            <div className={label}>高度</div>
            <div className={classNames([value, heigtLight])}>{block.height}</div>
          </div>
          <div className={row}>
            <div className={label}>矿工</div>
            <div className={classNames([value, heigtLight])}>{block.miner}</div>
          </div>
          <div className={row}>
            <div className={label}>时间</div>
            <div className={value}>{timeStr(block.timestamp)}</div>
          </div>
          <div className={row}>
            <div className={label}>大小</div>
            <div className={value}>{block.size}</div>
          </div>
          <div className={row}>
            <div className={label}>消息</div>
            <div className={value}>{block.message_num}</div>
          </div>
          <div className={row}>
            <div className={label}>奖励</div>
            <div className={value}>{block.reward}</div>
          </div>
          <div className={row}>
            <div className={label}>奖励份数</div>
            <div className={value}>{block.reward_num}</div>
          </div>
          <div className={row}>
            <div className={label}>父区块</div>
            <div className={classNames([value, heigtLight])}></div>
          </div>
          <div className={row}>
            <div className={label}>父区块权重</div>
            <div className={value}>{parents()}</div>
          </div>
          <div className={row}>
            <div className={label}>罚金</div>
            <div className={value}>{block.penalty}</div>
          </div>
          <div className={row}>
            <div className={label}>Perent Base Fee</div>
            <div className={value}>{block.parents_base_fee}</div>
          </div>
        </div>
      </div>

      <div className={panel}>
        <div className={subTitle}>
          消息列表
        </div>

        {/* <Table 
          columns={columns} 
          dataSource={list} 
          size="middle" 
          pagination={{ position: ['bottomCenter'] }}
        /> */}
      </div>
    </>
  );
};