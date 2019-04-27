import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import RightContent from '../GlobalHeader/RightContent'
import BaseMenu from '../SiderMenu/BaseMenu'
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils'
import styles from './index.less'

export default class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined
  }

  static getDerivedStateFromProps (props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40
    }
  }

  render () {
    const { navTheme, contentWidth, menuData, logo } = this.props
    const { maxWidth } = this.state
    const flatMenuKeys = getFlatMenuKeys(menuData)
    return (
      <div className={`${styles.head} ${navTheme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo"/>
                <h1>{this.props.title}</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth
              }}
            >
              <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu}/>
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    )
  }
}
