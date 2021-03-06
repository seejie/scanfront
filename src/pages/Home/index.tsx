import React, { useState, useEffect } from "react";
import SearchPanel from './components/SearchPanel'
import DashBoard from './components/DashBoard'
import BaseFee from './components/BaseFee'
import HashRate from './components/HashRate'
import NewestBlock from './components/NewestBlock'
import Xpanel from '@/components/Xpanel'
import styles from "./index.module.less";
import zs from "../../../assets/zs.png";
import zs2 from "../../../assets/zs2.png";
import zs3 from "../../../assets/zs3.png";
import zs4 from "../../../assets/zs4.png";
import api from '@/api'
import {useHistory} from 'react-router-dom'
import Chart from './components/Chart'

const { wrapper, wrapper2 } = styles
export default () => {
  
  // 网络概览
  const [net, setNet] = useState({})
  useEffect(() => { api.homestatic().then(res => setNet(res)) }, [])

  const history = useHistory()
  const onMoreHashRate = () => history.push(`/rank`)
  const onMoreBaseFee = () => history.push(`/statistics`)
  const onMoreNewestBlock = () => history.push(`/blockList`)
  
  const [tempT, setTempT] = useState('')
  const [tempH, setTempH] = useState('')
  const onUpdate = v => {
    setTempT((v.block_info[0] || {}).timestap)
    setTempH(v.height)
  }
  
  return (
    <>
      <SearchPanel 
        price={net.Price} 
        profit={net.AveProfit} 
        total={net.Newtoken}
      />

      <div className={wrapper2}>
        <Chart data={{info: net, tempT, tempH}} />
        <DashBoard info={net} tempT={tempT} tempH={tempH} />
      </div>

      <div className={wrapper}>
        <Xpanel 
          icon={zs} 
          title="排行榜"
          more={onMoreHashRate}
          height={400}
        >
          <HashRate />
        </Xpanel>

        <Xpanel 
          icon={zs2} 
          title="24HBass Fee走势"
          tooltip="基础手续费率：由系统收取并销毁的手续费的实时费率"
          more={onMoreBaseFee}
          height={400}
        >
          <BaseFee duration={'1d'}/>
        </Xpanel>
      </div>


      <Xpanel 
        icon={zs4} 
        title="最新区块"
        more={onMoreNewestBlock}
        height={500}
      >
        <NewestBlock onUpdate={onUpdate}/>
      </Xpanel>

      <Xpanel 
        icon={zs3} 
        title="合作伙伴"
      ></Xpanel>
    </>
  );
};
