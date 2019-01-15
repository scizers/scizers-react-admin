import React, { Component } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Table,
  Badge,
  Card,
  Tooltip,
  notification,
  Switch,
  Input, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import Highlighter from 'react-highlight-words'
import styles from './styles.less'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
import update from 'immutability-helper'
import { getUrlPushWrapper } from '../../../routes'

class AllWebsites extends Component {

  state = {
    data: [],
    pagination: {},
    loading: false,
    searchText: '',
    dataSearchParams: {}
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
    this.fetch2({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    })
  }
  fetch = async (params = {}) => {
    this.setState({
      loading: true,
      dataSearchParams: params
    })
    let data = await Request.getWebsites({ ...params })
    let pagination = { ...this.state.pagination }
    pagination.total = data.count
    this.setState({
      loading: false,
      data: data.data,
      pagination
    })
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: (pro) => {
      let {
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      } = pro

      return (<div className={styles.filterDropdown}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>)
    },
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  })
  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }
  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  constructor (props) {
    super(props)
    this.fetch2 = memoizeOne(this.fetch)
  }

  toogleEnabled = async ({ urlSlug }) => {

    let { data: d } = this.state
    let x = _.findIndex(d, { urlSlug })

    let data = update(d, {
      [x]: {
        rowLoading: { $set: true }
      }
    })

    this.setState({ data })

    await Request.toggleWebsiteEnabled({ urlSlug })

    data = update(d, {
      [x]: {
        enabled: { $set: !d[x].enabled },
        rowLoading: { $set: false }
      }
    })
    this.setState({ data })


    //  enabled: { $set: false },


  }

  deleteWebsite = async ({ urlSlug }) => {

    let { data: d } = this.state
    let x = _.findIndex(d, { urlSlug })

    let data = update(d, {
      [x]: {
        deleteLoading: { $set: true }
      }
    })
    this.setState({ data })

    await Request.deleteWebsite({ urlSlug })

    data = update(d, { $splice: [[x, 1]] })
    this.setState({ data })

    notification.success({
      message: 'Website Deleted Successfully',
      duration: 20,
      key: `${urlSlug}-close`,
      btn: <Button onClick={async () => {
        await Request.undoDeleteWebsite({ urlSlug })
        this.fetch2(this.state.dataSearchParams)
        notification.close(`${urlSlug}-close`)
      }}>Undo Delete</Button>

    })

  }

  componentDidMount () {
    this.fetch2()
  }

  render () {
    const { categories, dispatch } = this.props
    const columns = [
      {
        title: 'Website Url',
        width: 300,
        dataIndex: 'url',
        key: 'url',
        // fixed: 'left',
        sorter: true,
        ...this.getColumnSearchProps('url')
      },
      {
        title: 'Category',
        width: 200,
        sorter: true,
        dataIndex: 'category',
        key: 'category',
        render: cat => {
          return cat
        },
        filters: categories.map((item) => {
          return { text: item, value: item }
        })
      },
      {
        title: 'Tags',
        width: 100,
        dataIndex: 'tags',
        key: 'tags',
        render: cat => {
          return cat.join(', ')
        }
      },
      {
        title: 'Logo Bg Color',
        width: 100,
        dataIndex: 'logoBgColor',
        key: 'logoBgColor',
        render: cat => {
          return <div style={
            {
              backgroundColor: cat,
              color: Color(cat).isDark() ? 'white' : 'black',
              padding: '2px 5px',
              border: '1px #c1c1c1 solid'
            }
          }>{cat}</div>
        }
      },
      {
        title: 'Base Color',
        width: 100,
        dataIndex: 'baseColor',
        key: 'baseColor',
        render: cat => {
          return <div style={
            {
              backgroundColor: cat,
              color: Color(cat).isDark() ? 'white' : 'black',
              padding: '2px 5px',
              border: '1px #c1c1c1 solid'
            }
          }>{cat}</div>
        }
      },
      {
        title: 'Enabled',
        width: 100,
        render: val => {
          return <React.Fragment>
            <Switch checkedChildren={<Icon type="check"/>}
                    unCheckedChildren={<Icon type="close"/>}
                    checked={val.enabled}
                    loading={val.rowLoading}
                    onChange={() => {
                      this.toogleEnabled({ urlSlug: val.urlSlug })
                    }}/>
          </React.Fragment>
        }
      },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: val => (<React.Fragment>
            <Tooltip title="Edit Details">
              <Button className={styles.btn}
                      shape="circle" onClick={() => {
                dispatch(getUrlPushWrapper('websites.edit', { slug: val.urlSlug }))
              }} icon="edit"/>
            </Tooltip>

            <Tooltip title="Edit Screenshot">
              <Button className={styles.btn}
                      onClick={() => {
                        dispatch(getUrlPushWrapper('websites.screenshots', { slug: val.urlSlug }))
                      }}
                      shape="circle" icon="snippets"/>
            </Tooltip>

            <Tooltip title="Delete Domain">
              <Button className={styles.btn}
                      loading={val.deleteLoading}
                      onClick={() => {
                        this.deleteWebsite({ urlSlug: val.urlSlug })
                      }}
                      type="danger" shape="circle" icon="delete"/>
            </Tooltip>
          </React.Fragment>
        )
      }
    ]
    return (
      <PageHeaderWrapper
        title={'All Websites'}>

        <Card bordered={true}>
          <Table
            bordered
            columns={columns}
            scroll={{ x: _.sumBy(columns, d => d.width) }}
            rowKey={record => record._id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}

          />
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
)(AllWebsites)
