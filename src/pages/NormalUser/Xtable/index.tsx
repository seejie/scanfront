import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Radio, Select, Pagination } from 'antd';
import api from "@/api";
import classNames from 'classnames'
import {tableTile} from '@/constant/types'
import {abbr, timeStr} from '@/utils'
import {useHistory} from 'react-router-dom'

const { wrapper, header, main, row, col, link, pagination } = styles
const { Option } = Select
export default ({id}) => {
  const [list, setList] = useState([])
  const [methods, setMethods] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [type, setType] = useState('message')
  const [method, setMethod] = useState('')
  useEffect(() => {
    const params = {
      size: 10,
      miner: id,
      // todo
      // miner: 'f02399',
      page,
      method
    }

    api[`${type}List`](params).then((res) => {
      console.log(res)
      const {List, Methods = null, Total} = res
      setList(List)
      setMethods(Methods)
      setTotal(Total)
    })
  }, [type, method, page])

  const onBtnsChange = ({target: {value}}) => {
    setType(value)
    setTotal(0)
    setMethods(null)
    setPage(1)
    setList([])
  }
  const handleChange = val => setMethod(val)
  const titles = () => tableTile[type].map((el, idx) => <div className={col} key={idx}>{el}</div>)

  const history = useHistory()
  const jump2Height = id => history.push(`/height/${id}`)

  const items = () => {
    return list.map((el, idx) => {
      const handleClick = () => el.height && jump2Height(el.height)

      if (type === 'message') {
        return (
          <div className={row} key={idx}>
            <div className={col}>{abbr(el.cid, 4)}</div>
            <div className={classNames([col, link])} onClick={handleClick}>{el.height}</div>
            <div className={col}>{timeStr(el.timestamp)}</div>
            <div className={col}>{abbr(el.from, 4)}</div>
            <div className={col}>{el.to}</div>
            <div className={col}>{el.method}</div>
            <div className={col}>{el.value}</div>
            <div className={col}>{el.total_cost}</div>
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
      } else {
        return
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

  const onPageChanged = num => setPage(num)

  return (
    <div className={wrapper}>
      <div className={header}>
        <Radio.Group defaultValue="message" onChange={onBtnsChange} buttonStyle="solid">
          <Radio.Button value="message">消息列表</Radio.Button>
          <Radio.Button value="transfer">转账列表</Radio.Button>
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

      <Pagination 
        className={pagination}
        defaultCurrent={1} 
        total={total} 
        showQuickJumper
        showSizeChanger={false}
        onChange={onPageChanged}/>
    </div>
  )
}
