import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from "@/api";


const { wrapper, row, label, value } = styles
export default ({id}) => {
  const [overview, setOverview] = useState({}) 
  useEffect(() =>{
    api.actorOverview({miner: id}).then(res =>{
      setOverview(res)
    })
  }, [id])

  return (
    <div className={wrapper}>
      <div className={row}>
        <span className={label}>地址：</span>
        {overview.address}
      </div>
      <div className={row}>
        <span className={label}>节点ID：</span>
        {overview.peer_id}
      </div>
      <div className={row}>
        <span className={label}>消息数：</span>
        {overview.msg_num}
      </div>
      <div className={row}>
        <span className={label}>Owner：</span>
        <span className={value}>{overview.owner}</span>
      </div>
      <div className={row}>
        <span className={label}>类型：</span>
        {overview.actor_type}
      </div>
      <div className={row}>
        <span className={label}>Woker：</span>
        <span className={value}>{overview.worker}</span>
      </div>
      <div className={row}>
        <span className={label}>创建时间：</span>
        {overview.create_time}
      </div>
      <div className={row}>
        <span className={label}>地区（公开IP）：</span>
        未知
      </div>
    </div>
  )
}
