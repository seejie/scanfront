import React, { useState } from 'react';
import styles from './index.module.less'
import { Button } from 'antd';
import Xpanel from '@/components/Xpanel'
import Overview from '@/pages/UserAccount/components/Overview'
import Statistics from '@/pages/UserAccount/components/Statistics'
import AccountChange from '@/pages/UserAccount/components/AccountChange'
import PowerChange from '@/pages/UserAccount/components/PowerChange'
import Modal from '@/pages/UserAccount/components/Modal'
import Search from '@/components/Search'

const {title, wrapper, btn} = styles
export default () => {
  const id = decodeURI(window.location.href.split('/').reverse()[0] || '')
  const [duration, setDuration] = useState('1d')

  const onBtnsChange = ({target: {value}}) => setDuration(value)

  const [visible, setVisible] = useState(false)
  const setSignature = () => setVisible(true)

  return (
    <>
      <div className={title}>
        {decodeURI(id)}
        <Button type="link" size="small" className={btn} onClick={setSignature}>修改签名</Button>
        <Search />
      </div>

      <Xpanel 
        title="矿工概览"
      >
        <Overview id={id} type="Tag" />
      </Xpanel>

      <Xpanel 
        title="挖矿统计"
        btns={true}
        onBtnsChange={onBtnsChange}
      >
        <Statistics id={id} duration={duration} type="Tag" />
      </Xpanel>

      <div className={wrapper}>
        <Xpanel
          title="帐户变化"
        >
          <AccountChange id={id} type="Tag" />
        </Xpanel>

        <Xpanel
          title="算力变化"
        >
          <PowerChange id={id} type="Tag"/>
        </Xpanel>
      </div>

      <Modal id={id} visible={visible} toggleVisible={setVisible}/>
    </>
  )
};
