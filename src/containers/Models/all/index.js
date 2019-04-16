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

import {TableComp} from 'sz-react-utils'
import {getPushPathWrapper} from '../../../routes'
// import Option from "react-draft-wysiwyg/src/components/Option/index";

const Option = Select.Option


class AllModel extends Component {

    state = {visible: false, loading: false, disabled: true, uploadData: null, allMakes: [], make: ''}

    reload = () => {
        this.table.current.reload()
    }

    apiRequest = (params, columns) => {
        return new Promise(async (resolve) => {
            let regExFilters = _.map(columns, x => x.key)
            let data = await Request.getAllModels({make: this.state.make})
            console.log(data)
            resolve(data)
            // {
            //     this.state.allMakes.map((allMakes, index) => {
            //         console.log(allMakes._id, index)
            //     })
            // }

            // console.log(this.state.allMakes)


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

    async componentWillMount() {

        let {data: allMakes} = await Request.getAllMakes()

        this.setState({
            allMakes
        })

    }

    render() {

        const {dispatch} = this.props
        const {visible, disabled, loading, allMakes} = this.state
        const columns = [
            {
                title: 'Name',
                key: 'name',
                sorter: true,
                dataIndex: 'make',
                searchTextName: 'name',
                filterRegex: true,
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
                                dispatch(getPushPathWrapper('makesandmodels.editMake', {id: val._id}))
                            }} icon="edit"/>
                        </Tooltip>

                        <Tooltip title="Edit Details">
                            <Popconfirm title="Are you sure delete this task?" onConfirm={() => {
                                this.deleteMakes(val)
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

        console.log('adf')

        return (
            <PageHeaderWrapper
                title={'All Makes'}>

                <Card bordered={true}>

                    <div>
                        <Select value={this.state.make} style={{width: 200}} onChange={(make) => {

                            console.log(make)
                            this.setState({make: make.toString()})

                        }} className="form-control">

                            {allMakes.map((val, index) => {
                                return <Option key={index} value={val._id}>{val.make}</Option>;
                            })}

                        </Select>
                    </div>

                    {this.state.make ? <TableComp ref={this.table} columns={columns} extraProps={{loading}}
                                                  apiRequest={(params) => this.apiRequest(params, columns)}/> :
                        <Empty />}

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
)(AllModel)
