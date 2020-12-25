import React, { useState } from "react";
import styles from "./index.module.less";
import { Radio } from 'antd';

const { wrapper, label, content, iconTitle, iconMore, moreTxt } = styles
export default props => {
  const {icon, title, more = '', btns, children, height, onBtnsChange} = props
  
  return (
    <div className={wrapper}>
      <div className={label}>
        {icon && <img src={icon} alt="" className={iconTitle}/>}
        <span>{title}</span>
        {
          more &&
          <div className={moreTxt} onClick={more}>
            更多
            <img src="../assets/more.png" alt="" className={iconMore}/>
          </div>
        }
        {
          btns &&
          <Radio.Group defaultValue="1d" onChange={onBtnsChange} buttonStyle="solid">
            <Radio.Button value="1d">24H</Radio.Button>
            <Radio.Button value="7d">7天</Radio.Button>
            <Radio.Button value="30d">30天</Radio.Button>
            <Radio.Button value="1y">1年</Radio.Button>
          </Radio.Group>
        }
      </div>
      <div className={content} style={{maxHeight: height}}>
        {children}
      </div>
    </div>
  )
}
