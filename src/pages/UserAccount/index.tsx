import React, { useState } from "react";
import styles from './index.module.less';
import Xpanel from '@/components/Xpanel'

const {title, panel, wrapper, header, row} = styles

export default () => {
  return (
    <>
      <div className={title}>
        账户：10207
      </div>

      <Xpanel 
        title="矿工概览"
      >
        <div>矿工概览</div>
      </Xpanel>

      <Xpanel 
        title="挖矿统计"
      >
        <div>挖矿统计</div>
      </Xpanel>

      <Xpanel 
        title="账户概览"
      >
        <div>账户概览</div>
      </Xpanel>

      <div className={wrapper}>
        <div className={panel}>
          <div className={header}>用户变化</div>
        </div>

        <div className={panel}>
          <div className={header}>算力变化</div>
        </div>
      </div>

      <div className={panel}>
        
      </div>
    </>
  );
};
