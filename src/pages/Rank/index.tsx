import React, { useEffect, useState } from "react";
import styles from './index.module.less';
import { Radio, Table } from 'antd';
import api from "@/api";
import wakuang from '../../../assets/wakuang.png'
import getTitle from './tableTitle'
import {useHistory} from 'react-router-dom'
import Search from '@/components/Search'

const {title, panel, header, left, right, list} = styles
export default () => {
  const pageSize = 25
  const [type, setType] = useState('miner')
  const onTypeChanged = e => {
    setType(e.target.value)
    setArr([])
    setPage(1)
    requestTableData()
  }
  const [time, setTime] = useState('1d')
  const onTimeChanged = e => {
    setTime(e.target.value)
    setPage(1)
    requestTableData()
  }

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [arr, setArr] = useState([])
  const [loading, setLoading] = useState(false)

  const requestTableData = () => {
    setLoading(true)
    api[type]({
      size: pageSize,
      page,
      duration: time
    }).then(res => {
      const {Total, Data} = res
      const arr = Data.map((el, key) => {
        return {
          ...el,
          key
        }
      })
      
      setArr(arr)
      setTotal(Total)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }
  
  useEffect(() => {
    requestTableData()
  }, [])
  
  const onPageChanged = num => {
    setPage(num)
    requestTableData()
  }

  const history = useHistory()
  const jump2Miner = miner => history.push(`/miner/${miner}`)
  const jump2Tag = el => {
    const {miner_tag, miner} = el
    if (miner_tag) {
      history.push(`/tag/${miner_tag}`)
    } else {
      jump2Miner(miner)
    }
  }

  return (
    <>
      <div className={title}>
        <img src={wakuang} alt=""/>
        挖矿排行榜
        <Search />
      </div>
      <div className={panel}>
        <div className={header}>
          <div className={left}>
            <Radio.Group 
              defaultValue={type} 
              size="large"
              buttonStyle="solid"
              onChange={onTypeChanged}>
              <Radio.Button value="miner">矿工</Radio.Button>
              <Radio.Button value="minerPower">有效算力</Radio.Button>
              <Radio.Button value="createBlockApi">出块数</Radio.Button>
              <Radio.Button value="rankankPowerApi">算力增速</Radio.Button>
            </Radio.Group>
          </div>
          <div className={right}>
            <Radio.Group 
              defaultValue={time}
              buttonStyle="solid"
              onChange={onTimeChanged}>
              <Radio.Button value="1d">24H</Radio.Button>
              <Radio.Button value="7d">7天</Radio.Button>
              <Radio.Button value="30d">30天</Radio.Button>
              <Radio.Button value="1y">1年</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className={list}>
          <Table 
            columns={getTitle(jump2Miner, jump2Tag)[type]} 
            dataSource={arr} 
            size="middle"
            loading={loading}
            pagination={{ 
              current: page,
              position: ['bottomCenter'],
              total: total,
              showQuickJumper: true,
              showSizeChanger: false,
              pageSize,
              onChange: onPageChanged
           }}
          />
        </div>
      </div>
    </>
  );
};
