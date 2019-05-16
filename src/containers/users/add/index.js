import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Icon
} from 'antd'
import { ChromePicker } from 'react-color'
import _ from 'lodash'
import moment from 'moment'
import { FormUtils as GetAllFormFields } from 'sz-react-utils'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { notification } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'

// inputSchema.fields

let inputTypes = {
  fields: [
    {
      label: 'Full Name',
      key: 'name',
      required: true
    },
    {
      label: 'Email',
      key: 'email',
      required: true
    },
    {
      label: 'Password',
      key: 'password',
      required: true
    }]
}

const FormItem = Form.Item
const { Option } = Select

@Form.create()
class AddWebsite extends PureComponent {

  handleSubmit = e => {
    const { dispatch, form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        dispatch(showLoader())

        let x = await Request.addUser(valData)

        dispatch(hideLoader())

        if (!x.error) {
          notification.success({
            message: 'Users added successfully'
          })
          this.props.form.setFieldsValue({})

        } else {
          notification.error({
            message: 'Error Saving',
            description: x.message
          })
        }

      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {}


  }

  componentDidMount () {


  }

  render () {

    const { submitting } = this.props
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props

    const { editorState } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 }
      }
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        md: { span: 12, offset: 8 }
      }
    }

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    }
    const handleChange = () => {

    }

    return (
      <PageHeaderWrapper
        title={'Add User'}
      >

        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <GetAllFormFields inputSchema={inputTypes} formItemLayout={formItemLayout}
                              getFieldDecorator={getFieldDecorator}/>

            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
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

const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
  categories: global.categories,
  search: router.location.search
})
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWebsite)
