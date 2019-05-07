import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  notification,
  Button,
  Card,
  Icon
} from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { FormUtils as GetAllFormFields } from 'sz-react-utils'
import { matchPath } from 'react-router-dom'
import { goBack } from 'connected-react-router'

import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'
import { getUrlParams } from '../../../routes'

@Form.create()
class AddBudget extends PureComponent {

  state = {
    id: null,
    inputTypes: {
      fields: [
        {
          label: 'Tactic Name',
          key: 'tactic',
          required: true
        },
        {
          key: 'allocatedBudget',
          required: true,
          type: 'number'
        },
        {
          key: 'actualBudget',
          required: true,
          type: 'number'
        },
        {
          key: 'format',
          type: 'textArea'
        }, {
          key: 'objective',
          type: 'textArea'
        },
        {
          key: 'comments',
          type: 'textArea'
        },
        {
          key: 'order',
          type: 'Number'
        }

      ]
    }

  }

  handleSubmit = e => {
    const { dispatch, form } = this.props
    const { id } = this.state
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        dispatch(showLoader())

        let x = null
        if (!!id) {
          x = await Request.editBudget(id, valData)
        } else {
          x = await Request.addBudget(valData)
        }

        dispatch(hideLoader())

        if (!x.error) {
          notification.success({
            message: 'Added successfully'
          })

          if (id) {
            dispatch(goBack())
          }


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

  setFormValues = async (id) => {

    const { dispatch, form } = this.props

    dispatch(showLoader())

    let { error, data } = await Request.getSingleBudget(id)
    if (error) {
      notification.error({
        message: 'Error Loading Data'
      })
    } else {
      form.setFieldsValue(data)
    }
    dispatch(hideLoader())
  }

  constructor (props) {
    super(props)

  }

  componentDidMount () {

    let data = getUrlParams('settings.editBudget', this.props.pathname)

    if (!!data && data.id) {
      this.setState({
        id: data.id
      })
      this.setFormValues(data.id)

    }

  }

  render () {

    const { submitting } = this.props
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props


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
        title={'Add Budget Tactics'}
      >

        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <GetAllFormFields inputSchema={this.state.inputTypes} formItemLayout={formItemLayout}
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
)(AddBudget)
