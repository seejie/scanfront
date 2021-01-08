import React, { useState } from "react";
import styles from './index.module.less';
import Xpanel from '../../components/Xpanel'
import BaseFee from '../Home/components/BaseFee'
import Search from '@/components/Search'

const {title} = styles

export default () => {
  const [duration, setDuration] = useState('1d')
  const onBtnsChange = ({target: {value}}) => setDuration(value)

  return (
    <>
      <div className={title}>
        Gass统计
        <Search />
      </div>

      <Xpanel
        title="基础费率走势"
        btns={true}
        onBtnsChange={onBtnsChange}
      >
        <BaseFee duration={duration} />
      </Xpanel>
    </>
  );
};
