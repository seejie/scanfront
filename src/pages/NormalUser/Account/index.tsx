import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from "@/api";
import classNames from 'classnames'


const { wrapper, row, full, label, value } = styles
export default ({id}) => {
  const [obj, setObj] = useState({}) 
  useEffect(() =>{
    api.user({address: id}).then(res => {
      console.log(res)
      setObj(res)
    })
  }, [id])

  return (
    <div className={wrapper}>
      <div className={classNames([row, full])}>
        <span className={label}>地址</span>
        {obj.address}
      </div>
      <div className={classNames([row, full])}>
        <span className={label}>ID</span>
        {obj.id}
      </div>
      <div className={row}>
        <span className={label}>类型</span>
        {obj.addr_type}
      </div>
      <div className={row}>
        <span className={label}>创建时间</span>
        {obj.create_time}
      </div>
      <div className={row}>
        <span className={label}>余额</span>
        {obj.balance}
      </div>
      <div className={row}>
        <span className={label}>最新交易</span>
        {obj.last_deal_time}
      </div>
      <div className={row}>
        <span className={label}>消息数</span>
        {obj.message_number}
      </div>
      <div className={row}>
        <span className={label}>名下矿工</span>
        <span className={value}>未知</span>
      </div>
    </div>
  )
}
