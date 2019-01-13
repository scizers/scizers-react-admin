import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  Input,
  Button,
  Card,
  Icon,
  Modal,
  Upload
} from 'antd'
import _ from 'lodash'
import moment from 'moment'

import { notification } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'

const FormItem = Form.Item

@Form.create()
class WebsiteScreenshots extends PureComponent {

  setFormValues = async (slug) => {

    let { data, websiteUrl } = await Request.getWebsite(slug)

    let extraUrls = []
    _.each(data.extraUrls, (x, key) => {
      let k = key + 1
      extraUrls.push({
        uid: k,
        name: `${data.urlSlug}-extras-${k}.jpg`,
        status: 'done',
        url: `${websiteUrl}/screenshots/${data.urlSlug}-extras-${k}.jpg`
      })
    })

    this.props.form.setFieldsValue({
      extraUrls: extraUrls
    })

  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  uploadFileHandler = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {
        console.log(valData)
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      extraUrls: []
    }
  }

  componentDidMount () {

    let searchParams = new URLSearchParams(this.props.search)
    let slug = searchParams.get('slug')

    if (slug) {
      this.setFormValues(slug)
    }


  }

  render () {

    const { submitting } = this.props
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props

    const { previewVisible, previewImage, extraUrls } = this.state

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

    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <PageHeaderWrapper
        title={'Add New Website'}
        content={'This is some descopt '}
      >

        <Card bordered={true}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <FormItem {...formItemLayout} label={'URL'}>
              {getFieldDecorator('extraUrls', {
                valuePropName: 'fileList',
                getValueFromEvent: this.uploadFileHandler
              })(
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  onPreview={this.handlePreview}
                >
                  {uploadButton}
                </Upload>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={this.props.loading}>
                Submit
              </Button>
            </FormItem>

          </Form>
        </Card>
        <Modal width={800} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage}/>
        </Modal>

      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
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
)(WebsiteScreenshots)
