import React, { useState, useEffect } from 'react';
import styles from './index.module.less'
import Search from '@/components/Search'
import listIcon from  '../../../assets/list-icon.png' 
import classNames from 'classnames'
import api from '../../api'
import {abbr, timeStr} from '../../utils'
import { Table } from 'antd';
import Tooltip from '@/components/Tooltip'

const {title, panel, subTitle, info, row, label, value, heigtLight} = styles
export default () => {
  const id = window.location.href.split('/').reverse()[0]
  const [msg, setMsg] = useState({})
  const [list, setList] = useState([])
  const [other, setOther] = useState({})

  useEffect(() => {
    api.messageInfoApi({messageCid: id}).then(res => {
      const { message_overview, other_message, transfer_over } = res
      console.log(res)
      setMsg(message_overview)
      setList(transfer_over)
      setTotal(transfer_over.length)
      setOther(other_message)
    })
  }, [id])

  const parentOnClick = id => console.log(id)
  const blocks = () => {
    if (!msg.belonging_blocks) return
    return msg.belonging_blocks.map(el => {
      const handleClicke = parentOnClick(el)
      return <span onClick={handleClicke} key={el}>{el}</span>
    })
  }

  const columns = [{
    title: '发送方',
    dataIndex: 'from',
    render: text => <span key={text}>{abbr(text)}</span>,
  }, {
    title: '接收方',
    dataIndex: 'to',
  }, {
    title: '金额',
    dataIndex: 'value',
    ellipsis: true,
  }, {
    title: '类型',
    dataIndex: 'transfer_type',
  }];

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const onPageChanged = num => setPage(num)

  return (
    <>
      <div className={title}>
        <img src={listIcon} alt=""/>
        消息详情
        <Search />
      </div>

      <div className={panel}>
        <div className={subTitle}>
          消息概览
        </div>
        <div className={info}>
          <div className={row}>
            <div className={label}>消息ID</div>
            <div className={value}>{msg.message_cid}</div>
          </div>
          <div className={row}>
            <div className={label}>高度</div>
            <div className={classNames([value, heigtLight])}>{msg.height}</div>
          </div>
          <div className={row}>
            <div className={label}>时间</div>
            <div className={value}>{timeStr(msg.timestamp)}</div>
          </div>
          <div className={row}>
            <div className={label}>所属区块</div>
            <div className={classNames([value, heigtLight])}>{blocks()}</div>
          </div>
          <div className={row}>
            <div className={label}>发送方</div>
            <div className={classNames([value, heigtLight])}>{msg.from}</div>
          </div>
          <div className={row}>
            <div className={label}>接收方</div>
            <div className={classNames([value, heigtLight])}>{msg.to}</div>
          </div>
          <div className={row}>
            <div className={label}>方法</div>
            <div className={value}>{msg.method}</div>
          </div>
          <div className={row}>
            <div className={label}>金额</div>
            <div className={value}>{msg.value}</div>
          </div>
          <div className={row}>
            <div className={label}>状态</div>
            <div className={value}>{msg.status}</div>
          </div>
        </div>
      </div>

      <div className={panel}>
        <div className={subTitle}>
          消息列表
        </div>

        <Table 
          columns={columns} 
          dataSource={list} 
          size="middle" 
          pagination={{ 
            current: page,
            position: ['bottomCenter'],
            total: total,
            showQuickJumper: true,
            showSizeChanger: false,
            onChange: onPageChanged
          }}
        />
      </div>

      <div className={panel}>
        <div className={subTitle}>
          其他消息
        </div>
        <div className={info}>
          <div className={row}>
            <div className={label}>版本（API）</div>
            <div className={value}>{other.version}</div>
          </div>
          <div className={row}>
            <div className={label}>Nonce</div>
            <div className={value}>{other.nonce}</div>
          </div>
          <div className={row}>
            <div className={label}>
              Gas Fee Cap
              <Tooltip txt="用户选择支付的总手续费率" />
            </div>
            <div className={value}>{other.gas_fee_cap}</div>
          </div>
          <div className={row}>
            <div className={label}>
              Gas Premium
              <Tooltip txt="用户选择支付给矿工的手续费率" />
            </div>
            <div className={value}>{other.gas_premium}</div>
          </div>
          <div className={row}>
            <div className={label}>
              Gas 限额
              <Tooltip txt="该笔交易能消耗的最大Gas量" />
            </div>
            <div className={value}>{other.gas_limit}</div>
          </div>
          <div className={row}>
            <div className={label}>
              Gas 使用量
              <Tooltip txt="完成这笔交易真实消耗的Gas量" />
            </div>
            <div className={value}>{other.gas_use}</div>
          </div>
          <div className={row}>
            <div className={label}>
              Gas Fee
              <Tooltip txt="根据区块链网络拥堵状况实时更新的基础手续费率" />
            </div>
            <div className={value}>{other.gas_fee}</div>
          </div>
          <div className={row}>
            <div className={label}>参数</div>
            <div className={value}>{other.param}</div>
          </div>
          <div className={row}>
            <div className={label}>返回值</div>
            <div className={value}>{other.return}</div>
          </div>
        </div>
      </div>
    </>
  );
};
