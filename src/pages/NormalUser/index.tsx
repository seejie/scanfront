import React from "react";
import styles from './index.module.less';
import Xpanel from '@/components/Xpanel'
import Account from './Account'
import AccountChange from '../UserAccount/components/AccountChange'
import Xtable from './Xtable'
import Search from '@/components/Search'
import { abbr } from '@/utils'

const {title} = styles
// f3qll2rot7svgu3teaftpl2xj57cgwfbsn6hwzktc5p2e7fxinohvgfvstk6f6l76v2hknuir4q63tobuz5xmq
export default () => {
  const id = window.location.href.split('/').reverse()[0]

  return (
    <>
      <div className={title}>
        账户：{abbr(id)}
        <Search />
      </div>

      <Xpanel 
        title="账户概览"
      >
        <Account id={id}/>
      </Xpanel>

      <Xpanel
        title="帐户变化"
      >
        <AccountChange id={id}/>
      </Xpanel>

      <Xtable id={id}/>
    </>
  );
};
