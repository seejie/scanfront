import React, { useEffect, useState } from "react";
import styles from './index.module.less';
import { Radio, Table } from 'antd';
import api from "@/api";
const {title, panel, header, left, right, list} = styles
const imgBase = '../../../assets/' 

export default () => {
  const [type, setType] = useState('rankankPowerApi')
  const onTypeChanged = val => setType(val)
  const [time, setTime] = useState('1d')
  const onTimeChanged = val => setTime(val)

  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [arr, setArr] = useState([])
  
  useEffect(() => {
    api[type]({
      size,
      page,
      duration: time
    }).then(res => {
      console.log(res)
      const {Size, Page, Total, Data} = res
      setArr(Data)
      setTotal(Total)
      setPage(Page)
      setSize(Size)
    })
  }, [type, time])
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  return (
    <>
      <div className={title}>
        <img src={`${imgBase}wakuang.png`} alt=""/>
        挖矿排行榜
      </div>
      <div className={panel}>
        <div className={header}>
          <div className={left}>
            <Radio.Group 
              defaultValue={type} 
              size="large"
              buttonStyle="solid"
              onChange={onTypeChanged}>
              <Radio.Button value="rankankPowerApi">矿工</Radio.Button>
              <Radio.Button value="minerPower">有效算力</Radio.Button>
              <Radio.Button value="miner">出块数</Radio.Button>
              <Radio.Button value="createBlockApi">算力增速</Radio.Button>
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
            columns={columns} 
            dataSource={arr} 
            size="middle" 
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </div>
    </>
  );
};
