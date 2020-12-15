import React,{useEffect} from "react";
// todo
import { ConfigProvider, Row, Col, Layout } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import zhCN from "antd/lib/locale/zh_CN";
import bottomLogo from "../../../assets/bottom-logo.png";
const { Header, Content, Footer } = Layout;

export default function BasicLayout({ children }) {
  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <Header style={{ backgroundColor: "#fff" }}>
          <div className="main-width flex-end">
            <div className="mr40">
              <span onClick={(e) => e.preventDefault()}>首页</span>
            </div>
            <div className="mr40 ">
              <span onClick={(e) => e.preventDefault()}>区块链</span>
            </div>
            <div className="mr40">
              <span onClick={(e) => e.preventDefault()}>排行榜</span>
            </div>
            <div className="mr40">
              <span onClick={(e) => e.preventDefault()}>统计</span>
            </div>
            <div>
              <GlobalOutlined style={{ }} />
              <span className="fz14 ml10 ">当前网络：Mainnet</span>
            </div>
          </div>
        </Header>

        <Content className="top-bg">
          <div className="main-width margin-center" style={{ minHeight: "100vh", paddingTop: ".38rem" }}>
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
                  中文
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
