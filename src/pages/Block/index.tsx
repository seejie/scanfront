import React, { useEffect, useState } from "react";
import styles from './index.module.less';
import classNames from 'classnames'
import api from '../../api'
import {abbr, timeStr} from '../../utils'
import listIcon from  '../../../assets/list-icon.png' 
import { Table } from 'antd';
import Search from '@/components/Search'

const {title, panel, subTitle, info, row, label, value, heigtLight} = styles

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
  const [page, setPage] = useState(1)
  const [method, setMethod] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    api.blockMessageList({
      block_cid: id,
      size: 10,
      page,
      method
    }).then(res => {
      const {List, Total, Methods} = res
      console.log(res)
      const arr = List.map((el, key) => {
        const {cid, from, ...rest} = el
        return {
          cid: abbr(cid, 4),
          from: abbr(from, 4),
          ...rest,
          key
        }
      })
      setList(arr)
      setTotal(Total)
      setMethod(Methods)
    })
  }, [])

  const columns = [{
    title: '消息ID',
    dataIndex: 'cid',
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
    // 后端单词拼错未改
    dataIndex: 'statue',
  }];

  const onPageChanged = num => setPage(num)

  return (
    <>
      <div className={title}>
        <img src={listIcon} alt=""/>
        区块详情
        <Search />
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

        <Table 
          columns={columns} 
          dataSource={list} 
          size="middle" 
          pagination={{ 
            current: page,
            position: ['bottomCenter'],
            total: total,
            showQuickJumper: true,
            showSizeChanger: false,
            onChange: onPageChanged
          }}
        />
      </div>
    </>
  );
};
