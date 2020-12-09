import React, { useState } from "react";
import styles from './index.module.less';
import { Table } from 'antd';

const {title, panel} = styles
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
