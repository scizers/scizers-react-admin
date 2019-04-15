import React, {Component} from 'react'
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
import {connect} from 'react-redux'
//import styles from './styles.less'
import update from 'immutability-helper'

import {apiUrl} from '../../../settings'
import table from '../../../components/_utils/tableList'

import {TableComp} from 'sz-react-utils'
import {getPushPathWrapper} from '../../../routes'

class AllInstitution extends Component {

    state = {visible: false, loading: false, disabled: true, uploadData: null}


    reload = () => {
        this.table.current.reload()
    }
    apiRequest = (params, columns) => {
        return new Promise(async (resolve) => {
            let regExFilters = _.map(columns, x => x.key)
            let data = await Request.getAllMakes({...params, regExFilters})
            resolve(data)
        })
    }

    delete = async ({id}) => {

        this.setState({loading: true})

        await Request.deleteInstitution({id})

        this.setState({loading: false})

        this.reload()

        notification.success({
            message: 'Deleted Successfully',
            duration: 20,
            key: `${id}-close`
        })

    }

    constructor(props) {
        super(props)
        this.table = React.createRef()
    }

    render() {
        const {dispatch} = this.props
        const {visible, disabled, loading} = this.state
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
                                dispatch(getPushPathWrapper('institution.edit', {id: val._id}))
                            }} icon="edit"/>
                        </Tooltip>

                        <Tooltip title="Edit Details">
                            <Button type="danger" shape="circle" icon="delete" onClick={() => {
                                this.delete({id: val._id})
                            }}/>
                        </Tooltip>

                    </div>

                }
            }
        ]


        return (
            <PageHeaderWrapper
                title={'All Makes'}>

                <Card bordered={true}>
                    <TableComp ref={this.table} columns={columns} extraProps={{loading}}
                               apiRequest={(params) => this.apiRequest(params, columns)}/>
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
)(AllInstitution)
