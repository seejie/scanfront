import React, { useState, useEffect } from "react";
import styles from './index.module.less';
import listIcon from '../../../assets/list-icon.png'
import api from "@/api";
import classNames from 'classnames'
import {formatTimeStamp, abbr} from '@/utils'
import {useHistory} from 'react-router-dom'
import { Pagination } from 'antd';


const {title, panel, wrapper, row, col, highlight, pagination} = styles

export default () => {

  const history = useHistory()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  useEffect(() => {
    api.blocks({
      size: 10,
      page
    }).then(res => {
      console.log(res)
      const {Total, List} = res
      setTotal(Total)
      setList(List)
    })
  }, [page])

  const onPageChanged = num => setPage(num)

  const items = () => {
    const now = Math.round(new Date().getTime() / 1000)
    // if()
    return list.map((el, idx) => {
      const {height, blocks} = el
      const handleClick = () => history.push(`/height/${height}`)
      const time = formatTimeStamp((blocks[0] || {}).timestap || 0, now)

      let ids = '', miners = '', tags = '', msg = '', rewards = ''
      blocks.forEach(el => {
        ids += abbr(el.block_id) +'\r\n'
        miners += el.miner + '\r\n'
        msg += el.msg_num + '\r\n'
        rewards += el.reward + '\r\n'
      });
      
      return (
        <div className={row} key={idx}>
          <div className={classNames([col, highlight])} onClick={handleClick}>
            {height}
          </div>
          <div className={col}>{time}</div>
          <div className={col}>{ids}</div>
          <div className={col}>{miners}</div>
          <div className={col}>{msg}</div>
          <div className={col}>{rewards}</div>
        </div>
      )
    })
  }

  return (
    <>
      <div className={title}>
        <img src={listIcon} alt=""/>
        区块列表
      </div>
      <div className={panel}>
        <div className={wrapper}>
          <div className={row}>
            <div className={col}>高度</div>
            <div className={col}>时间</div>
            <div className={col}>ID</div>
            <div className={col}>矿工</div>
            <div className={col}>消息</div>
            <div className={col}>奖励</div>
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
    </>
  );
};
