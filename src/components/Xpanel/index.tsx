import React, { useState } from "react";
import styles from "./index.module.less";

const { wrapper, label, more, groupBtn, content, iconTitle, iconMore, moreTxt } = styles
export default props => {
  const {icon, title, more = '', btns, children} = props
  
  return (
    <div className={wrapper}>
      <div className={label}>
        {icon && <img src={icon} alt="" className={iconTitle}/>}
        <span>{title}</span>
        {
          more &&
          <div className={moreTxt}>
            更多
            <img src="../assets/more.png" alt="" className={iconMore}/>
          </div>
        }
        {
          btns && <div>111</div>
        }
      </div>
      <div className={content}>
        {children}
      </div>
    </div>
  )
}
