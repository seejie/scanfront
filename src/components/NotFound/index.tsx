import React from 'react';
import styles from './index.module.less'
import _404 from '../../../assets/404.png'
import Search from '@/components/Search'

const {wrapper} = styles
export default () => {
  return (
    <div className={wrapper}>
      <img src={_404} alt="404"/>
      <Search />
    </div>
  );
};
