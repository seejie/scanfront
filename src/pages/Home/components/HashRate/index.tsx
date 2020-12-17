import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import api from '@/api'
import { AnyObject } from '../../constant/types'
import fil from "../../../../../assets/fil.png";
import { Progress } from "antd";
import {useHistory} from 'react-router-dom'

const { wrapper, row, col, td, icon, link, progress } = styles
export default () => {
  // 算力走势
  const [hashrateTrend, setHashrateTrend] = useState([])
  useEffect(() => { api.minerlistbypower().then(res => setHashrateTrend(res)) }, [])

  const history = useHistory()
  const jump2Miner = (id) => history.push(`/miner/${id}`)

  const items = () => {
    const list = hashrateTrend.miner_list
    if (!list) return null
    return list.map((el, idx) => {
      const onClickItem = () => jump2Miner(el.address)
      return (
        <div className={row} key={idx}>
          <div className={col}>
            <div className={td}>
              {idx + 1}
            </div>
          </div>
          <div className={col}>
            <div className={td}>
              <img src={fil} className={icon}/>
              <span className={link} onClick={onClickItem}>
                {el.address}
              </span>
            </div>
          </div>
          <div className={col}>
            <div className={td}>
              <Progress
                className={progress}
                percent={el.proportion}
                showInfo={false}
                size="small"
              />
            </div>
          </div>
          <div className={col}>
            <div className={td}>
              {el.rank}，
              {el.power}
            </div>
          </div>
          <div className={col}>
            <div className={td}>{el.delta}</div>
          </div>
          <div className={col}>
            <div className={td}>{el.wincount}</div>
          </div>
        </div>
      )
    })
  }
  return (
    <div className={wrapper}>
      <div className={row}>
        <div className={col}>
          <div className={td}></div>
        </div>
        <div className={col}>
          <div className={td}>矿工</div>
        </div>
        <div className={col}>
          <div className={td}>有效算力/占比</div>
        </div>
        <div className={col}>
          <div className={td}></div>
        </div>
        <div className={col}>
          <div className={td}>24H增量</div>
        </div>
        <div className={col}>
          <div className={td}>出块份数</div>
        </div>
      </div>
      {items()}
    </div>
  )
}
