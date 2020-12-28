import React, { useEffect, useState } from 'react';
import styles from './index.module.less'
import listIcon from '../../../assets/list-icon.png'
import { Select, Pagination } from 'antd';
import api from '@/api';
import {abbr, timeStr} from '../../utils'
import {useHistory} from 'react-router-dom'
import classNames from 'classnames'

const { Option } = Select;
const {title, wrapper, header, main, pagination, row, col, highlight} = styles

export default () => {
  const history = useHistory()
  const [type, setType] = useState('全部')
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => {
    api.message({
      size: 10,
      page
    }).then(res => {
      console.log(res);
      const {Data, Total} = res
      setCount(Total)
      const arr = Data.map(el => {
        const {message_cid, from, timestamp, ...rest} = el

        return {
          message_cid: abbr(message_cid, 4),
          from: abbr(from, 4),
          timestamp: timeStr(timestamp),
          ...rest
        }
      })
      setList(arr)
    })
  }, [page])

  const handleChange = val => setType(val)

  const items = () => {
    return list.map((el, idx) => {
      const handleClick = () => history.push(`/height/${height}`)
      
      return (
        <div className={row} key={idx}>
          <div className={col}>{el.message_cid}</div>
          <div className={classNames([col, highlight])} onClick={handleClick}>
            {el.height}
          </div>
          <div className={col}>{el.timestamp}</div>
          <div className={col}>{el.from}</div>
          <div className={col}>{el.to}</div>
          <div className={col}>{el.method}</div>
          <div className={col}>{el.value}</div>
          <div className={col}>{el.status}</div>
        </div>
      )
    })
  }

  const onPageChanged = num => setPage(num)

  return (
    <>
      <div className={title}>
        <img src={listIcon} alt=""/>
        消息列表
      </div>

      <div className={wrapper}>
        <div className={header}>
          <Select defaultValue={type} onChange={handleChange}>
            <Option value="全部">全部</Option>
          </Select>
          <div>共{count}条消息</div>
        </div>
        <div className={main}>
          <div className={row}>
            <div className={col}>消息ID</div>
            <div className={col}>区块高度</div>
            <div className={col}>时间</div>
            <div className={col}>发送方</div>
            <div className={col}>接收方</div>
            <div className={col}>方法</div>
            <div className={col}>金额</div>
            <div className={col}>状态</div>
          </div>
          {items()}
        </div>
        <Pagination 
          className={pagination}
          defaultCurrent={1} 
          total={count} 
          showQuickJumper
          showSizeChanger={false}
          onChange={onPageChanged}/>
      </div>
    </>
  );
};
