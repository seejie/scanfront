import React, { useEffect, useState } from 'react';
import styles from './index.module.less'
import listIcon from '../../../assets/list-icon.png'
import { Select, Table } from 'antd';
import api from '@/api';
import {abbr, timeStr} from '../../utils'
import {useHistory} from 'react-router-dom'

const { Option } = Select;
const {title, wrapper, header} = styles
export default () => {
  const pageSize = 25
  const history = useHistory()
  const [type, setType] = useState('全部')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.message({
      size: pageSize,
      page
    }).then(res => {
      console.log(res);
      const {Data, Total} = res
      setTotal(Total)
      const arr = Data.map((el, key) => {
        const {message_cid, from, timestamp, ...rest} = el

        return {
          message_cid: abbr(message_cid, 4),
          from: abbr(from, 4),
          timestamp: timeStr(timestamp),
          ...rest,
          key
        }
      })
      setList(arr)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [page])

  const handleChange = val => {
    setType(val)
    setTotal(0)
    setList([])
  }
  const onPageChanged = num => setPage(num)
  const jump2Height = id => history.push(`/height/${id}`)

  const columns = [{
    title: '消息ID',
    dataIndex: 'message_cid',
  }, {
    title: '区块高度',
    dataIndex: 'height',
    render: text => <a onClick={jump2Height.bind(this, text)}>{text}</a>,
  }, {
    title: '时间',
    dataIndex: 'timestamp',
  }, {
    title: '发送方',
    dataIndex: 'from',
  }, {
    title: '接收方',
    dataIndex: 'to',
  }, {
    title: '方法',
    dataIndex: 'method',
  }, {
    title: '金额',
    dataIndex: 'value',
  }, {
    title: '状态',
    dataIndex: 'status',
  }]

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
          <div>共{total}条消息</div>
        </div>

        <Table 
          columns={columns} 
          dataSource={list} 
          size="middle"
          loading={loading}
          pagination={{ 
            position: ['bottomCenter'],
            total: total,
            showQuickJumper: true,
            showSizeChanger: false,
            pageSize,
            onChange: onPageChanged
          }}
        />
      </div>
    </>
  );
};
