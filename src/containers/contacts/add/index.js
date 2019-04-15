import React, {PureComponent} from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
    Form,
    Input,
    DatePicker,

    Select,
    Button,
    Card,
    Icon,
    notification
} from 'antd'
import _ from 'lodash'
import moment from 'moment'
import {FormUtils as GetAllFormFields} from 'sz-react-utils'

import {hideLoader, showLoader} from '../../../modules/actions'
import Request from '../../../request'
import {connect} from 'react-redux'
import {createMatchSelector} from 'connected-react-router'
import {getUrlParams} from '../../../routes'

const Option = Select.Option;
const Search = Input.Search;

@Form.create()
class AddInstitution extends PureComponent {

    state = {
        id: null
    }

    handleSubmit = e => {
        const {dispatch, form} = this.props
        const {id} = this.state
        e.preventDefault()
        form.validateFieldsAndScroll(async (err, valData) => {
            if (!err) {

                dispatch(showLoader())

                let x = null
                if (!!id) {
                    x = await Request.editInstitution(valData, {id})
                } else {
                    x = await Request.addInstitution(valData)
                }

                dispatch(hideLoader())

                if (!x.error) {
                    notification.success({
                        message: 'Added successfully'
                    })
                    this.props.form.resetFields()
                } else {
                    notification.error({
                        message: 'Error Saving',
                        description: x.message
                    })
                }

            }
        })
    }


    render() {
        let inputTypes = {

            fields: [

                {
                    prefixComp: <h3>Contact Details</h3>,
                    key: 'firstName', placeholder: 'Enter your firstName'
                },
                {key: 'lastName', placeholder: 'Enter your lastName'},
                {key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Please enter your email'},
                {key: 'password', label: 'Password', required: true},
                {key: 'mobile', label: 'Mobile', required: true},
                {key: 'dob', label: 'Date of birth', type: 'date'},
                {key: 'address', label: 'Address'},
                {key: 'website', label: 'Website', required: true, placeholder: 'Please enter your website'},

            ],

        }


        const {
            form: {getFieldDecorator, getFieldValue}
        } = this.props


        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
                md: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
                md: {span: 12}
            }
        }

        const submitFormLayout = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 10, offset: 7},
                md: {span: 12, offset: 8}
            }
        }


        return (
            <PageHeaderWrapper
                title={'Add New Contact '}

            >

                <Card bordered={true}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>

                        <GetAllFormFields inputSchema={inputTypes} formItemLayout={formItemLayout}
                                          getFieldDecorator={getFieldDecorator}/>

                        <Form.Item {...submitFormLayout} style={{marginTop: 32}}>
                            <Select defaultValue="Delhi" style={{width: 120, marginRight: 32}}
                                    onChange={this.handleSubmit}>
                                <Option value="Haryana">Haryana</Option>
                                <Option value="chandigarh">chandigarh</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select >
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{width: 200}}
                            />
                            <br /><br />
                            <Button type="primary" htmlType="submit" loading={this.props.loading}>
                                SAVE
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>

            </PageHeaderWrapper>
        )
    }
}

const mapStateToProps = ({global, router}) => ({
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
)(AddInstitution)
