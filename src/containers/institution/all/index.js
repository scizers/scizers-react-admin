import React, { Component } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Drawer,
  Badge,
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
import styles from './styles.less'
import update from 'immutability-helper'

import { apiUrl } from '../../../settings'


import { TableComp } from 'sz-react-utils'
import { getPushPathWrapper } from '../../../routes'

class AllInstitution extends Component {

  state = { visible: false, loading: false, disabled: true, uploadData: null }
  showDrawer = () => {
    this.setState({
      visible: true
    })
  }
  onClose = () => {
    this.setState({
      visible: false,
      disabled: true,
      uploadData: null
    })
  }
  reload = () => {
    this.table.current.reload()
  }
  apiRequest = (params, columns) => {
    return new Promise(async (resolve) => {
      let regExFilters = _.map(columns, x => x.key)
      let data = await Request.getAllInstitution({ ...params, regExFilters })
      resolve(data)
    })
  }
  uploadCSVRequest = () => {
    return new Promise(async (resolve) => {

      let { uploadData } = this.state
      let type = 'institution'

      await Request.csvUpload({ uploadData, type })
      notification.success({ message: 'New Data Uploaded', description: 'Reload to view' })

      this.setState({
        disabled: true,
        uploadData: null
      })

      resolve()
    })
  }
  delete = async ({ id }) => {

    this.setState({ loading: true })

    await Request.deleteInstitution({ id })

    this.setState({ loading: false })

    this.reload()

    notification.success({
      message: 'Deleted Successfully',
      duration: 20,
      key: `${id}-close`
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
        title: 'Name',
        key: 'name',
        sorter: true,
        dataIndex: 'name',
        searchTextName: 'name',
        filterRegex: true,
        fixed: 'left',
        width: 150
      },
      {
        dataIndex: 'institutioncontact',
        key: 'institutioncontact',
        searchTextName: 'institutioncontact',
        filterRegex: true,
        title: 'Institution Contact'
      },
      {
        dataIndex: 'institutioncontactphone',
        key: 'institutioncontactphone',
        searchTextName: 'institutioncontactphone',
        filterRegex: true,
        title: 'Institution Contact Phone'
      },
      {
        dataIndex: 'institutioncontactemail',
        key: 'institutioncontactemail',
        searchTextName: 'institutioncontactemail',
        filterRegex: true,
        title: 'Institution Contact email'
      },
      {
        dataIndex: 'companyemail',
        key: 'companyemail',
        searchTextName: 'companyemail',
        filterRegex: true,
        title: 'Company Email'
      },
      {
        dataIndex: 'stocksymbol',
        key: 'stocksymbol',
        searchTextName: 'stocksymbol',
        filterRegex: true,
        title: 'Stock Symbol'
      },
      {
        dataIndex: 'companyphone',
        key: 'companyphone',
        searchTextName: 'companyphone',
        filterRegex: true,
        title: 'Company Phone'
      },
      {
        dataIndex: 'companyfax',
        key: 'companyfax',
        searchTextName: 'companyfax',
        filterRegex: true,
        title: 'Company Fax'
      },
      {
        dataIndex: 'companyurl',
        key: 'companyurl',
        searchTextName: 'companyurl',
        filterRegex: true,
        title: 'Company Url'
      },
      {
        dataIndex: 'companyaddress1',
        key: 'companyaddress1',
        searchTextName: 'companyaddress1',
        filterRegex: true,
        title: 'Company Address 1'
      },
      {
        dataIndex: 'companyaddress2',
        key: 'companyaddress2',
        searchTextName: 'companyaddress2',
        filterRegex: true,
        title: 'Company Address2'
      },
      {
        dataIndex: 'companycity',
        key: 'companycity',
        searchTextName: 'companycity',
        filterRegex: true,
        title: 'Company City'
      },
      {
        dataIndex: 'companystate',
        key: 'companystate',
        searchTextName: 'companystate',
        filterRegex: true,
        title: 'Company State'
      },
      {
        dataIndex: 'companyzipcode',
        key: 'companyzipcode',
        searchTextName: 'companyzipcode',
        filterRegex: true,
        title: 'Company Zip Code'
      },
      {
        dataIndex: 'companycountry',
        key: 'companycountry',
        searchTextName: 'companycountry',
        filterRegex: true,
        title: 'Company Country'
      },
      {
        dataIndex: 'companytype',
        key: 'companytype',
        searchTextName: 'companytype',
        filterRegex: true,
        title: 'Company Type'
      },
      {
        dataIndex: 'companydescription',
        key: 'companydescription',
        searchTextName: 'companydescription',
        filterRegex: true,
        title: 'Company Description'
      },
      {
        dataIndex: 'companysize',
        key: 'companysize',
        searchTextName: 'companysize',
        filterRegex: true,
        title: 'Company Size'
      },
      {
        dataIndex: 'addmetrxcompellingevent',
        key: 'addmetrxcompellingevent',
        searchTextName: 'addmetrxcompellingevent',
        filterRegex: true,
        title: 'Addmetrx Compelling Event'
      },
      {
        dataIndex: 'companysubmissionstage',
        key: 'companysubmissionstage',
        searchTextName: 'companysubmissionstage',
        filterRegex: true,
        title: 'Company Submission Stage'
      },
      {
        dataIndex: 'companymarketcap',
        key: 'companymarketcap',
        searchTextName: 'companymarketcap',
        filterRegex: true,
        title: 'Companymarket Cap'
      },
      {
        dataIndex: 'numberofemployees',
        key: 'numberofemployees',
        searchTextName: 'numberofemployees',
        filterRegex: true,
        title: 'Number of Employees'
      },
      {
        dataIndex: 'annualrevenue',
        key: 'annualrevenue',
        searchTextName: 'annualrevenue',
        filterRegex: true,
        title: 'Annual Revenue'
      },
      {
        dataIndex: 'lifecyclestage',
        key: 'lifecyclestage',
        searchTextName: 'lifecyclestage',
        filterRegex: true,
        title: 'Lifecycle Stage',
        width: 100
      },
      {
        key: 'actions',
        title: 'Actions',
        width: 100,
        fixed: 'right',
        render: (val) => {

          return <div>

            <Tooltip title="Edit Details">
              <Button shape="circle" onClick={() => {
                dispatch(getPushPathWrapper('institution.edit', { id: val._id }))
              }} icon="edit"/>
            </Tooltip>

            <Tooltip title="Edit Details">
              <Button type="danger" shape="circle" icon="delete" onClick={() => {
                this.delete({ id: val._id })
              }}/>
            </Tooltip>

          </div>

        }
      }
    ]

    const uploadprops = {
      name: 'file',
      action: `${apiUrl}/filesUploader`,
      onChange: (info) => {
        if (info.file.status === 'done') {
          notification.success({ message: `${info.file.name} file uploaded successfully` })
          this.setState({
            disabled: false,
            uploadData: info
          })
        } else if (info.file.status === 'error') {
          notification.error({ message: `${info.file.name} file upload failed.` })
          this.setState({
            disabled: true,
            uploadData: null
          })
        }
      }
    }

    return (
      <PageHeaderWrapper
        title={'All Institution / Company'}>

        <Card bordered={true}>

          <div style={{ marginBottom: 20 }}>
            <Button type="primary" onClick={() => {
              this.setState({
                visible: !visible
              })

            }}>Upload CSV</Button>
          </div>

          <TableComp ref={this.table} columns={columns} extraProps={{ scroll: { x: 3000 }, loading }}
                     apiRequest={(params) => this.apiRequest(params, columns)}/>
        </Card>

        <Drawer
          title="Upload Institution / Company CSV "
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >

          <div className={styles.drawerWrapper}>
            <Upload {...uploadprops}>
              <Button>
                <Icon type="upload"/> Click to Upload
              </Button>
            </Upload>

            <Button type={'primary'}
                    onClick={() => {
                      this.uploadCSVRequest()
                    }}
                    disabled={disabled} style={{ marginTop: 20 }}>
              Import CSV
            </Button>
            <Button type={'danger'} onClick={this.onClose} style={{ marginTop: 20, marginLeft: 8 }}>
              Close
            </Button>

          </div>

        </Drawer>

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
