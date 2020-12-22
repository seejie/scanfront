import React from 'react';
import styles from './index.module.less'

const {wrapper} = styles
const notFound = () => {
  return (
    <div className={wrapper}>
      <img src="../assets/404.png" alt="404"/>
    </div>
  );
};

export default notFound;
