import React, {Component} from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
    Drawer,
    Popconfirm,
    Card,
    Tooltip,
    notification,
    Empty,
    Select,
    Upload, Button, Icon
} from 'antd'
import Request from '../../../request'
import Color from 'color'
import _ from 'lodash'
import {connect} from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'
import List from '../add/index'

import {apiUrl} from '../../../settings'

// import {TableComp} from 'sz-react-utils'
import TableComp from '../../../components/_utils/table'
import {getPushPathWrapper} from '../../../routes'
// import Option from "react-draft-wysiwyg/src/components/Option/index";

const Option = Select.Option


class AllFuelType extends Component {

    state = {
        visible: false,
        loading: false,
        disabled: true,
        uploadData: null,
        allModels: [],
        allFuel: [],
        allMakes: [],
        make: '',
        model: '',
        fuel: ''
    }

    reload = () => {
        this.table.current.reload()
    }

    deleteFuels = async (data) => {
        console.log(data, "payal")
        this.setState({loading: true})

        await Request.deleteFuel(data)

        this.setState({loading: false})

        this.reload()

        notification.success({
            message: 'Deleted Successfully',
            duration: 20,
            key: `${data.val._id}-close`
        })

    }

    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    async componentWillMount() {

        let {data: allMakes} = await Request.getAllMakes()

        this.setState({
            allMakes
        })

    }

    render() {

        const {dispatch} = this.props
        const {visible, disabled, loading, allMakes, allModels, model, fuel, make} = this.state
        const columns = [
            {
                title: 'Name',
                key: 'name',
                sorter: true,
                dataIndex: 'fuelName',
                searchTextName: 'name',
                filterRegex: true
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
                                dispatch(getPushPathWrapper('fuel.editFuel', {
                                    id: val._id,
                                    makeId: make,
                                    modelId: model
                                }))
                            }} icon="edit"/>
                        </Tooltip>
                        <Tooltip title="Edit Details">
                            <Popconfirm title="Are you sure delete this task?" onConfirm={() => {

                                this.deleteFuels({val, make, model})
                            }} onCancel={() => {
                                console.log()
                            }} okText="Yes" cancelText="No">
                                <Button type="danger" shape="circle" icon="delete"/>
                            </Popconfirm>,


                        </Tooltip>

                    </div>

                }
            }
        ]


        return (
            <PageHeaderWrapper
                title={'All Makes'}>

                <Card bordered={true}>

                    <div>
                        <Select value={this.state.make} style={{width: 200}} onChange={(make) => {
                            this.setState({make: make.toString()})
                            Request.getAllModels({make})
                                .then(({data}) => {
                                    this.setState({
                                        allModels: data.model,
                                        loading: false
                                    })
                                })

                        }} className="form-control">

                            {allMakes.map((val, index) => {
                                return <Option key={index} value={val._id}>{val.make}</Option>
                            })}

                        </Select>
                    </div>
                    <div>
                        <Select value={this.state.model} style={{width: 200}} onChange={(model) => {
                            this.setState({model: model.toString()})
                            Request.getAllFuels({model, make})
                                .then(({data}) => {
                                    this.setState({
                                        allFuel: data.fuelTypes,
                                        loading: false
                                    })
                                })

                        }} className="form-control">
                            {allModels.map((val, index) => {
                                return <Option key={index} value={val._id}>{val.carModel}</Option>
                            })}

                        </Select>
                    </div>
                    {this.state.model ? <TableComp ref={this.table}
                                                   columns={columns}
                                                   loading={this.state.loading}
                                                   dataSource={this.state.allFuel}/> : <Empty/>}

                </Card>

            </PageHeaderWrapper>)

    }

}


const mapStateToProps = ({global}) => ({
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
)(AllFuelType)