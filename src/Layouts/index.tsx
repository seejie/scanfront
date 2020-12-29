import React from "react";
import { ConfigProvider } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import zhCN from "antd/lib/locale/zh_CN";
import bottomLogo from "../../assets/bottom-logo.png";
import styles from './index.module.less'
import {useHistory} from 'react-router-dom'
import classNames from 'classnames'
import logoImg from '../../assets/logo.png'

const {header, main, footer, menus, menu, logo, last, wrapper, row} = styles
export default ({ children }) => {
  const history = useHistory()
  const link2 = path => history.push(`/${path}`)

  return (
    <ConfigProvider locale={zhCN}>
      <div className={header}>
        <img className={logo} src={logoImg} alt="logo" onClick={link2.bind(this, 'home')}/>
        <div className={menus}>
          <span className={menu} onClick={link2.bind(this, 'home')}>首页</span>
          <span className={menu} onClick={link2.bind(this, 'blockList')}>区块链</span>
          <span className={menu} onClick={link2.bind(this, 'rank')}>排行榜</span>
          <span className={menu} onClick={link2.bind(this, 'statistics')}>统计</span>
          <span className={classNames([menu, last])} >
            <GlobalOutlined />
            当前网络：Mainnet
          </span>
        </div>
      </div>

      <div className={main}>
        <div className={wrapper}>{children}</div>
      </div>

      <div className={footer}>
        <div className={wrapper}>
          <div className={row}>
            <img src={bottomLogo} alt=""/>
          </div>
          <div className={row}>
            <span className={menu} onClick={link2.bind(this, 'home')}>首页</span>
            <span className={menu} onClick={link2.bind(this, 'blockList')}>区块链</span>
            <span className={menu} onClick={link2.bind(this, 'rank')}>排行榜</span>
            <span className={menu} onClick={link2.bind(this, 'statistics')}>统计</span>
          </div>
          <div className={row}>
            Bheroscan是Filecoin区块浏览器及数据服务平台，提供基于Filecoin的各类挖矿排行，区块链数据查询，可视化图表等一站式数据服务。
          </div>
          <div className={row}>
            中文
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
