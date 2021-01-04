import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";

export default ({txt}) => {
  return (
    <Tooltip placement="top" title={txt}>
      <QuestionCircleOutlined />
    </Tooltip>
  );
};
