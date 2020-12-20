import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Radio, Select } from 'antd';
import api from "@/api";
import classNames from 'classnames'
import {tableTile} from '@/constant/types'
import {abbr, timeStr} from '@/utils'
import {useHistory} from 'react-router-dom'

const { wrapper, header, main, row, col, link } = styles
const { Option } = Select
export default ({id}) => {
  const [list, setList] = useState([])
  const [methods, setMethods] = useState(null)
  // todo 翻页
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [type, setType] = useState('message')
  const [method, setMethod] = useState('')
  useEffect(() => {
    if (type === 'deadLines') return
    const params = {
      size,
      // miner: id,
      miner: 'f02399',
      page,
      method
    }

    api[`${type}List`](params).then((res) => {
      console.log(res)
      const {List, Methods = null} = res
      setList(List)
      setMethods(Methods)
    })
  }, [type, method, page, size])

  const onBtnsChange = ({target: {value}}) => setType(value)
  const handleChange = val => setMethod(val)
  const titles = () => tableTile[type].map((el, idx) => <div className={col} key={idx}>{el}</div>)

  const history = useHistory()
  const jump2block = id => history.push(`/block/${id}`)

  const items = () => {
    return list.map((el, idx) => {
      const handleClick = () => el.block_cid && jump2block(el.block_cid)

      if (type === 'message') {
        return (
          <div className={row} key={idx}>
            <div className={classNames([col, link])}>{abbr(el.cid, 4)}</div>
            <div className={col}>{el.height}</div>
            <div className={col}>{timeStr(el.timestamp)}</div>
            <div className={col}>{abbr(el.from, 4)}</div>
            <div className={col}>{el.to}</div>
            <div className={col}>{el.method}</div>
            <div className={col}>{el.value}</div>
            <div className={col}>{el.total_cost}</div>
          </div>
        )
      } else if (type === 'block') {
        return (
          <div className={row} key={idx}>
            <div className={col} onClick={handleClick}>{el.height}</div>
            <div className={classNames([col, link])}>{abbr(el.block_cid, 4)}</div>
            <div className={col}>{el.reward}</div>
            <div className={col}>{timeStr(el.timestamp)}</div>
            <div className={col}>{el.message_num}</div>
            <div className={col}></div>
          </div>
        )
      } else if (type === 'transfer') {
        return (
          <div className={row} key={idx}>
            <div className={col}>1</div>
            <div className={classNames([col, link])}>2</div>
            <div className={col}>3</div>
            <div className={col}>4</div>
            <div className={col}>5</div>
            <div className={col}>6</div>
          </div>
        )
      } else if (type === 'deadLines') {
        return (
          <div className={row} key={idx}>
            <div className={col}>1</div>
            <div className={classNames([col, link])}>2</div>
            <div className={col}>3</div>
            <div className={col}>4</div>
            <div className={col}>5</div>
            <div className={col}>6</div>
            <div className={col}>7</div>
            <div className={col}>8</div>
          </div>
        )
      }
    })
  }

  const options = () => {
    if (!methods) return null
    return methods.map(el => {
      return (
        <Option value={el} key={el}>{el}</Option>
      )
    })
  }

  return (
    <div className={wrapper}>
      <div className={header}>
        <Radio.Group defaultValue="message" onChange={onBtnsChange}>
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
      <div className={main}>
        <div className={row}>
          {titles()}
        </div>
        {items()}
      </div>
    </div>
  )
}
