import React, { useState } from "react";
import { SearchOutlined, GlobalOutlined } from "@ant-design/icons";
import { Row, Col, Progress, Select ,Input} from "antd";
import { TinyArea, Line } from "@ant-design/charts";
import apiService from "@/services/api";
import { useRequest } from "ice";
import { useInterval } from "ahooks";
import Ranking from "./components/Ranking";
import moment from "moment";
import styles from "./index.module.less";
import fil from "../../../assets/fil.png";
import zs from "../../../assets/zs.png";
import zs2 from "../../../assets/zs2.png";
import more from "../../../assets/more.png";
import VIP from "../../../assets/VIP.png";

import { useSetState, useWebSocket } from "ahooks";
export default () => {
  const { data = {}, error, loading } = useRequest(apiService.homestatic, {
    manual: false,
  });
  const { data: list = [] } = useRequest(apiService.minerlistbypower, {
    manual: false,
  });
  const { data: basefee = [] } = useRequest(apiService.basefee, {
    manual: false,
  });

  var data3 = [
    264,
    417,
    438,
    887,
    309,
    397,
    550,
    575,
    563,
    430,
    525,
    592,
    492,
    467,
    513,
    546,
    983,
    340,
    539,
    243,
    226,
    192,
  ];

  const basefeeList = basefee.map((item) => {
    return {
      time: moment(item.timestamp).format("HH:mm"),
      value: item.base_fee * Math.pow(10, 9),
    };
  });
  var config2 = {
    data: basefeeList,
    xField: "time",
    yField: "value",

    yAxis: {
      label: {
        formatter: function formatter(v) {
          if (v === '0') {
            return v + "attoFIL";
          } else {
            return Number(v).toFixed(2) + "nanoFIL";
          }
        },
      },
    },
    legend: { position: "top" },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  var config = {
    height: 50,
    line: {
      color: "transparent",
    },
    autoFit: false,
    data: data3,
    smooth: true,
    areaStyle: function areaStyle() {
      return { fillOpacity: 1, fill: "l(270) 0:#7CD4FF 1:#83FF6C " };
    },
  };

  return (
    <div>
      <div style={{ paddingTop: ".38rem" }}>
        <Row>
          <Col span={12}>
            <div className={styles.search}>
              <SearchOutlined />
              <Input
                placeholder="搜索信息ID/区块哈希/矿工ID"
                 style={{ width: "100%" ,border:0}}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="align-items-center space-around">
              <div className="align-items-center" style={{ height: ".38rem" }}>
                <GlobalOutlined style={{ color: "#FFF" }} />
                <span className="fz14 colorF ml10 ">当前网络：Mainnet</span>
              </div>
              <span className="fz14 colorF ml10 ">
                区块高度 {data.LastHeight} ｜FIL单价 ${data.Price}
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: ".6rem" }}>
        <Row gutter={8}>
          <Col span={6}>
            <div className={`${styles.box} ${styles.bg1}`}>
              <div className=" color3 fz14"> 区块高度</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.LastHeight}
              </div>
              <div className="mt30 color3 fz14">最新区块时间</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.LastBlockTime} S
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={`${styles.box} ${styles.bg2} `}>
              <div className=" color3 fz14"> 全网有效算力</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.NetworkPower}
              </div>
              <div className="mt30 color3 fz14">24H FIL增量</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.PowerIncrement}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={`${styles.box} ${styles.bg3}`}>
              <div className=" color3 fz14"> 活跃矿工数</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.ActiveMiner}PiB
              </div>
              <div className="mt30">
                <TinyArea {...config} />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={`${styles.box} ${styles.bg4}`}>
              <div className=" color3 fz14"> 全网质押总量有效算力</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.PledgeTotal}
              </div>
              <div className="mt30 color3 fz14">流通总量</div>
              <div className="mt20 color3 fz24" style={{ fontWeight: 600 }}>
                {data.TotalCirculation}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='mt20'>
        <Row gutter={8}>
          <Col span={12}>
            <div className={`${styles.boxList} `}>
              <div
                className="align-items-center "
                style={{ padding: ".2rem 0 .1rem .2rem" }}
              >
                <img
                  src={zs}
                  style={{
                    width: ".32rem",
                    height: ".32rem",
                  }}
                />
                <div className="ml10 fw600">算力走势</div>
              </div>

              <Row>
                <Col span={6}>
                  <div className="ac fz12">矿工地址</div>
                </Col>
                <Col span={5}>
                  <div className=" fz12">标签</div>
                </Col>
                <Col span={4}>
                  <div className=" fz12">有效算力</div>
                </Col>
                <Col span={4}>
                  <div className="ac fz12">24H增量</div>
                </Col>

                <Col span={4}>
                  <div className=" fz12">出块份数</div>
                </Col>
              </Row>
              <div className={styles.trendList} >
                {list.miner_list &&
                  list.miner_list.map((item, index) => {
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
                          <Col span={5}>
                            <div
                              className=" fz14 "
                              style={{ paddingRight: ".1rem" }}
                            >
                              <Progress
                                percent={item.tag ? Number(item.tag) : 0}
                                showInfo={false}
                                size="small"
                              />
                            </div>
                          </Col>
                          <Col span={4}>
                            <div className=" fz14">{item.power}</div>
                          </Col>
                          <Col span={4}>
                            <div className="ac fz14">{item.delta}</div>
                          </Col>

                          <Col span={4}>
                            <div className=" fz14">{item.wincount}%</div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={`${styles.boxList} pl20 pr30 `}>
              <div
                className="align-items-center "
                style={{ padding: ".2rem  .1rem .2rem" }}
              >
                <img
                  src={zs2}
                  style={{
                    width: ".32rem",
                    height: ".32rem",
                  }}
                />
                <div className="ml10 fw600">24HBass Fee走势</div>
              </div>
              <div
                className="pr30 pb20"
                style={{ overflowX: "scroll", height: "4rem" }}
              >
                <Line {...config2} />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Ranking />
      <div className='mt20 pb20'>
        <Row gutter={8}>
          <Col span={24}>
            <div className={`${styles.boxList} `} style={{ height: "2.3rem" }}>
              <div
                className="align-items-center "
                style={{ padding: ".2rem 0 .1rem .2rem" }}
              >
                <img
                  src={zs}
                  style={{
                    width: ".32rem",
                    height: ".32rem",
                  }}
                />
                <div className="ml10 fw600">合作伙伴</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
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
