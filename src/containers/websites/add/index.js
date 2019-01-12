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
// import { push } from 'connected-react-router'
import _ from 'lodash'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { notification } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'

const FormItem = Form.Item
const { Option } = Select
// const { RangePicker } = DatePicker
// const { TextArea } = Input

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}


@Form.create()
class AddWebsite extends PureComponent {

  handleSubmit = e => {
    const { dispatch, form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        let values = _.clone(valData)

        _.each(values, (val, key) => {
          if (key === 'baseColor' || key === 'logoBgColor') {
            values[key] = val.hex
          }
        })

        dispatch(showLoader())

        let x = await Request.addWebsite(values)

        dispatch(hideLoader())

        if (!x.error) {

          console.log(x)

          // dispatch(push('/dashboard'))

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
    this.state = {
      editorState: '<div \n' +
      '                        \n' +
      '                        \n' +
      '                        <h1>Bulb fox</h1>\n' +
      '                        <h5>The client</h5>\n' +
      '                        <p>We focus on creating highly intuitive, usable and impactful digital products and services. Ideas is seamlessly integrated into our design process to produce the most effective, elegant and engaging work.</p>\n' +
      '                        <h5>The objective</h5>\n' +
      '                        <p>Ideas is seamlessly integrated into our design process to produce the most effective, elegant and engaging work.</p>\n' +
      '                        <h5>The solution</h5>\n' +
      '                        <p>We reimagined deas is seamlessly integrated into our design process to produce the most effective, elegant and engaging work.By using a combination of sketching, 3-D modeling, rapid prototyping, user testing and analytics analysis, we’re able to continuously grow and improve upon a given product. We focus most effective, elegant and engaging work on creating highly intuitive, usable and impactful digital products and services.</p>\n' +
      '                        \n' +
      '                        \n' +
      '                        \n' +
      '                        \n' +
      '                        \n' +
      '                        \n' +
      '                        \n' +
      '                    </div>',

      extraFeilds: 2

    }
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
        title={'Add New Website'}
        content={'This is some descopt '}
      >

        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <FormItem {...formItemLayout} label={'URL'}>
              {getFieldDecorator('url', {
                rules: [
                  {
                    required: true,
                    message: 'website url is required'
                  }
                ]
              })(<Input placeholder="https://example.com"/>)}
            </FormItem>

            <FormItem {...formItemLayout} label={'Category'}>
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: 'Category is required'
                  }
                ]
              })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
              >
                {this.props.categories.map((item, key) => {
                  return (<Option key={item}>{item}</Option>)
                })}
              </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label={'Tags'}>
              {getFieldDecorator('tags')(<Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please select"
              >
                {children}
              </Select>)}

            </FormItem>

            <FormItem {...formItemLayout} label={'Description'}>
              {getFieldDecorator('desc', {
                valuePropName: 'fileList',
                getValueFromEvent: this.onChange
              })(<ReactQuill defaultValue={this.state.editorState}/>)}
            </FormItem>

            <FormItem {...formItemLayout} label={'Website Primary Color'}>

              {getFieldDecorator('baseColor', {
                initialValue: '#ff00FF',
                valuePropName: 'color',
                trigger: 'onChange'
                // getValueFromEvent: 'onChangeComplete'
              })(<ChromePicker/>)}

            </FormItem>

            <FormItem {...formItemLayout} label={'Logo BG Color'}>

              {getFieldDecorator('logoBgColor', {
                initialValue: '#ff00FF',
                valuePropName: 'color',
                trigger: 'onChange'
              })(<ChromePicker/>)}
            </FormItem>

            <FormItem {...formItemLayout} label={'Logo Url'}>
              {getFieldDecorator('logoUrl')(<Input/>)}
            </FormItem>

            {_.times(this.state.extraFeilds, (key) => (
              <FormItem {...formItemLayout} key={key} label={`Extra Urls ${key + 1}`}>
                {getFieldDecorator(`extraUrl-${key}`)(<Input/>)}
              </FormItem>))
            }

            <Form.Item {...submitFormLayout}>
              <Button type="dashed" onClick={() => {
                this.setState({
                  extraFeilds: this.state.extraFeilds + 1
                })
              }} style={{ width: '100%' }}>
                <Icon type="plus"/> Add Extra Urls
              </Button>
            </Form.Item>

            <FormItem {...formItemLayout} label={'Project Date (Approx)'}>
              {getFieldDecorator('projectDate')(<DatePicker/>)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={this.props.loading}>
                Submit
              </Button>
            </FormItem>

          </Form>
        </Card>

      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ global }) => ({
  loading: global.buttonLoading,
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
)(AddWebsite)
