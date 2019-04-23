import React, { Component } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Drawer,
  Popconfirm,
  Card,
  Tooltip,
  notification,
  Switch,
  Upload, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import { connect } from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'

import { apiUrl } from '../../../settings'

// import { TableComp } from 'sz-react-utils'
import TableComp from '../../../components/_utils/table'
import { getPushPathWrapper } from '../../../routes'

class AllInstitution extends Component {

  state = { visible: false, loading: false, disabled: true, uploadData: null }


  reload = () => {
    this.table.current.reload()
  }
  apiRequest = (params, columns) => {
    return new Promise(async (resolve) => {
      let regExFilters = _.map(columns, x => x.key)
      let data = await Request.getAllDealers({ ...params, regExFilters })
      resolve(data)
    })
  }

  deleteMakes = async ({ _id }) => {

    this.setState({ loading: true })

    await Request.deleteMake({ _id })

    this.setState({ loading: false })

    this.reload()

    notification.success({
      message: 'Deleted Successfully',
      duration: 20,
      key: `${_id}-close`
    })

  }

  constructor (props) {
    super(props)
    this.table = React.createRef()
  }

  render () {
    const { dispatch } = this.props
    const { visible, disabled, loading } = this.state
    const columns = [

      {
        title: 'DealerName',
        key: 'name',
        sorter: true,
        dataIndex: 'contactName',
        searchTextName: 'name',
        filterRegex: true
      },
      {
        title: 'mobile',
        key: 'mobile',
        sorter: false,
        dataIndex: 'mobile',
        searchTextName: 'mobile',
        filterRegex: true
      },
      {
        title: 'Address',
        key: 'address',
        sorter: false,
        dataIndex: 'address',
        searchTextName: 'address',
        filterRegex: true
      },
      {
        title: 'Email',
        key: 'email',
        sorter: true,
        dataIndex: 'email',
        searchTextName: 'email',
        filterRegex: true
      },
      {
        title: 'Shop',
        key: 'shop',
        sorter: true,
        dataIndex: 'shop',
        searchTextName: 'shop',
        filterRegex: true
      },

      {
        title: 'Created_At',
        key: 'createdDate',
        sorter: true,
        dataIndex: 'createdAt',
        searchTextName: 'createdDate',
        filterRegex: true
      },
      {
        title: 'TotalCars',
        key: 'car',
        sorter: true,
        dataIndex: 'carCount',
        searchTextName: 'car',
        filterRegex: true
      },
      {
        title: 'TotalRequirements',
        key: 'requirement',
        sorter: true,
        dataIndex: 'reqCount',
        searchTextName: 'requirement',
        filterRegex: true
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 100,
        fixed: 'right',
        render: (val) => {
          return <div>

            <Tooltip title="list Cars Details">
              <Button shape="circle" onClick={() => {
                dispatch(getPushPathWrapper('cars.dealercars', { id: val._id }))
              }} icon="edit"/>
            </Tooltip>
            <Tooltip title="list Requirement Details">
              <Button shape="circle" onClick={() => {
                dispatch(getPushPathWrapper('requirements.dealerRequirements', { id: val._id }))
              }} icon="edit"/>
            </Tooltip>

            <Tooltip title="Edit Details">
              <Popconfirm title="Are you sure delete this task?" onConfirm={() => {
                this.deleteMakes(val)
              }} onCancel={() => {
                console.log()
              }} okText="Yes" cancelText="No">
                <Button type="danger" shape="circle" icon="delete"/>
              </Popconfirm>

            </Tooltip>


          </div>

        }
      }
    ]


    return (
      <PageHeaderWrapper
        title={'All Dealers'}>

        <Card bordered={true}>
          <TableComp ref={this.table} columns={columns} extraProps={{ loading ,scroll: { x: 1000 }}}
                     apiRequest={(params) => this.apiRequest(params, columns)}/>
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
)(AllInstitution)
