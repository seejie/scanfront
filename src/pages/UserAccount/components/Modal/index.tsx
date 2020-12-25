import React, { useEffect, useState } from 'react';
import styles from './index.module.less'
import { Modal, Input, message } from 'antd';
import classNames from 'classnames'
import {CopyOutlined} from '@ant-design/icons'
import api from '@/api';

const {modal, tips, row, top, value, note, txt, input, star} = styles
export default props => {
  const {visible, toggleVisible, id} = props

  const [cnName, setCnName] = useState('')
  const onCnNameChanged = (e) => setCnName(e.currentTarget.value)
  const [enName, setEnName] = useState('')
  const onEnNameChanged = (e) => setEnName(e.currentTarget.value)
  const [contact, setContact] = useState('')
  const onContactChanged = (e) => setContact(e.currentTarget.value)
  const [sign, setSign] = useState('')
  const onSignChanged = (e) => setSign(e.currentTarget.value)

  const [obj, setObj] = useState({})
  useEffect(() => {
    if (!visible) return
    api.getSignature({miner: id}).then(res => {
      setObj(res)
    })
  }, [id, visible])

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    if (cnName.length > 16 || enName.length > 16 || contact.length > 16) {
      return message.error('输入字段过长');
    } else if (!cnName.length || !enName.length || !contact.length) {
      return message.error('有未填写字段');
    }

    setConfirmLoading(true);
    api.setSignature({
      miner: id, 
      sign: sign,
      chinese_nick: cnName,
      connect: contact,
      english_nick: enName
    }).then(res => {
      setConfirmLoading(false);
      if (res.code === 'error') {
        return message.error(res.msg)
      } else {
        message.success('签名成功')
      }
      
      toggleVisible(false);
      setObj({})
    })
  };

  const handleCancel = () => {
    toggleVisible(false);
    setObj({})
  };

  const oncopy = () => {
    const input = document.createElement('input')
    input.value = obj.sign_message_hex
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy', false, null)
    document.body.removeChild(input)
    message.success('复制成功');
  }

  return (
    <>
      <Modal
        title="签名认证"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={modal}
      >
        <div className={tips}>
          目前仅对 有效算力 ≥ 32GiB的矿工开放自主认证
        </div>
        <div className={classNames([row, top])}>
          Owner地址<span className={star}>*</span><br/>
          <p className={value}>{obj.owner_addr}</p>
        </div>
        <div className={row}>
          账户中文全称<span className={star}>*</span>
          <Input placeholder="不超过16个字符" 
            className={input} onChange={onCnNameChanged} />
        </div>
        <div className={row}>
          账户英文全称<span className={star}>*</span>
          <Input placeholder="不超过16个字符" 
            className={input} onChange={onEnNameChanged} />
        </div>
        <div className={row}>
          联系方式<span className={star}>*</span>
          <Input placeholder="不超过16个字符" 
            className={input} onChange={onContactChanged} />
        </div>
        <div className={row}>
          信息<br/>
          <div className={txt}>
            {obj.sign_message?.replace('\n', '\r\n')}
          </div>
        </div>
        <div className={row}>
          签名代码<CopyOutlined onClick={oncopy}/>
          <div className={txt}>{obj.sign_message_hex}</div>
        </div>
        <div className={row}>
          签名<span className={star}>*</span>
          <Input placeholder="请复制上面的代码，在filecoin钱包中运行，将签名内容粘贴到此处" 
            onChange={onSignChanged} />
        </div>
        <div className={note}>
          特别提醒：账户名称不得使用敏感词，违禁词，名人姓名等，如有违规将进行删除和禁用签名处理，谢谢配合。
        </div>
      </Modal>
    </>
  );
};
