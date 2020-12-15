import React, { useState, useRef } from "react";
import styles from "./index.module.less";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import api from '@/api'

const { wrapper, input, info } = styles
export default ({ price = 0, profit = 0, total = 0 }) => {
  const txt = `FIL单价 ${price} | 24H平均挖矿收益 ${profit} ｜ 近24H产出量 ${total}`

  const [keyword, setKeyword] = useState<string>('')
  const $input = useRef(null)

  const onchange = () => {
    const obj = $input.current || { state: { value: ''} }
    setKeyword(obj?.state?.value)
  }

  const onSearch = () => {
    if (!keyword.trim()) return
    api.queryTarget({ keyword }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className={wrapper}>
      <Input 
        className={input}
        placeholder='搜索信息ID/区块哈希/矿工ID'
        prefix={<SearchOutlined />}
        onChange={onchange}
        onPressEnter={onSearch}
        ref={$input}
      />
      <div className={info}>{txt}</div>
    </div>
  )
}
