import React, { PureComponent } from 'react'
// import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import NoticeIcon from '../NoticeIcon'
import HeaderSearch from '../HeaderSearch'
import HeaderDropdown from '../HeaderDropdown'
// import SelectLang from '../SelectLang';
import styles from './index.less'

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData () {
    const { notices = [] } = this.props
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status]
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        )
      }
      return newNotice
    })
    return groupBy(newNotices, 'type')
  }

  getUnreadData = noticeData => {
    const unreadMsg = {}
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length
      }
    })
    return unreadMsg
  }

  changeReadState = clickedItem => {
    const { id } = clickedItem
    const { dispatch } = this.props
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id
    })
  }

  render () {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme
    } = this.props
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user"/>
          <span>account center</span>
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting"/>
          <span>user info</span>

        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle"/>
          <span>trigger error</span>

        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>
          <span>logout</span>

        </Menu.Item>
      </Menu>
    )
    const noticeData = this.getNoticeData()
    const unreadMsg = this.getUnreadData(noticeData)
    let className = styles.right

    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={'Search Anything Here'}
          dataSource={[]}
          onSearch={value => {
            console.log('input', value)
          }}
          onPressEnter={value => {
            console.log('enter', value)
          }}
        />

        <NoticeIcon
          className={styles.action}
          count={11}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps) // eslint-disable-line
            this.changeReadState(item, tabProps)
          }}
          locale={{
            emptyText: 'No notifications',
            clear: 'Clear'
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          clearClose
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title={'Notification'}
            name="notification"
            emptyText={'You have viewed all notifications.'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title={'Message'}
            name="message"
            emptyText={'You have viewed all Messages.'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
        </NoticeIcon>

        {currentUser.name ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}/>
        )}

      </div>
    )
  }
}
