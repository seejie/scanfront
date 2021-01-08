import React, { useState } from "react";
import styles from './index.module.less';
import Xpanel from '@/components/Xpanel'
import Account from './components/Account'
import Overview from './components/Overview'
import Statistics from './components/Statistics'
import AccountChange from './components/AccountChange'
import PowerChange from './components/PowerChange'
import Xtable from './components/Xtable'
import Modal from './components/Modal'
import { Button } from 'antd';
import Search from '@/components/Search'

const {title, wrapper, btn} = styles

export default () => {
  const id = window.location.href.split('/').reverse()[0]
  const [duration, setDuration] = useState('1d')

  const onBtnsChange = ({target: {value}}) => setDuration(value)

  const [visible, setVisible] = useState(false)
  const setSignature = () => setVisible(true)

  return (
    <>
      <div className={title}>
        账户：{id}
        <Button type="link" size="small" className={btn} onClick={setSignature}>修改签名</Button>
        <Search />
      </div>

      <Xpanel 
        title="矿工概览"
      >
        <Overview id={id}/>
      </Xpanel>

      <Xpanel 
        title="挖矿统计"
        btns={true}
        onBtnsChange={onBtnsChange}
      >
        <Statistics id={id} duration={duration}/>
      </Xpanel>

      <Xpanel 
        title="账户概览"
      >
        <Account id={id}/>
      </Xpanel>

      <div className={wrapper}>
        <Xpanel
          title="帐户变化"
        >
          <AccountChange id={id}/>
        </Xpanel>

        <Xpanel
          title="算力变化"
        >
          <PowerChange id={id}/>
        </Xpanel>
      </div>

      <Xtable id={id}/>

      <Modal id={id} visible={visible} toggleVisible={setVisible}/>
    </>
  );
};
