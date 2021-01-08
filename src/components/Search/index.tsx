import React, { useState, useRef } from "react";
import styles from "./index.module.less";
import { Input } from "antd";
import api from '@/api'

const { input, searchIcon, input2 } = styles
export default () => {
  const ishome = location.href.includes('home')
  const [keyword, setKeyword] = useState('')
  const $input = useRef(null)

  const onchange = e => setKeyword(e.currentTarget.value || '')
  const onSearch = () => {
    if (!keyword.trim()) return
    api.queryTarget({ search: keyword }).then(res => {
      console.log(res)
    })
  }

  return (
    <>
      {!ishome && <div style={{flex:1}}></div>}
      <Input 
        className={ishome ? input : input2}
        placeholder='搜索信息ID/区块哈希/矿工ID'
        prefix={<img src="../assets/search.png" className={searchIcon}/>}
        onChange={onchange}
        onPressEnter={onSearch}
        ref={$input}
      />
    </>
  )
}
