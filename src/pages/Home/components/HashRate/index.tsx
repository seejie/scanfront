import React, { useState } from "react";
import styles from "./index.module.less";

import { Input } from "antd";

const { wrapper } = styles
export default () => {
  return (
    <div className={wrapper}>
      <Input />
    </div>
  )
}
