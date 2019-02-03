import moment from 'moment'
import React, { Component, PureComponent } from 'react'
import { apiUrl } from '../../settings'

import { Form, Input, Upload, Icon, Button, InputNumber, Select } from 'antd'
import _ from 'lodash'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class getAllFormFields extends Component {
  state = {}

  constructor (props) {
    super(props)

  }


  render () {


    const { inputSchema, getFieldDecorator, children, formItemLayout } = this.props


    let FIL = {}

    if (!formItemLayout) {
      FIL = {
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
    } else {
      FIL = formItemLayout
    }

    return (
      <React.Fragment>

        {
          inputSchema.fields.map((item) => {


            let rules = []
            if (item.required) {
              rules.push({
                required: true,
                message: item.requiredMessage ? item.requiredMessage : 'This is a Mandatory Field'
              })
            }

            let customEvent = {}
            if (item.customDirectives) {
              customEvent = item.customDirectives
            }


            let inputProps = {}
            if (!!item.placeholder) inputProps.placeholder = item.placeholder


            if (!!item.options) {
              inputProps.options = item.options
            } else {
              inputProps.options = ['Choose']
            }


            if (!!item.type) inputProps.type = item.type
            if (!!item.rows) inputProps.rows = item.rows


            return (
              <React.Fragment key={item.key}>

                {item.prefixComp ? item.prefixComp : null}

                <FormItem {...FIL}
                          key={item.key}
                          label={item.label}>

                  {getFieldDecorator(item.key, { rules, ...customEvent })(<SimpleFormElement
                    item={item} {...inputProps}/>)}

                </FormItem>


              </React.Fragment>
            )

          })

        }

        {children}

      </React.Fragment>
    )

  }

}

class SimpleFormElement extends PureComponent {

  state = {
    tempFiles: []
  }

  handlePreview = (file) => {
    console.log(file)
  }

  handleChange = (v) => {


    console.log(v)

  }

  section = (type) => {

    let x = this.props
    let { item } = this.props


    switch (type) {
      case 'number':
        return <InputNumber {...x} />
      case 'textArea':
        return <TextArea {...x} rows={x.rows}/>

      case 'file':

        let limit = 1
        if (!!item.limit) limit = item.limit

        return <Upload
          name={'file'}
          action={`${apiUrl}/filesUploader`}
          onChange={this.handleChange}
          defaultFileList={item.defaultFileList}
          {...x}
        >
          <Button>
            <Icon type='upload'/> Select File
          </Button>
        </Upload>

      case 'select':
        if (!x.options) x.options = []
        if (!x.item.defaultValue) x.item.defaultValue = { 'key': 'Please Select' }
        return <SelectMy {...x}/>
      default:
        return <Input {...x} />
    }
  }

  render () {

    const { item } = this.props
    const { type } = item
    return (
      <React.Fragment>
        {this.section(type)}
      </React.Fragment>
    )


  }

}

class SelectMy extends PureComponent {


  render () {

    let x = this.props

    return (<Select {...x}>
      {
        x.item.options.map((val, index) => {
          if (typeof val == 'object') {
            return (
              <Option key={index} value={val.id}>{val.display}</Option>
            )
          } else {
            return (
              <Option key={index} value={val}>{val}</Option>
            )
          }

        })
      }
    </Select>)

    /*return (<Select>

      <Option key={moment().unix()} value={'dd'}>test</Option>

    </Select>)*/

  }

}


export default (getAllFormFields)
