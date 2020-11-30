import React,{useEffect} from "react";

import { ConfigProvider, Switch, Menu, Row, Col, Layout, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import zhCN from "antd/lib/locale/zh_CN";
import bottomLogo from "../../../assets/bottom-logo.png";
import { useRequest } from "ice";
import apiService from "@/services/api";
const { Header, Content, Footer } = Layout;

const { SubMenu } = Menu;
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);

export default function BasicLayout({ children, location }) {
  const { data = {}, error, loading, request } = useRequest(
    apiService.homestatic,{
      manual:false
    }
  );

  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <Header style={{ backgroundColor: "#fff" }}>
          <div className="main-width flex-end">
            <div className="mr40">
              <span onClick={(e) => e.preventDefault()}>首页</span>
            </div>
            <div className="mr40 ">
              <Dropdown overlay={menu}>
                <span onClick={(e) => e.preventDefault()}>
                  区块链 <DownOutlined />
                </span>
              </Dropdown>
            </div>
            <div className="mr40">
              <Dropdown overlay={menu}>
                <span onClick={(e) => e.preventDefault()}>
                  排行榜 <DownOutlined />
                </span>
              </Dropdown>
            </div>
            <div>
              <Dropdown overlay={menu}>
                <span onClick={(e) => e.preventDefault()}>
                  统计 <DownOutlined />
                </span>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Header style={{ minHeight: ".52rem" }}>
          <div className="main-width">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {/* <Col>
                <span className="fz16 colorF">区块高度 248272</span>
              </Col> */}
              <Col>
            <span className="fz16 colorF">FIL单价 {data.Price}</span>
              </Col>
              <Col>
                <span className="fz16 colorF">24H平均挖矿收益 {data.AveProfit}</span>
              </Col>
              <Col>
                <span className="fz16 colorF">近24H产出量 {data.Newtoken}</span>
              </Col>
            </Row>
          </div>
        </Header>

        <Content className="top-bg">
          <div className="main-width margin-center" style={{ minHeight: "100vh" }}>
            {children}
          </div>
        </Content>
        <Footer className="bottom-bg">
          <div className="main-width margin-center">
            <Row>
              <Col span={12}>
                <div style={{ marginTop: ".26rem" }}>
                  <img src={bottomLogo} style={{width:'2.2rem',height:'.4rem'}} />
                </div>
                <span
                  className="fz14 colorF mt32"
                  style={{ textAlign: "left",display:'block' }}
                >
                  Bheroscan是Filecoin区块浏览器及数据服务平台，提供基于Filecoin的各类挖矿排行，区块链数据查询，可视化图表等一站式数据服务。
                </span>
                <div className="flex mt40">
                  <Dropdown overlay={menu}>
                    <span
                      style={{ marginRight: ".6rem" }}
                      className=" colorF"
                      onClick={(e) => e.preventDefault()}
                    >
                      中文 <DownOutlined />
                    </span>
                  </Dropdown>
                  <div>
                    <div className="colorF" onClick={(e) => e.preventDefault()}>
                      <span style={{ marginRight: ".06rem" }}>白天</span>

                      <Switch size="small" defaultChecked />
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className=" flex-end" style={{ marginTop: ".26rem" }}>
                  <div className="mr40 colorF">
                    <span onClick={(e) => e.preventDefault()}>首页</span>
                  </div>
                  <div className="mr40 colorF">
                    <span onClick={(e) => e.preventDefault()}>区块链</span>
                  </div>
                  <div className="mr40 colorF">
                    <span onClick={(e) => e.preventDefault()}>排行榜</span>
                  </div>
                  <div className=" colorF">
                    <span onClick={(e) => e.preventDefault()}>统计</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Footer>
      </div>
    </ConfigProvider>
  );
}
