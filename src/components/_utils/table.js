import React, { Component } from 'react'
import {
  Table,
  Input, Button, Icon
} from 'antd'
import Color from 'color'
import _ from 'lodash'
import Highlighter from 'react-highlight-words'
import memoizeOne from 'memoize-one'

class TableComp extends Component {

  state = {
    data: [],
    columns: [],
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

    let data = await this.props.apiRequest({ ...params, regExFilters: ['name', 'email'] })
    // let data = await Request.getAllUser({ ...params, regExFilters: ['name', 'email'] })

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

      return (<div className={{
        padding: '8px',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, .15)'
      }
      }>
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
    render: (text) => {
      return (
        <React.Fragment>
          {!!text ? (<Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />) : null}
        </React.Fragment>
      )
    }
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

  componentDidMount () {

    let x = []
    _.each(this.props.columns, (i) => {


      if (i.searchTextName) {
        i = { ...this.getColumnSearchProps(i.searchTextName), ...i }
      }
      x.push(i)

    })

    this.setState({
      columns: x
    })

    this.fetch2()
  }

  render () {
    const { columns } = this.state

    return (
      <Table
        bordered
        columns={columns}
        rowKey={record => record._id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />)

  }
}

export default TableComp