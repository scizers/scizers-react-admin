import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../../../components/PageHeaderWrapper'
import {
  Form,
  Input,
  Button,
  Card,
  Icon,
  Modal,
  Upload,
  notification
} from 'antd'
import _ from 'lodash'
import moment from 'moment'

import { hideLoader, showLoader } from '../../../modules/actions'
import Request from '../../../request'
import { connect } from 'react-redux'

const FormItem = Form.Item
const Types = [
  { label: 'Desktop', limit: 1, name: 'desktop', ext: 'jpg' },
  { label: 'Desktop Full', limit: 1, name: 'desktop-full', ext: 'jpg' },
  { label: 'iPad', limit: 1, name: 'ipad', ext: 'jpg' },
  { label: 'iPad Full', limit: 1, name: 'ipad-full', ext: 'jpg' },
  { label: 'iPhone', limit: 1, name: 'iphone', ext: 'jpg' },
  { label: 'iPhone Full', limit: 1, name: 'iphone-full', ext: 'jpg' },
  { label: 'Logo Feature', limit: 1, name: 'logoFeature', ext: 'jpg' },
  { label: 'Main Feature', limit: 1, name: 'mainFeature', ext: 'png' }
]

@Form.create()
class WebsiteScreenshots extends PureComponent {

  defaultError = () => {
    notification.error({
      message: 'Error',
      description: 'Unable to get data'
    })

  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  setFormValues = async (slug) => {

    let { data, websiteUrl } = await Request.getWebsite(slug)

    this.setState({ websiteUrl })

    if (data) {

      let extraUrls = []

      let extraUrlsCount = data.extraUrlsCount
      if (!data.customImages) {
        extraUrlsCount = data.extraUrls.length
      }

      _.times(extraUrlsCount, (key) => {
        let k = key + 1
        extraUrls.push({
          uid: k,
          name: `${data.urlSlug}-extras-${k}.jpg`,
          status: 'done',
          url: `${websiteUrl}/screenshots/${data.urlSlug}-extras-${k}.jpg`
        })
      })

      let others = {}

      _.each(Types, (item) => {
        others[item.name] = [{
          uid: item.name,
          name: `${data.urlSlug}-${item.name}`,
          status: 'done',
          url: `${websiteUrl}/screenshots/${data.urlSlug}-${item.name}.${item.ext}`
        }]
      })


      this.props.form.setFieldsValue({
        extraUrls,
        ...others
      })

      this.setState({
        allFormData: {
          extraUrls,
          ...others
        }
      })

    }
    else {
      this.defaultError()
    }


  }
  uploadFileHandler = (e, name) => {
    console.log(e, name)

    if (Array.isArray(e)) {
      return e
    }
    let allFormData = this.state.allFormData
    allFormData[name] = e.fileList

    this.setState({ allFormData })
    return e && e.fileList
  }
  handleSubmit = async e => {
    const { dispatch, form } = this.props
    const { slug } = this.state
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, data) => {
      if (!err) {

        _.each(data, (item, key) => {
          _.each(item, (x) => {
            delete x.thumbUrl
          })
        })

        let resp = await Request.editWebsiteScreens({ slug, data })
        console.log(resp)
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      websiteUrl: '',
      extraUrls: [],
      allFormData: {}
    }
  }

  componentDidMount () {

    let searchParams = new URLSearchParams(this.props.search)
    let slug = searchParams.get('slug')

    if (slug) {
      this.setFormValues(slug)
      this.setState({
        slug
      })
    } else {
      this.defaultError()
    }
  }

  render () {

    const {
      form: { getFieldDecorator }, token
    } = this.props

    const { previewVisible, previewImage, websiteUrl, allFormData } = this.state

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


    const getUploadFormField = (name, label, limit, ext) => {

      if (!limit) limit = 1

      return (
        <FormItem {...formItemLayout} label={`${label} (${ext})`}>
          {getFieldDecorator(name, {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => {
              console.log('are you here sir ')
              return this.uploadFileHandler(e, name)
            }
          })(
            <Upload
              accept={ext === 'jpg' ? 'image/jpeg' : 'image/png'}
              name={'file'}
              headers={{ Authorization: `Bearer ${token}` }}
              action={`${websiteUrl}/filesUploader`}
              listType="picture-card"
              onPreview={this.handlePreview}
            >

              {allFormData[name] !== undefined && allFormData[name].length < limit ? (
                <div>
                  <Icon type="plus"/>
                  <div className="ant-upload-text">Upload</div>
                </div>
              ) : (null)}
            </Upload>
          )}
        </FormItem>
      )
    }

    return (
      <PageHeaderWrapper
        title={'Add New Website'}
        content={'This is some descopt '}
      >

        <Card bordered={true}>

          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            {Types.map((item, key) => {

              return (<React.Fragment key={key}>
                {getUploadFormField(item.name, item.label, item.limit, item.ext)}
              </React.Fragment>)

            })}

            {getUploadFormField('extraUrls', 'Extra Urls Screenshots', 5, 'jpg')}


            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={this.props.loading}>
                Submit
              </Button>
            </FormItem>

          </Form>
        </Card>
        <Modal width={800} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ display: 'inline-block', margin: '0 auto', maxWidth: '100%' }}
               src={previewImage}/>
        </Modal>

      </PageHeaderWrapper>
    )
  }
}

const mapStateToProps = ({ global, router }) => ({
  loading: global.buttonLoading,
  token: global.token,
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
