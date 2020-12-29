import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Radio, Select, Table } from 'antd';
import api from "@/api";
import {abbr, timeStr} from '@/utils'
import {useHistory} from 'react-router-dom'
import getTitle from './tableTitle'

const { wrapper, header } = styles
const { Option } = Select
export default ({id}) => {
  const pageSize = 15
  const [list, setList] = useState([])
  const [methods, setMethods] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [type, setType] = useState('message')
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (type === 'deadLines') return
    const params = {
      size: pageSize,
      miner: id,
      page,
      method
    }

    setLoading(true)
    setList([])
    api[`${type}List`](params).then((res) => {
      console.log(res)
      const {List, Methods = null, Total} = res
      const arr = List.map((el, key) => {
        const {cid, timestamp, from, block_cid, ...rest} = el
        return {
          cid: abbr(cid, 4),
          timestamp: timeStr(timestamp),
          from: abbr(from, 4),
          block_cid: abbr(block_cid, 4),
          ...rest,
          key
        }
      })
      setList(arr)
      setMethods(Methods)
      setTotal(Total)
      setLoading(false)
    }).catch(() =>{
      setLoading(false)
    })
  }, [type, method, page])

  const onBtnsChange = ({target: {value}}) => {
    setType(value)
    setTotal(0)
    setMethods(null)
    setPage(1)
    setList([])
  }
  const handleChange = val => {
    setMethod(val)
    setTotal(0)
    setList([])
    setPage(1)
  }

  const history = useHistory()
  const jump2Height = id => history.push(`/height/${id}`)
  const jump2Miner = miner => history.push(`/miner/${miner}`)

  const options = () => {
    if (!methods) return null
    return methods.map(el => {
      return (
        <Option value={el} key={el}>{el}</Option>
      )
    })
  }

  const onPageChanged = num => setPage(num)

  return (
    <div className={wrapper}>
      <div className={header}>
        <Radio.Group defaultValue="message" onChange={onBtnsChange} buttonStyle="solid">
          <Radio.Button value="message">消息列表</Radio.Button>
          <Radio.Button value="block">区块列表</Radio.Button>
          <Radio.Button value="transfer">转账列表</Radio.Button>
          <Radio.Button value="deadLines">DeadLines</Radio.Button>
        </Radio.Group>

        { 
          methods && 
          <Select style={{ width: 120 }} onChange={handleChange}>
            {options()}
          </Select>
        }
      </div>

      <Table 
        columns={getTitle(jump2Miner, jump2Height)[type]} 
        dataSource={list} 
        size="middle"
        loading={loading}
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
  )
}
