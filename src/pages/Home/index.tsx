import React, { useState, useEffect } from "react";
import SearchPanel from './components/SearchPanel'
import DashBoard from './components/DashBoard'
import Xpanel from '@/components/Xpanel'
import { Row, Col, Progress, Select } from "antd";
import Ranking from "./components/Ranking";
import styles from "./index.module.less";
import fil from "../../../assets/fil.png";
import zs from "../../../assets/zs.png";
import zs2 from "../../../assets/zs2.png";
import zs3 from "../../../assets/zs3.png";
import zs4 from "../../../assets/zs4.png";
import api from '@/api'
import { AnyObject } from '../../constant/types'


import { useSetState } from "ahooks";
export default () => {
  
  // 网络概览
  const [net, setNet] = useState<AnyObject>({})
  useEffect(() => { api.homestatic().then(res => setNet(res)) }, [])
  // 算力走势
  const [hashrateTrend, setHashrateTrend] = useState<Array<AnyObject>>([])
  useEffect(() => { api.minerlistbypower().then(res => setHashrateTrend(res)) }, [])
  

  return (
    <>
      <SearchPanel 
        price={net.Price} 
        profit={net.AveProfit} 
        total={net.Newtoken}
      />

      <DashBoard info={net}/>

      <Xpanel 
        icon={zs} 
        title="算力走势"
        more={'22'}
      >
        
      </Xpanel>

      <Xpanel 
        icon={zs2} 
        title="24HBass Fee走势"
        more={'22'}
      ></Xpanel>

      <Xpanel 
        icon={zs4} 
        title="最新区块"
        more={'22'}
      ></Xpanel>

      <Xpanel 
        icon={zs3} 
        title="合作伙伴"
        more={'22'}
      ></Xpanel>

      <div className='mt20'>
        <Row gutter={8}>
          <Col span={12}>
            <div className={`${styles.boxList} `}>
              <Row>
                <Col span={6}>
                  <div className="ac fz12">矿工</div>
                </Col>
                <Col span={10}>
                  <div className="fz12">有效算力/占比</div>
                </Col>
                <Col span={4}>
                  <div className="ac fz12">24H增量</div>
                </Col>

                <Col span={3}>
                  <div className="fz12">出块份数</div>
                </Col>
              </Row>
              <div className={styles.trendList} >
                {hashrateTrend.miner_list &&
                  hashrateTrend.miner_list.map((item, index) => {
                    return (
                      <div key={index} style={{ marginTop: ".12rem" }}>
                        <Row>
                          <Col span={6}>
                            <div
                              style={{ paddingLeft: ".12rem", display: "flex" }}
                              className="fz14 align-items-cente "
                            >
                              <div style={{ width: ".2rem" }}>{index + 1}</div>
                              <img
                                src={fil}
                                style={{
                                  marginLeft: ".05rem",
                                  marginRight: ".04rem",
                                  width: ".18rem",
                                  height: ".18rem",
                                }}
                              />
                              <span>{item.address}</span>
                            </div>
                          </Col>
                          <Col span={10}>
                            <div
                              className={`${styles.progressWrapper} fz14`}
                              style={{ paddingRight: ".1rem" }}
                            >
                              <Progress
                                className={styles.progress}
                                percent={item.tag ? Number(item.tag) : 0}
                                showInfo={false}
                                size="small"
                              />
                              <div className={styles.progessInfo}>
                                {item.rank}，
                                {item.power}
                              </div>
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className="ac fz14">{item.delta}</div>
                          </Col>

                          <Col span={3}>
                            <div className=" fz14">{item.wincount}</div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={`${styles.boxList} pl20 pr30`}>
              <div
                className="pr30 pb20"
                style={{ overflowX: "scroll", height: "4rem" }}
              >
                
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Ranking />
    </>
  );
};

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    // const str = querystring.encode({
    //   code: 'utf-8',
    //   q: value,
    // });
    // jsonp(`https://suggest.taobao.com/sug?${str}`)
    //   .then(response => response.json())
    //   .then(d => {
    //     if (currentValue === value) {
    //       const { result } = d;
    //       const data = [];
    //       result.forEach(r => {
    //         data.push({
    //           value: r[0],
    //           text: r[0],
    //         });
    //       });
    //       callback(data);
    //     }
    //   });
  }

  timeout = setTimeout(fake, 300);
}

function SearchInput(props) {
  const [state, setState] = useSetState({
    data: [],
    value: undefined,
  });
  const handleSearch = (value) => {
    if (value) {
      fetch(value, (data) => setState({ data }));
    } else {
      setState({ data: [] });
    }
  };

  const handleChange = (value) => {
    setState({ value });
  };

  const options = [];
  return (
    <Select
      showSearch
      value={state.value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      bordered={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
}
