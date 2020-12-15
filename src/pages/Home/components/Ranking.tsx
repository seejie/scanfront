import React, { useState } from "react";
import { SearchOutlined, GlobalOutlined } from "@ant-design/icons";
import { Row, Col, Progress, Select } from "antd";

import { useInterval } from "ahooks";

import moment from "moment";
import styles from "../index.module.less";
import zs from "../../../../assets/zs.png";
import more from "../../../../assets/more.png";
import VIP from "../../../../assets/VIP.png";

import { useWebSocket } from "ahooks";
let newList = [] as any;
export default () => {
  const [date, setDate] = useState(new Date());
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnect,
    connect,
  } = useWebSocket("ws://115.236.22.234:11224/ws");

  let item: any = latestMessage ? JSON.parse(latestMessage.data) : [];
  if (Array.isArray(item)) {
    newList = item;
  } else {
    newList.pop();
    newList = [item, ...newList];
  }

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  return (
    <div style={{ marginTop: ".2rem" }}>
      <Row>
        <Col span={24}>
          <div className={`${styles.boxList}`} style={{ height: "5.86rem" }}>
            <div
              className="align-items-center space-between pl20 pr20"
              style={{ height: ".82rem" }}
            >
              <div className="align-items-center">
                <img
                  src={zs}
                  style={{
                    width: ".32rem",
                    height: ".32rem",
                  }}
                />
                <div className="ml10 fw600" style={{ lineHeight: ".82rem" }}>
                  最新区块
                </div>
              </div>
              <div className="align-items-center ">
                <div className="mr10 fz14" style={{ lineHeight: ".82rem" }}>
                  更多
                </div>
                <img
                  src={more}
                  style={{
                    width: ".12rem",
                    height: ".1rem",
                  }}
                />
              </div>
            </div>
            <div
              className={`${styles.border} ml20 mr20`}
              style={{ marginBottom: ".1rem" }}
            />
            <Row>
              <Col span={4}>
                <div className="ac fz12 ">高度</div>
              </Col>
              <Col span={3}>
                <div className="ac fz12">时间</div>
              </Col>
              <Col span={4}>
                <div className="ac fz12">ID</div>
              </Col>
              <Col span={3}>
                <div className="ac fz12">矿工</div>
              </Col>
              <Col span={4}>
                <div className="ac fz12">标签</div>
              </Col>
              <Col span={3}>
                <div className="ac fz12">消息</div>
              </Col>
              <Col span={3}>
                <div className="ac fz12">奖励</div>
              </Col>
            </Row>
            <div className={styles.rankingList} >
              {newList.map &&
                newList.map((item, index) => {
                  return (
                    <div key={index} style={{ marginTop: ".12rem" }}>
                      <Row>
                        <Col className="justify-content-center" span={4}>
                          <div className="align-items-center ac fz12 ">
                            {item.height}
                          </div>
                        </Col>
                        <Col className="justify-content-center" span={3}>
                          <div className="align-items-center ac fz12">
                            {moment(date).diff(
                              moment(item.timestap),
                              "seconds"
                            )}
                            秒前
                          </div>
                        </Col>
                        <Col span={4}>
                          <div className="break-word ac fz12">{item.cid}</div>
                        </Col>
                        <Col className="justify-content-center" span={3}>
                          <div className=" ac fz12">{item.miner}</div>
                        </Col>
                        <Col className="justify-content-center" span={4}>
                          <div className="justify-content-center fz12 align-items-center">
                            {/* 智合云（ZH） */}
                            {item.tag || "--"}
                            {item.tag && (
                              <img
                                src={VIP}
                                style={{
                                  width: ".1rem",
                                  height: ".1rem",
                                }}
                              />
                            )}
                          </div>
                        </Col>
                        <Col className="justify-content-center" span={3}>
                          <div className="ac align-items-center fz12">
                            {item.message}
                          </div>
                        </Col>
                        <Col className="justify-content-center" span={3}>
                          <div className="ac align-items-center fz12">
                            {item.reward}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
