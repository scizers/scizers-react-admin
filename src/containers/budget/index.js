import React, { Component } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import { TableComp } from 'sz-react-utils'
import {
  Table,
  Badge,
  Card,
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

    const columns = [
      {
        key: 'tactic'
      },
      {
        key: 'allocatedBudget'
      },
      {
        key: 'plannedBudget'
      },
      {
        key: 'actualBudget'
      },
      {
        key: 'actions',
        dataIndex: 'contactType',
        title: 'Actions',
        render: (val, record) => {

          return <React.Fragment>
            {val &&
            <Tooltip title="View Details">
              <Button shape="circle" onClick={() => {
                dispatch(getPushPathWrapper('budgetspeaker', { type: val }))
              }} icon="link"/>
            </Tooltip>}

            <Tooltip title="View Details">
              <Button shape="circle" onClick={() => {
                dispatch(getPushPathWrapper('settings.editBudget', { id: record._id }))
              }} icon="edit"/>
            </Tooltip>

          </React.Fragment>

        }
      }
    ]

    return (
      <PageHeaderWrapper
        title={'Annual Brand Budget'}>

        <Card bordered={true}>
          <TableComp
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 100,
              pageSizeOptions: ['10', '20', '50', '100', '1000']
            }}
            columns={columns} dataSource={data} loading={loading}/>
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
