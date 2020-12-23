import React, { useEffect, useState } from 'react';
import styles from './index.module.less'
import classNames from 'classnames'
import api from '@/api';

const {title, wrapper, top, list, row, label, value, blod, block, highlight} = styles
export default () => {
  const id = window.location.href.split('/').reverse()[0]
  const [obj, setObj] = useState({})
  useEffect(() => {
    api.heightInfo({size: id}).then(res => {
      console.log(res)
      // setObj(res)
    })
  }, [id])

  const blocks = () => {
    const list = [1]
    return list.map((el, idx) => {
      return (
        <div key={idx} className={block}>
          <div className={row}>
            <span className={label}>区块ID</span>
            <span className={classNames([value, highlight])}>a12e23ff23</span>
          </div>
          <div className={row}>
            <span className={label}>矿工</span>
            <span className={classNames([value, highlight])}>aqe</span>
          </div>
          <div className={row}>
            <span className={label}>奖励</span>
            <span className={value}>a</span>
          </div>
          <div className={row}>
            <span className={label}>消息数</span>
            <span className={value}>a</span>
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
            <span className={value}></span>
          </div>
          <div className={row}>
            <span className={label}>累计消息数（去重）</span>
            <span className={value}></span>
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

