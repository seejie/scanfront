import React, { useState } from "react";
import styles from './index.module.less';
import { Radio, Table } from 'antd';
import { useRequest } from "ice";
const {title, panel, header, left, right, list} = styles
const imgBase = '../../../assets/' 

export default () => {
  // const [type, setType] = useState<string>('')
  // const onTypeChanged = (val) => setType(val)
  
  
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
        <img src={`${imgBase}wakuang.png`} alt=""/>
        挖矿排行榜
      </div>
      <div className={panel}>
        <div className={header}>
          <div className={left}>
            <Radio.Group defaultValue="a" size="large">
              <Radio.Button value="a">矿工</Radio.Button>
              <Radio.Button value="b">有效算力</Radio.Button>
              <Radio.Button value="c">出块数</Radio.Button>
              <Radio.Button value="d">算力增速</Radio.Button>
            </Radio.Group>
          </div>
          <div className={right}>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">24H</Radio.Button>
              <Radio.Button value="b">7天</Radio.Button>
              <Radio.Button value="c">30天</Radio.Button>
              <Radio.Button value="d">1年</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className={list}>
          <Table 
            columns={columns} 
            dataSource={tabledata} 
            size="middle" 
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </div>
    </>
  );
};
