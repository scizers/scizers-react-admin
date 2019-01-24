import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Icon,
  Tabs,
  InputNumber,
  Row,
  Col
} from 'antd'
import { ChromePicker } from 'react-color'
import _ from 'lodash'
import moment from 'moment'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { notification } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'
import { createMatchSelector } from 'connected-react-router'

const FormItem = Form.Item
const { Option } = Select


const TabPane = Tabs.TabPane

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

function callback(key) {
  console.log(key)
}

@Form.create()
class AddWebsite extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {}


  }

  handleSubmit = e => {
    const { dispatch, form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        let values = _.clone(valData)


        dispatch(showLoader())

        let x = await Request.addCountry(values)

        dispatch(hideLoader())


        if (!x.error) {

          notification.success({
            message: 'Success',
            description: x.msg
          })

          // dispatch('/all-countries')

        } else {
          notification.error({
            message: 'Error Saving',
            description: x.msg
          })

        }

      }
    })
  }

  setFormValues = async (slug) => {

    let { data } = await Request.getWebsite(slug)

    this.setState({
      extraFeilds: data.extraUrls.length
    })

    let x = {
      url: data.url,
      category: data.category,
      tags: data.tags,
      description: data.description,
      baseColor: data.baseColor,
      logoBgColor: data.logoBgColor,
      logoUrl: data.logoUrl,
      projectDate: moment(data.projectDate)
    }

    _.each(data.extraUrls, (val, k) => {
      x[`extraUrl-${k}`] = val
    })

    this.props.form.setFieldsValue(x)

  }

  componentDidMount() {

    let searchParams = new URLSearchParams(this.props.search)
    let slug = searchParams.get('slug')


    if (slug) {
      this.setFormValues(slug)
    }


  }

  render() {

    const { submitting } = this.props
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props

    const { editorState } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 8 },
        sm: { span: 12 }
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
      <PageHeaderWrapper title={'Add New Country'}>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>

          <Card bordered={true}>

            <Tabs onChange={callback} type="card">

              <TabPane tab="General Info" key="1">


                <FormItem {...formItemLayout} label={'Country Name'}>
                  {getFieldDecorator('countryName', {
                    rules: [
                      {
                        required: true,
                        message: 'Country name is required'
                      }
                    ]
                  })(<Input placeholder="India"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Country Code'}>
                  {getFieldDecorator('countryCode', {
                    rules: [
                      {
                        required: true,
                        message: 'Country Code is required'
                      }
                    ]
                  })(<Input placeholder="IN"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Currency'}>
                  {getFieldDecorator('currencyName', {
                    rules: [
                      {
                        required: true,
                        message: 'Currency is required'
                      }
                    ]
                  })(<Input placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Currency Rate'}>
                  {getFieldDecorator('currencyRate', {
                    rules: [
                      {
                        required: true,
                        message: 'Currency rate is required'
                      }
                    ]
                  })(<InputNumber/>)}
                </FormItem>
              </TabPane>

              <TabPane tab="Costs " key="2">
                <h3>Consultancy (INR)</h3>
                <FormItem {...formItemLayout} label={'Stage 1 (Application)'}>
                  {getFieldDecorator('stageApplication')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Stage 2 (Visa Filling)'}>
                  {getFieldDecorator('stageVisaFilling')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Stage 3 (Visa Approval)'}>
                  {getFieldDecorator('stageVisaApproval')(<InputNumber placeholder=""/>)}
                </FormItem>


                <h3>Visa Fee (INR)</h3>
                <FormItem {...formItemLayout} label={'Main Applicant '}>
                  {getFieldDecorator('visaFeeMainApplicant')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Spouse '}>
                  {getFieldDecorator('visaFeeSpouse')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Child 1 '}>
                  {getFieldDecorator('visaFeeChild1')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Child 2 '}>
                  {getFieldDecorator('visaFeeChild2')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Child 3 '}>
                  {getFieldDecorator('visaFeeChild3')(<InputNumber placeholder=""/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'Child 4 '}>
                  {getFieldDecorator('visaFeeChild4')(<InputNumber placeholder=""/>)}
                </FormItem>


              </TabPane>

              <TabPane tab="Visa/Country Info" key="3">Content of Tab Pane 2</TabPane>
              <TabPane tab="Funds/Sponsers/Checklist" key="4">Content of Tab Pane 2</TabPane>
              <TabPane tab="Basic Enrollment Info" key="5">Content of Tab Pane 2</TabPane>
              <TabPane tab="Files To Library" key="6">Content of Tab Pane 2</TabPane>

            </Tabs>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={this.props.loading}>
                SAVE
              </Button>
            </FormItem>


          </Card>

        </Form>


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
