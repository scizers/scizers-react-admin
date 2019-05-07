import React, { Component, PureComponent } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
// import { TableComp } from 'sz-react-utils'
import {
  Table,
  Card,
  Tooltip,
  Drawer,
  notification, Row, Col, Select,
  Switch,
  Input, Button, Icon
} from 'antd'
import Request from '../../request'
import Color from 'color'
import _ from 'lodash'
import styles from './styles.less'
import { connect } from 'react-redux'
import { getPushPathWrapper, getUrlParams, getUrlPushWrapper } from '../../routes'
import { Form } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../modules/actions'
import moment from 'moment/moment'
// import { FormUtils } from 'sz-react-utils'
import FormUtils from '../../components/_utils/formUtils'
import TableComp from '../../components/_utils/table'

const Option = Select.Option

class BudgetContacts extends Component {

  state = {
    columns: [],
    dataSource: [],
    visible: false,
    loading: true,
    editAdvisoryBoard: false,
    edit: false,
    changes: []
  }

  constructor (props) {
    super(props)
    this.table = React.createRef()
  }

  componentDidMount () {

    let data = getUrlParams('budgetspeaker', this.props.pathname)

    if (!!data && data.type) {
      this.setState({
        type: data.type
      })
      this.apiRequest2(data.type)
    }

  }

  apiRequest2 = async (type) => {

    this.setState({
      loading: true
    })

    let data = await Request.getBudgetGroups(type)

    this.setState({
      dataSource: data.data,
      loading: false
    })

  }

  render () {

    const { loading, visible, dataSource, editAdvisoryBoard, type } = this.state
    const { dispatch } = this.props
    const Edit = editAdvisoryBoard


    const columns = [
      {
        rowKey: 'name',
        key: 'name',
        dataIndex: 'name',
        title: 'Name'
      },
      {
        rowKey: 'honorarium',
        key: 'honorarium',
        dataIndex: 'counts',
        title: 'Total Honorarium',
        render: (val) => {
          return <span>{val.honorarium}</span>
        }
      },
      {
        rowKey: 'tiers',
        key: 'tiers',
        dataIndex: 'counts',
        title: 'Tiers',
        render: (val) => {
          return <React.Fragment>
            {val.tiers.map((v, key) => {
              return <div className={styles.tiers} key={key}>
                <span>{v.name}</span>
                <span>{v.count}</span>
              </div>

            })}
          </React.Fragment>
        }
      }
    ]


    return (
      <PageHeaderWrapper title={'Budget Group Details'}>

        <Card bordered={true}>

          <Row>
            <Col style={{ textAlign: 'right', marginBottom: 10 }}>

              <Tooltip title="View Details">
                <Button onClick={() => {
                  dispatch(getPushPathWrapper(`${type}all`))
                }} icon="link">Details</Button>
              </Tooltip>

            </Col>
          </Row>

          <Table
            reloadButon={false}
            rowKey={record => record._id}
            bordered
            loading={loading}
            pagination={{
              showSizeChanger: false,
              defaultPageSize: 100,
              pageSizeOptions: ['10', '20', '50', '100', '1000']
            }}
            ref={this.table}
            columns={columns}
            dataSource={dataSource}


          />

        </Card>


      </PageHeaderWrapper>
    )

  }
}


const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
  categories: global.categories,
  pathname: router.location.pathname,
  router
})


const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetContacts)
