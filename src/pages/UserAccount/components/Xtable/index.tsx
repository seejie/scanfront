import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import { Radio, Select } from 'antd';
import api from "@/api";
import classNames from 'classnames'

const { wrapper, header, main, col, link } = styles
const { Option } = Select
export default ({id}) => {

  const [list, setList] = useState([])
  const [methods, setMethods] = useState(null)
  const [type, setType] = useState('message')
  useEffect(() => {
    if (type === 'deadLines') return
    const params = {
      size: 10,
      miner: id,
      page: 1,
      // method: ''
    }

    api[`${type}List`](params).then((res) => {
      console.log(res)
      const {List, methods} = res
      setList(List)
      setMethods(methods)
    })
  }, [type])

  const onBtnsChange = ({target: {value}}) => setType(value)
  const handleChange = () => {}

  const items = () => {
    return list.map(el => {
      console.log(el)
      return (
        <>
          <div className={col}></div>
          <div className={classNames([col, link])}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
          <div className={col}></div>
        </>
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
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        }
      </div>
      <div className={main}>
        <div className={col}>消息ID</div>
        <div className={col}>区块高度</div>
        <div className={col}>时间</div>
        <div className={col}>发送方</div>
        <div className={col}>接收方</div>
        <div className={col}>方法</div>
        <div className={col}>金额</div>
        <div className={col}>附加费</div>
        {items()}
      </div>
    </div>
  )
}
