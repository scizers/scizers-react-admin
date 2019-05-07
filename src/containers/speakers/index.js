import React, { Component, PureComponent } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
// import { TableComp } from 'sz-react-utils'
import {
  Table,
  Card,
  Tooltip,
  Upload,
  Drawer,
  notification, Row, Col, Select,
  Switch,
  Input, Button, Icon
} from 'antd'
import Request from '../../request'
import Color from 'color'
import _ from 'lodash'
import styles from './styles.less'
import { connect } from 'react-redux'
import { getUrlPushWrapper } from '../../routes'
import { Form } from 'antd/lib/index'
import { hideLoader, showLoader } from '../../modules/actions'
import moment from 'moment/moment'
// import { FormUtils } from 'sz-react-utils'
import FormUtils from '../../components/_utils/formUtils'
import TableComp from '../../components/_utils/table'
import { apiUrl } from '../../settings'

const Option = Select.Option
const HCT_TYPES = [
  'Physician', 'Non-Physician (Research / Academic)', 'Non-Physician (Midlevel)', 'Management'
]

const HISTORICAL_TIER = [
  'Local', 'Regional', 'National', 'International'
]
const TIERS = [
  'Tier 1', 'Tier 2', 'Tier 3'
]


class SimpleSelect extends PureComponent {
  render () {

    const { value, onChange } = this.props

    return (
      <Select defaultValue={value}
              onChange={onChange}>
        <Option value="0">0</Option>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
      </Select>
    )
  }
}

@Form.create()
class AddSpeaker extends PureComponent {

  handleSubmit = e => {
    const { form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {
        this.props.onSubmit(valData)
      }
    })
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {


  }

  render () {

    const { submitting } = this.props
    const { form: { getFieldDecorator, getFieldValue } } = this.props

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        md: { span: 12, offset: 8 }
      }
    }

    const inputTypes = {
      fields: [
        {
          key: 'firstName',
          required: true
        },
        {
          key: 'lastName',
          required: true
        },
        {
          key: 'uniqueId',
          required: true
        },
        {
          key: 'hcpType',
          label: 'HCP Type',
          type: 'select',
          required: true,
          options: HCT_TYPES,
          onChange: (v) => {
            this.props.form.setFieldsValue({ hcpType: v })
          }
        },
        {
          key: 'historicalTier',
          label: 'Historical Tier',
          type: 'select',
          required: true,
          options: HISTORICAL_TIER,
          onChange: (v) => {
            this.props.form.setFieldsValue({ historicalTier: v })
          }
        }
      ]
    }

    const inputTypes2 = {
      fields: [
        {
          prefixComp: <h3 style={{ paddingLeft: 30 }}>Qualification</h3>,
          key: 'academic',
          label: 'Academic & Institution Appointment',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ academic: v })
          }
        },
        {
          key: 'research',
          label: 'Research and/or Clinical Trial Experience',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ research: v })
          }
        },
        {
          key: 'peerReviewed',
          label: 'Peer Reviewed Publications',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ peerReviewed: v })
          }
        },
        {
          key: 'leadership',
          label: 'Professional & Scientific Society Leadership',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ leadership: v })
          }
        },
        {
          key: 'presentations',
          label: 'Professional & Scientific Presentations',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ presentations: v })
          }
        },
        {
          key: 'experience',
          label: 'Clinical Experience with Relevant Disease State',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ experience: v })
          }
        },
        {
          key: 'credibility',
          label: 'Scientific / Medical Credibility Among Peers',
          type: 'select',
          required: true,
          options: [0, 1, 2, 3],
          onChange: (v) => {
            this.props.form.setFieldsValue({ credibility: v })
          }
        }
      ]
    }

    const FIL = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}
            formItemLayout={FIL}
            hideRequiredMark style={{ marginTop: 8 }}>

        <FormUtils inputSchema={inputTypes}
                   getFieldDecorator={getFieldDecorator}/>

        <FormUtils inputSchema={inputTypes2}
                   formItemLayout={FIL}
                   getFieldDecorator={getFieldDecorator}/>

        <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            SAVE
          </Button>
        </Form.Item>

      </Form>
    )
  }
}

class SpeakersView extends Component {

  state = {
    columns: [],
    dataSource: [],
    visible: false,
    visible2: false,
    loading: true,
    editSpeaker: false,
    showingAll: false,
    edit: false,
    changes: [],
    params: {
      hcpType: ''
    }
  }

  constructor (props) {
    super(props)
    this.table = React.createRef()
  }

  componentDidMount () {
    this.apiRequest2()

    if (this.props.pathname === '/speaker/all') {
      this.setState({
        showingAll: true
      })
    }

    this.setState({
      columns: [
        {
          rowKey: 'firstName',
          key: 'firstName',
          dataIndex: 'firstName',
          title: 'Name',
          sorter: (a, b) => {
            return a.firstName.length - b.firstName.length
          },
          sortDirections: ['descend'],

          render: (val, record) => {
            return <span>{record.lastName}, {record.firstName}</span>
          }
        },
        {
          key: 'uniqueId',
          dataIndex: 'uniqueId',
          rowKey: 'uniqueId',
          title: 'Unique Id',
          sorter: (a, b) => {
            return a.uniqueId.length - b.uniqueId.length
          },
          sortDirections: ['descend']
        },
        {
          key: 'hcpType',
          rowKey: 'hcpType',
          dataIndex: 'hcpType',
          title: 'HCP Type'
        },
        {
          key: 'historicalTier',
          dataIndex: 'historicalTier',
          title: 'Historical Tier',
          rowKey: 'historicalTier'
        },
        {
          key: 'qualification',
          dataIndex: 'qualification',
          rowKey: 'qualification',
          title: 'Qualification',
          render: (val, record) => {

            return <div>
              <table className={styles.qualification}>
                <tbody>
                <tr>
                  <td>academic</td>
                  <td>research</td>
                  <td>peerReviewed</td>
                  <td>leadership</td>

                </tr>

                {!this.state.editSpeaker ?
                  <tr>
                    <td>{val.academic}</td>
                    <td>{val.research}</td>
                    <td>{val.peerReviewed}</td>
                    <td>{val.leadership}</td>

                  </tr>
                  :
                  <tr>
                    <td><SimpleSelect value={val.academic} onChange={value => {
                      this.changeQual({ type: 'academic', value, _id: record._id })
                    }}/></td>
                    <td><SimpleSelect value={val.research} onChange={value => {
                      this.changeQual({ type: 'research', value, _id: record._id })
                    }}/></td>
                    <td><SimpleSelect value={val.peerReviewed} onChange={value => {
                      this.changeQual({ type: 'peerReviewed', value, _id: record._id })
                    }}/></td>
                    <td><SimpleSelect value={val.leadership} onChange={value => {
                      this.changeQual({ type: 'leadership', value, _id: record._id })
                    }}/></td>

                  </tr>
                }

                </tbody>
              </table>

              <table className={styles.qualification} style={{ marginTop: 10 }}>
                <tbody>
                <tr>
                  <td>presentations</td>
                  <td>experience</td>
                  <td>credibility</td>
                </tr>

                {!this.state.editSpeaker ?
                  <tr>
                    <td>{val.presentations}</td>
                    <td>{val.experience}</td>
                    <td>{val.credibility}</td>
                  </tr>
                  :
                  <tr>
                    <td><SimpleSelect value={val.presentations} onChange={value => {
                      this.changeQual({ type: 'presentations', value, _id: record._id })
                    }}/></td>
                    <td><SimpleSelect value={val.experience} onChange={value => {
                      this.changeQual({ type: 'experience', value, _id: record._id })
                    }}/></td>
                    <td><SimpleSelect value={val.credibility} onChange={value => {
                      this.changeQual({ type: 'credibility', value, _id: record._id })
                    }}/></td>
                  </tr>
                }

                </tbody>
              </table>
            </div>

          }
        },
        {
          key: 'tier',
          rowKey: 'tier',
          dataIndex: 'tier',
          title: 'Tier'
        },
        {
          key: 'honorarium',
          dataIndex: 'honorarium',
          rowKey: 'honorarium',
          title: 'Honorarium'
        }
      ]

    })

  }

  apiRequest2 = async (params) => {

    if (!params) {
      params = {}
    }

    this.setState({
      params,
      loading: true
    })

    let sd = _.clone(params)
    params = {}
    _.each(sd, (val, key) => {
      if (val) {
        params[key] = val
      }
    })

    let data = await Request.getAllContacts({ ...params, contactType: 'speaker' })

    this.setState({
      dataSource: data.data,
      loading: false
    })

  }

  reload = () => {
    this.apiRequest2()
  }

  add = async (arr) => {

    let payload = {}

    payload.qualification = {
      academic: arr.academic,
      credibility: arr.credibility,
      experience: arr.experience,
      leadership: arr.leadership,
      peerReviewed: arr.peerReviewed,
      presentations: arr.presentations,
      research: arr.research
    }

    delete arr.academic
    delete arr.credibility
    delete arr.experience
    delete arr.leadership
    delete arr.peerReviewed
    delete arr.presentations
    delete arr.research

    payload = { ...payload, ...arr }
    payload.contactType = ['speaker']


    this.setState({
      loading: true
    })

    let x = await Request.addContact(payload)

    this.setState({
      visible: false,
      loading: false
    }, () => {
      this.reload()
    })

  }

  changeQual = (data) => {

    const { _id, type, value } = data
    let { changes: ddd } = this.state
    let changes = _.clone(ddd)

    let x = _.find(changes, x => x._id == _id)

    if (!x) {
      changes.push({
        _id,
        [type]: value
      })
    } else {
      x[type] = value
    }

    // console.log(changes)
    this.setState({
      changes
    })

  }

  uploadCSVRequest = () => {
    return new Promise(async (resolve) => {

      let { uploadData } = this.state
      let type = 'speaker'

      await Request.csvUpload({ uploadData, type })
      notification.success({ message: 'New Data Uploaded', description: 'Reload to view' })

      this.setState({
        disabled: true,
        uploadData: null,
        visible2: false
      })

      resolve()
    })
  }

  save = async () => {


    let { changes, dataSource } = this.state

    this.setState({
      loading: true
    })


    let data = _.clone(dataSource)
    _.each(data, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          console.log(val, key)
          c.qualification[key] = val
        })
      }

      this.setState({
        dataSource: data,
        editSpeaker: false
      })

    })

    let x = await Request.editScores({ changes })

    this.setState({
      loading: false
    })

  }

  render () {

    const { loading, visible, visible2, dataSource, editSpeaker, columns, disabled, showingAll } = this.state
    const { dispatch } = this.props
    const Edit = editSpeaker

    const uploadprops = {
      name: 'file',
      action: `${apiUrl}/filesUploader`,
      onChange: (info) => {
        if (info.file.status === 'done') {
          notification.success({ message: `${info.file.name} file uploaded successfully` })
          this.setState({
            disabled: false,
            uploadData: info
          })
        } else if (info.file.status === 'error') {
          notification.error({ message: `${info.file.name} file upload failed.` })
          this.setState({
            disabled: true,
            uploadData: null
          })
        }
      }
    }

    return (
      <PageHeaderWrapper title={Edit ? 'Edit Speaker Bureau FMV' : 'All Speaker Bureau FMV'}>

        <Card bordered={true}>

          {!showingAll && <Row justify={'space-between'} style={{ marginBottom: 10 }} className={styles.buttonRow}>
            <Col span={8}>
              <Button
                shape="circle" onClick={() => {
                this.reload()
              }} icon="reload"/>
              <Button type="dashed" onClick={() => {
                this.setState({
                  visible: true
                })
              }}>Add Speaker</Button>

              <Button type="dashed" onClick={() => {
                this.setState({
                  visible2: true
                })
              }}>Upload Speakers</Button>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
              {!Edit ?
                <Button type="primary"
                        onClick={() => {

                          // dispatch({
                          //   type: 'TOOGLE_EDIT_SPEAKER',
                          //   editSpeaker: true
                          // })
                          // dispatch(getUrlPushWrapper('speakerEdit'))

                          this.setState({
                            editSpeaker: true
                          })


                        }}>Edit</Button>
                :
                <div>
                  <Button type="primary"
                          onClick={async () => {

                            await this.save()

                          }}>Save Changes</Button>

                  <Button
                    style={{ marginLeft: 10 }}
                    type="danger"
                    onClick={() => {

                      this.setState({
                        editSpeaker: false
                      })

                    }}>Cancel</Button>
                </div>
              }

            </Col>
          </Row>}

          {showingAll && <Row justify={'space-between'} style={{ marginBottom: 10 }} className={styles.buttonRow}>
            <Col span={8}>

              <Select style={{ minWidth: 300 }}
                      placeholder={'HCP Type'}
                      onChange={(val) => {

                        let x = { ...this.state.params }
                        x.hcpType = val

                        this.setState({
                          params: x
                        }, () => {

                          this.apiRequest2(this.state.params)

                        })

                      }}>

                <Option value={''}>All </Option>
                {HCT_TYPES.map((val) => {
                  return <Option key={val}>{val}</Option>
                })}

              </Select>


            </Col>
            <Col span={8}>

              <Select style={{ minWidth: 300 }}
                      placeholder={'Historical Tier'}
                      onChange={(val) => {

                        let x = { ...this.state.params }
                        x.historicalTier = val

                        this.setState({
                          params: x
                        }, () => {
                          this.apiRequest2(this.state.params)
                        })

                      }}>

                <Option value={''}>All </Option>
                {HISTORICAL_TIER.map((val) => {
                  return <Option key={val}>{val}</Option>
                })}

              </Select>


            </Col>
            <Col span={8}>

              <Select style={{ minWidth: 300 }}
                      placeholder={'Tier'}
                      onChange={(val) => {

                        let x = { ...this.state.params }
                        x.tier = val

                        this.setState({
                          params: x
                        }, () => {
                          this.apiRequest2(this.state.params)
                        })

                      }}>

                <Option value={''}>All </Option>
                {TIERS.map((val) => {
                  return <Option key={val}>{val}</Option>
                })}

              </Select>


            </Col>

          </Row>}


          <Table
            reloadButon={false}
            rowKey={record => record._id}
            bordered
            loading={loading}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 100,
              pageSizeOptions: ['10', '20', '50', '100', '1000']
            }}
            ref={this.table}
            columns={columns}

            dataSource={dataSource}


          />

        </Card>

        <Drawer
          title="Add Speaker"
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({
              visible: false
            })

          }}
          visible={visible}
          width={600}
        >

          <AddSpeaker loading={loading}
                      onSubmit={(valData) => {
                        this.add(valData)
                      }}/>

        </Drawer>

        <Drawer
          title="Upload  CSV "
          placement="right"
          closable={false}
          onClose={() => {
            this.setState({
              visible2: false
            })

          }}

          visible={visible2}
        >

          <div className={styles.drawerWrapper}>
            <Upload {...uploadprops}>
              <Button>
                <Icon type="upload"/> Click to Upload
              </Button>
            </Upload>

            <Button type={'primary'}
                    onClick={() => {
                      this.uploadCSVRequest()
                    }}
                    disabled={disabled} style={{ marginTop: 20 }}>
              Import CSV
            </Button>
            <Button type={'danger'} onClick={() => {
              this.setState({
                visible2: false
              })
            }} style={{ marginTop: 20, marginLeft: 8 }}>
              Close
            </Button>


            <a href={`${apiUrl}/sample.csv`} style={{ marginTop: 10 }}>
              Download Sample File
            </a>

          </div>

        </Drawer>


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
)(SpeakersView)
