import React, { useState } from "react";
import styles from './index.module.less';
import { Table } from 'antd';
import classNames from 'classnames'

const {title, panel, subTitle, info, row, label, value, heigtLight} = styles
const imgBase = '../../../assets/' 

export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const tabledata = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <>
      <div className={title}>
        <img src={`${imgBase}list-icon.png`} alt=""/>
        区块列表
      </div>

      <div className={panel}>
        <div className={subTitle}>
          区块概览
        </div>
        <div className={info}>
          <div className={row}>
            <div className={label}>区块ID</div>
            <div className={value}>bafys6efqcb3p4tcola5rr2xitwrwudqg3eqzk4zvqt5u3o65iv4kw2woe3baz</div>
          </div>
          <div className={row}>
            <div className={label}>高度</div>
            <div className={classNames([value, heigtLight])}>248688</div>
          </div>
          <div className={row}>
            <div className={label}>矿工</div>
            <div className={classNames([value, heigtLight])}></div>
          </div>
          <div className={row}>
            <div className={label}>时间</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>大小</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>消息</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>奖励</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>奖励份数</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>父区块</div>
            <div className={classNames([value, heigtLight])}></div>
          </div>
          <div className={row}>
            <div className={label}>服区块权重</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>罚金</div>
            <div className={value}></div>
          </div>
          <div className={row}>
            <div className={label}>Perent Base Fee</div>
            <div className={value}></div>
          </div>
        </div>
      </div>

      <div className={panel}>
        <div className={subTitle}>
          消息列表
        </div>

        <Table 
          columns={columns} 
          dataSource={tabledata} 
          size="middle" 
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </>
  );
};
