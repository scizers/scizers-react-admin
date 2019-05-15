import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  notification,
  Button,
  Card,
  InputNumber,
  Row, Col,
  Input,
  Icon
} from 'antd'
import _ from 'lodash'
import moment from 'moment'
import GetAllFormFields from '../../../components/_utils/formUtils'
// import { FormUtils as GetAllFormFields } from 'sz-react-utils'
import { matchPath } from 'react-router-dom'
import { goBack } from 'connected-react-router'

import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'
import { getUrlParams } from '../../../routes'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


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
          key: 'order',
          type: 'number'
        },
        {
          key: 'totalPool',
          type: 'number'
        }

      ]
    },
    extraData: [{
      name: '',
      value: 0,
      desc: ''
    }]
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

          // this.props.form.resetFields()

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
      this.setState({
        extraData: data.customItems
      }, () => {

        setTimeout(() => {
          form.setFieldsValue(data)
        }, 200)

      })
    }
    dispatch(hideLoader())
  }

  constructor (props) {
    super(props)

  }

  addNewField = () => {

    let x = _.clone(this.state.extraData)

    x.push({
      name: '',
      value: 0,
      desc: ''
    })

    this.setState({
      extraData: x
    })

  }
  removeNewField = (key) => {

    let x = _.clone(this.state.extraData)

    x = _.remove(x, (k, i) => {
      return i === key
    })

    this.setState({
      extraData: x
    })

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

    const { extraData } = this.state
    const {
      submitting,
      form: { getFieldDecorator, getFieldValue, getFieldProps, setFieldsValue }
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


            {extraData.map((val, key) => {

              return <div className={'extraData'} key={key}>

                <Row>
                  <Col span={8}>
                    <Form.Item style={{ textAlign: 'right' }}>
                      {getFieldDecorator(`customItems[${key}].name`, {
                        rules: [{ required: true, message: 'Please add name of field' }]
                      })(
                        <Input placeholder={'Item Name'} style={{ width: 200, marginRight: 10 }}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator(`customItems[${key}].value`)(
                        <InputNumber placeholder={'Amount'} style={{ width: 200 }}/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}></Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator(`customItems[${key}].desc`, {
                        valuePropName: 'data',
                        getValueFromEvent: (e, editor) => {
                          return editor.getData()
                        }
                      })(
                        <CKEditor
                          editor={ClassicEditor}
                        />
                      )}
                    </Form.Item>
                  </Col>

                </Row>

              </div>
            })}

            <Row>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="dashed"
                        style={{ margin: 8 }}
                        shape={'circle'}
                        icon={'plus-circle'}
                        onClick={() => {
                          this.addNewField()
                        }}/>

              </Col>
            </Row>


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
