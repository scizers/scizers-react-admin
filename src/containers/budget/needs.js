import React, { Component } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import { TableComp } from 'sz-react-utils'
import {
  Table,
  Badge,
  Card,
  Tabs,
  Tooltip,
  notification,
  Switch,
  Input, Button, Icon
} from 'antd'
import Request from '../../request'
import Color from 'color'
import _ from 'lodash'
import Highlighter from 'react-highlight-words'
import styles from './styles.less'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
import update from 'immutability-helper'
import { getPushPathWrapper } from '../../routes'

const TabPane = Tabs.TabPane

class BudgetView extends Component {

  state = {
    data: [],
    loading: true
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.apiRequest()
  }

  apiRequest = async () => {
    this.setState({
      loading: true
    })

    let { data, error } = await Request.getBudget()

    if (!error) {
      this.setState({
        data,
        loading: false
      })
    }
  }

  render () {

    const { data, loading } = this.state
    const { dispatch } = this.props
    return (
      <PageHeaderWrapper
        title={'Need Analysis'}>

        <Card bordered={true}>

          <Tabs tabPosition={'left'}>

            {data && data.map((val, index) => {
              return <TabPane tab={val.tactic} key={index + 1}>

                <table className={styles.tableNeeds}>
                  <tbody>
                  <tr>
                    <td>Allocated Budget</td>
                    <td>{val.allocatedBudget}</td>
                  </tr>
                  <tr>
                    <td>Actual Budget</td>
                    <td>{val.actualBudget}</td>
                  </tr>
                  <tr>
                    <td>format</td>
                    <td>{val.format}</td>
                  </tr>
                  <tr>
                    <td>objective</td>
                    <td>{val.objective}</td>
                  </tr>

                  <tr>
                    <td>comments</td>
                    <td>{val.comments}</td>
                  </tr>
                  </tbody>
                </table>

              </TabPane>
            })}

          </Tabs>


        </Card>

      </PageHeaderWrapper>)

  }
}


const mapStateToProps = ({ global }) => ({
  categories: global.categories
})
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetView)
