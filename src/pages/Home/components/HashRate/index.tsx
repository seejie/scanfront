import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from '@/api'
import fil from "../../../../../assets/fil.png";
import { Progress, Table } from "antd";
import {useHistory} from 'react-router-dom'
import Tooltip from '@/components/Tooltip'

const { wrapper, table, icon, progress } = styles
export default () => {
  // 算力走势
  const [list, setList] = useState([])
  useEffect(() => { 
    api.minerlistbypower()
    .then(res => {
      const arr = res.miner_list.map((el, key) => {
        return {
          ...el,
          key: key + 1
        }
      })
      console.log(arr)
      setList(arr)
    })
  }, [])

  const history = useHistory()
  const jump2Miner = (id) => history.push(`/miner/${id}`)

  const progressColor = ['#6F36D5', '#DB30E3', '#EE3E96', '#FF804A', '#FFDD29', '#9DDC6E', '#45A448', '#36D5B6', '#32C6FD', '#0879FD', '#2F53FF', '#4A00FF']
  const columns = [{
    title: '',
    dataIndex: 'key',
    align: 'right',
    width: 20,
  }, {
    title: '矿工',
    dataIndex: 'address',
    width: 60,
    ellipsis: true,
    render: text => {
      return (
        <a onClick={jump2Miner.bind(this, text)}>
          <img src={fil} className={icon}/>
          {text}
        </a>
      )
    },
  }, {
    title: '有效算力/占比',
    dataIndex: 'proportion',
    width: 150,
    ellipsis: true,
    render: (text, el) => {
      console.log(el)
      return (
        <>
          <Progress
            percent={text}
            showInfo={false}
            size="small"
            strokeColor={progressColor[el.key - 1]}
            className={progress}
            trailColor="#eee"
          />{el.power}
        </>
      )
    },
  }, {
    // title: '24H增量',
    title: () => {
      return (
        <>
          24H增量
          <Tooltip txt="近24h矿工有效算力的增量" />
        </>
      )
    },
    dataIndex: 'delta',
    width: 50,
    ellipsis: true,
  }, {
    title: '出块份数',
    dataIndex: 'wincount',
    align: 'center',
    width: 50,
    ellipsis: true,
  }]

  return (
    <div className={wrapper}>
      <Table 
        columns={columns} 
        className={table}
        dataSource={list} 
        size="middle"
        pagination={false}
      />
    </div>
  )
}
