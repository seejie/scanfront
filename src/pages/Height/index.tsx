import React, { useEffect, useState } from 'react';
import styles from './index.module.less'
import classNames from 'classnames'
import api from '@/api';
import {timeStr} from '../../utils/index'
import {useHistory} from 'react-router-dom'

const {title, wrapper, top, list, row, label, value, blod, block, highlight} = styles
export default () => {
  const id = window.location.href.split('/').reverse()[0]
  const [obj, setObj] = useState({})
  useEffect(() => {
    api.heightInfo({epoch: id}).then(res => {
      setObj(res)
    })
  }, [id])

  const history = useHistory()
  const jump2 = (path, id) => history.push(`/${path}/${id}`)
  const blocks = () => {
    if (!obj.all_block_list) return
    return obj.all_block_list.map((el, idx) => {
      const jump2miner = () => jump2('miner', el.miner)
      const jump2block = () => jump2('block', el.cid)

      return (
        <div key={idx} className={block}>
          <div className={row}>
            <span className={label}>区块ID</span>
            <span className={classNames([value, highlight])}
              onClick={jump2block}
            >{el.cid}</span>
          </div>
          <div className={row}>
            <span className={label}>矿工</span>
            <span className={classNames([value, highlight])}
              onClick={jump2miner}
            >{el.miner}</span>
          </div>
          <div className={row}>
            <span className={label}>奖励</span>
            <span className={value}>{el.reward}</span>
          </div>
          <div className={row}>
            <span className={label}>消息数</span>
            <span className={value}>{el.msg_number}</span>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className={title}>
        区块高度：{id}
      </div>
      <div className={wrapper}>
        <div className={top}>
          <div className={row}>
            <span className={label}>区块时间</span>
            <span className={value}>{timeStr(obj.timestamp)}</span>
          </div>
          <div className={row}>
            <span className={label}>累计消息数（去重）</span>
            <span className={value}>{obj.cumulative_msg}</span>
          </div>
        </div>
        <div className={list}>
          <div className={blod}>所有区块</div>
          {blocks()}
        </div>
      </div>
    </>
  );
};

