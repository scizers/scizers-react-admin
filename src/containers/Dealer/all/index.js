import React, {Component} from 'react'
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
import moment from 'moment'
import {connect} from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'

import {apiUrl} from '../../../settings'

// import { TableComp } from 'sz-react-utils'
import TableComp from '../../../components/_utils/table'
import {getPushPathWrapper, getUrlParams} from '../../../routes'

class AllInstitution extends Component {

    state = {visible: false, loading: true, disabled: true, uploadData: null, totalDealers: "", dealerId: ''}


    reload = () => {
        this.table.current.reload()
    }
    apiRequest = (params, columns, dealerId) => {
        return new Promise(async (resolve) => {
            let regExFilters = _.map(columns, x => x.key)
            let data = null
            if (!!dealerId) {
                data = await Request.dealerFavDealer(dealerId)
                data.data = data.dealers
            } else {
                data = await Request.getAllDealers({...params, regExFilters})
            }
            this.setState({totalDealers: data.total})
            resolve(data)
        })
    }


    deleteMakes = async ({_id}) => {

        this.setState({loading: true})

        await Request.deleteMake({_id})

        this.setState({loading: false})

        this.reload()

        notification.success({
            message: 'Deleted Successfully',
            duration: 20,
            key: `${_id}-close`
        })

    }


    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    async componentDidMount() {
        let data = await getUrlParams('dealers.listDealer', this.props.pathname)
        if (data && data.id) {
            this.setState({
                dealerId: data.id,
                loading: false
            })
        } else {
            this.setState({
                loading: false
            })
        }


    }


    render() {
        const {dispatch} = this.props
        const {visible, disabled, loading, dealerId} = this.state
        const columns = [

            {
                title: 'Dealer Name',
                key: 'dealershipName',
                sorter: true,
                dataIndex: 'dealershipName',
                searchTextName: 'dealershipName',
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
                title: 'contactName',
                key: 'contactName',
                sorter: true,
                dataIndex: 'contactName',
                searchTextName: 'name',
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
                sorter: false,
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
                filterRegex: true,
                render: (val, record) => {
                    return (<div>{record.createdAt ? moment(record.createdAt).format('DD-MMM-YYYY') : ''}</div>)
                }
            },
            {
                title: 'totalSavedCars',
                key: 'totalSavedCars',
                sorter: true,
                dataIndex: 'saveCarCount',
                searchTextName: 'savedCars',
                filterRegex: true
            },
            {
                title: 'favouriteDealer',
                key: 'favouriteDealer',
                sorter: true,
                dataIndex: 'favouriteDealer',
                searchTextName: 'favouriteDealer',
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
                                dispatch(getPushPathWrapper('cars.dealercars', {id: val._id}))
                            }} icon="edit"/>
                        </Tooltip>
                        <Tooltip title="list Requirement Details">
                            <Button shape="circle" onClick={() => {
                                dispatch(getPushPathWrapper('requirements.dealerRequirements', {id: val._id}))
                            }} icon="edit"/>
                        </Tooltip>


                        <Tooltip title="list Favourite Dealer">
                            <Button shape="circle" onClick={() => {
                                dispatch(getPushPathWrapper('dealers.listDealer', {id: val._id}))
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
                title={`All Dealers : ${this.state.totalDealers}`}>

                <Card bordered={true}>
                    {!loading && <TableComp ref={this.table} columns={columns} extraProps={{loading, scroll: {x: 1000}}}
                                            apiRequest={(params) => this.apiRequest(params, columns, dealerId)}/> }
                </Card>

            </PageHeaderWrapper>)

    }

}


const mapStateToProps = ({global, router}) => ({
    categories: global.categories,
    pathname: router.location.pathname,
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