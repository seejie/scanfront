import React, { useState } from "react";
import styles from './index.module.less';
import { Radio } from 'antd';

const {title, panel, header, left, right, chart} = styles

export default () => {
  return (
    <>
      <div className={title}>
        Gass统计
      </div>

      <div className={panel}>
        <div className={header}>
          <div className={left}>
            基础费率走势
          </div>

          <div className={right}>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">24H</Radio.Button>
              <Radio.Button value="b">7天</Radio.Button>
              <Radio.Button value="c">30天</Radio.Button>
              <Radio.Button value="d">1年</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <div className={chart}>

        </div>
      </div>
    </>
  );
};
