import React, { Component, PureComponent } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import {
  Table,
  Card,
  Tabs,
  Checkbox,
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
const TabPane = Tabs.TabPane
const TextArea = Input.TextArea

const HCT_TYPES = [
  'Physician',
  'Non-Physician (Research Academic)',
  'Non-Physician (Mid-Level)',
  'Management'
]

const HISTORICAL_TIER = [
  'Local', 'Regional', 'National', 'International'
]
const TIERS = [
  'Tier 1 - National', 'Tier 2 - Regional', 'Tier 3 - Local'
]
const HONORARIUM = [
  750, 1000, 1500, 2000, 2500
]

const SPEAKER_CAP = [
  '$6,000.00',
  '$9,000.00',
  '$10,000.00',
  '$12,000.00',
  '$20,000.00',
  '$30,000.00',
  '$50,000.00',
  '$1,00,000.00'
]
const CONTACT_TYPES = [
  { id: 'speaker', name: 'Speaker' },
  { id: 'advisoryBoard', name: 'Advisory Boards' },
  { id: 'consultingArrangement', name: 'Consulting Arrangements' },
  { id: 'otherHCPEngagement', name: 'Other HCP Engagements' }
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
class AddContact extends PureComponent {

  state = {
    _id: null
  }

  handleSubmit = e => {
    const { form } = this.props
    e.preventDefault()
    form.validateFieldsAndScroll(async (err, valData) => {
      if (!err) {

        if (this.state._id) {
          valData._id = this.state._id
        }

        this.props.onSubmit(valData)
      }
    })
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {

    let { values } = this.props
    if (values && values._id) {
      values = { ...values, ...values.qualification }
      this.props.form.setFieldsValue(values)
      this.setState({
        _id: values._id
      })
    }

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
        },
        {
          key: 'contactType',
          label: 'Contact Type',
          type: 'select',
          // mode: 'multiple',
          required: true,
          options: CONTACT_TYPES,
          keyAccessor: x => x.id,
          valueAccessor: x => x.name,
          onChange: (v) => {
            this.props.form.setFieldsValue({ contactType: v })
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
        // formItemLayout={FIL}
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

class ContactsView extends Component {

  state = {
    columns: [],
    dataSource1: [],
    dataSource2: [],
    dataSource3: [],
    dataSource4: [],
    visible: false,
    visible2: false,
    loading: true,
    editContact: false,
    edit: false,
    showingAll: false,
    params: {
      hcpType: ''
    },
    changes: [],
    changes2: [],
    editingSpeaker: null

  }

  constructor (props) {
    super(props)
    this.changeReason = _.debounce(this._changeReason, 500)
  }

  componentDidMount () {
    this.apiRequest2()

    if (this.props.pathname === '/adviser/all') {
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
        /*  {
            key: 'contactType',
            rowKey: 'contactType',
            dataIndex: 'contactType',
            title: 'Contact Type',
            render: (val) => {
              return val.join(', ')
            }
          },*/
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

                {!this.state.editContact ?
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

                {!this.state.editContact ?
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
          title: 'Tier',
          render: (val, record) => {
            return <React.Fragment>
              {
                !record.override1 ? (<span>{val} {record.override && (
                  <Tooltip title="Overridden FMV calculation">
                    <small className={styles.override}>*</small>
                  </Tooltip>
                )}</span>) : (<div>
                  <Select style={{ minWidth: 100 }}
                          placeholder={'Tier'}
                          onChange={value => {
                            this.changeValues({ type: 'tier', value, _id: record._id })
                          }}>


                    {TIERS.map((val) => {
                      return <Option key={val}>{val}</Option>
                    })}

                  </Select>
                </div>)
              }
            </React.Fragment>
          }
        },
        {
          key: 'honorarium',
          dataIndex: 'honorarium',
          rowKey: 'honorarium',
          title: 'Honorarium',
          render: (val, record) => {
            return <React.Fragment>
              {
                !record.override1 ? (<span>{val} {record.override && (
                  <Tooltip title="Overridden FMV calculation">
                    <small className={styles.override}>*</small>
                  </Tooltip>
                )}</span>) : (<div>
                  <Select style={{ minWidth: 100 }}
                          placeholder={'Honorarium'}
                          onChange={value => {
                            this.changeValues({ type: 'honorarium', value, _id: record._id })
                          }}>

                    {HONORARIUM.map((val) => {
                      return <Option key={val}>{val}</Option>
                    })}

                  </Select>
                </div>)
              }
            </React.Fragment>
          }

        },
        {
          key: 'speakerCap',
          dataIndex: 'speakercap',
          rowKey: 'speakerCap',
          title: 'Speaker Cap',
          render: (val, record) => {
            return <React.Fragment>
              {
                !record.override1 ? (<span>{val} {record.override && (
                  <Tooltip title="Overridden FMV calculation">
                    <small className={styles.override}>*</small>
                  </Tooltip>
                )}</span>) : (<div>
                  <Select style={{ minWidth: 100 }}
                          placeholder={'Speaker Cap'}
                          onChange={value => {
                            this.changeValues({ type: 'speakerCap', value, _id: record._id })
                          }}>

                    {SPEAKER_CAP.map((val) => {
                      return <Option key={val}>{val}</Option>
                    })}

                  </Select>
                </div>)
              }
            </React.Fragment>
          }

        },
        {
          key: 'cv',
          rowKey: 'cv',
          dataIndex: 'cv',
          title: 'CV',
          render: (cv, record) => {
            return <div>
              {cv &&
              <Button type="link" target={'_blank'} href={`${apiUrl}${cv.path.replace('public/', '/')}`}>Download
                {cv.name}</Button>}

              <Button onClick={() => {
                this.setState({
                  cvRecord: record,
                  visible3: true
                })
              }}>
                Add CV
              </Button>
            </div>
          }
        },
        {
          key: 'supportingDocuments',
          rowKey: 'supportingDocuments',
          dataIndex: 'supportingDocuments',
          title: 'Supporting Documents',
          render: (cv, record) => {

            return <div>
              {cv && cv.map((x, k) => {
                return (
                  <Button key={k} type="link"
                          target={'_blank'}
                          href={`${apiUrl}${x.path.replace('public/', '/')}`}>
                    {x.originalname}
                  </Button>
                )
              })}

              <Button onClick={() => {
                this.setState({
                  cvRecord: record,
                  visible4: true
                })
              }}>
                Add Supporting Documents
              </Button>
            </div>

          }
        },
        {
          key: 'override',
          dataIndex: 'override',
          rowKey: 'override',
          title: 'Actions',
          render: (cap, record) => {
            return <React.Fragment>

              <Button type={'primary'}
                      shape={'circle'}
                      icon={'edit'}
                      onClick={() => {
                        this.setState({
                          editingSpeaker: record,
                          visible: true
                        })
                      }}/>

              {!record.override1 ? <Button onClick={() => {
                this.changeSpeakerCap(true, record)
              }}>
                Override
              </Button> : (
                <div>

                  <TextArea placeholder={'Reason For Override'}
                            defaultValue={record.overrideMsg}
                            onChange={(val) => {
                              let value = val.target.value
                              this.changeReason({ type: 'overrideMsg', value, _id: record._id })
                            }}
                  />

                  <Button type={'primary'}
                          disabled={!record.overrideMsg}
                          onClick={() => {
                            this.save2(record)
                          }}>
                    Save
                  </Button>
                  <Button onClick={() => {
                    this.cancelOverride(record)
                  }}>
                    Cancel
                  </Button>
                </div>
              )
              }
            </React.Fragment>

          }
        }
      ],
      columns2: [
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
        /*  {
            key: 'contactType',
            rowKey: 'contactType',
            dataIndex: 'contactType',
            title: 'Contact Type',
            render: (val) => {
              return val.join(', ')
            }
          },*/
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

                {!this.state.editContact ?
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

                {!this.state.editContact ?
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
          title: 'Tier',
          render: (val, record) => {
            return <React.Fragment>
              {
                !record.override1 ? (<span>{val} {record.override && (
                  <Tooltip title="Overridden FMV calculation">
                    <small className={styles.override}>*</small>
                  </Tooltip>
                )}</span>) : (<div>
                  <Select style={{ minWidth: 100 }}
                          placeholder={'Tier'}
                          onChange={value => {
                            this.changeValues({ type: 'tier', value, _id: record._id })
                          }}>


                    {TIERS.map((val) => {
                      return <Option key={val}>{val}</Option>
                    })}

                  </Select>
                </div>)
              }
            </React.Fragment>
          }
        },
        {
          key: 'honorarium',
          dataIndex: 'honorarium',
          rowKey: 'honorarium',
          title: 'Honorarium / Hourly Rate',
          render: (val, record) => {
            return <React.Fragment>
              {val} {record.otherDetails && record.otherDetails.hourlyrate}
            </React.Fragment>
          }

        },
        {
          key: 'cv',
          rowKey: 'cv',
          dataIndex: 'cv',
          title: 'CV',
          render: (cv, record) => {
            return <div>
              {cv &&
              <Button type="link" target={'_blank'} href={`${apiUrl}${cv.path.replace('public/', '/')}`}>Download
                {cv.name}</Button>}

              <Button onClick={() => {
                this.setState({
                  cvRecord: record,
                  visible3: true
                })
              }}>
                Add CV
              </Button>
            </div>
          }
        },
        {
          key: 'supportingDocuments',
          rowKey: 'supportingDocuments',
          dataIndex: 'supportingDocuments',
          title: 'Supporting Documents',
          render: (cv, record) => {

            return <div>
              {cv && cv.map((x, k) => {
                return (
                  <Button key={k} type="link"
                          target={'_blank'}
                          href={`${apiUrl}${x.path.replace('public/', '/')}`}>
                    {x.originalname}
                  </Button>
                )
              })}

              <Button onClick={() => {
                this.setState({
                  cvRecord: record,
                  visible4: true
                })
              }}>
                Add Supporting Documents
              </Button>
            </div>

          }
        },
        {
          key: 'override',
          dataIndex: 'override',
          rowKey: 'override',
          title: 'Actions',
          render: (cap, record) => {
            return <React.Fragment>

              <Button type={'primary'}
                      shape={'circle'}
                      icon={'edit'}
                      onClick={() => {
                        this.setState({
                          editingSpeaker: record,
                          visible: true
                        })
                      }}/>

              {!record.override1 ? <Button onClick={() => {
                this.changeSpeakerCap(true, record)
              }}>
                Override
              </Button> : (
                <div>

                  <TextArea placeholder={'Reason For Override'}
                            defaultValue={record.overrideMsg}
                            onChange={(val) => {
                              let value = val.target.value
                              this.changeReason({ type: 'overrideMsg', value, _id: record._id })
                            }}
                  />

                  <Button type={'primary'}
                          disabled={!record.overrideMsg}
                          onClick={() => {
                            this.save2(record)
                          }}>
                    Save
                  </Button>
                  <Button onClick={() => {
                    this.cancelOverride(record)
                  }}>
                    Cancel
                  </Button>
                </div>
              )
              }
            </React.Fragment>

          }
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

    let { data: dataSource1 } = await Request.getAllContacts({ ...params, contactType: 'speaker' })
    let { data: dataSource2 } = await Request.getAllContacts({ ...params, contactType: 'advisoryBoard' })
    let { data: dataSource3 } = await Request.getAllContacts({ ...params, contactType: 'consultingArrangement' })
    let { data: dataSource4 } = await Request.getAllContacts({ ...params, contactType: 'otherHCPEngagement' })

    this.setState({
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4,
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

    this.setState({
      loading: true
    })

    console.log(payload._id)

    if (payload._id) {
      payload.override = false
      await Request.editContact(payload)
    } else {
      await Request.addContact(payload)
    }

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
  save = async () => {

    let {
      changes,
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4
    } = this.state

    this.setState({
      loading: true
    })

    let data1 = _.clone(dataSource1)
    let data2 = _.clone(dataSource2)
    let data3 = _.clone(dataSource3)
    let data4 = _.clone(dataSource4)

    _.each(data1, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          console.log(val, key)
          c.qualification[key] = val
        })
      }

      this.setState({
        dataSource1: data1,
        editContact: false
      })

    })
    _.each(data2, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          console.log(val, key)
          c.qualification[key] = val
        })
      }

      this.setState({
        dataSource2: data2,
        editContact: false
      })

    })
    _.each(data3, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          console.log(val, key)
          c.qualification[key] = val
        })
      }

      this.setState({
        dataSource3: data3,
        editContact: false
      })

    })
    _.each(data4, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          console.log(val, key)
          c.qualification[key] = val
        })
      }

      this.setState({
        dataSource4: data4,
        editContact: false
      })

    })

    let x = await Request.editScores({ changes })

    this.setState({
      loading: false
    })

  }

  changeValues = (data) => {

    const { _id, type, value } = data
    let { changes2: ddd } = this.state
    let changes2 = _.clone(ddd)

    let x = _.find(changes2, x => x._id == _id)

    if (!x) {
      changes2.push({
        _id,
        [type]: value
      })
    } else {
      x[type] = value
    }

    this.setState({
      changes2
    })

  }

  _changeReason = async (data) => {

    const { _id, type, value } = data


    let {
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4
    } = this.state


    let data1 = _.clone(dataSource1)
    let data2 = _.clone(dataSource2)
    let data3 = _.clone(dataSource3)
    let data4 = _.clone(dataSource4)

    let x = _.find(data1, c => c._id == _id)
    if (x) {
      x[type] = value
    }

    this.setState({
      dataSource1: data1
    })


  }

  save2 = async (record) => {

    let {
      changes2: changes,
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4
    } = this.state

    this.setState({
      loading: true
    })

    let data1 = _.clone(dataSource1)
    let data2 = _.clone(dataSource2)
    let data3 = _.clone(dataSource3)
    let data4 = _.clone(dataSource4)

    _.each(data1, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          c[key] = val
        })
        c.override1 = false
        c.override = true
      }

      this.setState({
        dataSource1: data1
      })

    })
    _.each(data2, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          c[key] = val
        })
        c.override1 = false
        c.override = true

      }

      this.setState({
        dataSource2: data2
      })

    })
    _.each(data3, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          c[key] = val
        })
        c.override1 = false
        c.override = true

      }

      this.setState({
        dataSource3: data3
      })

    })
    _.each(data4, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        _.each(x, (val, key) => {
          c[key] = val
        })
        c.override1 = false
        c.override = true

      }

      this.setState({
        dataSource4: data4
      })

    })


    let test = _.find(changes, x => x._id == record._id)
    if (test) {
      test.override = true
      test.overrideMsg = record.overrideMsg
      let x = await Request.editContact(test)
    }

    this.setState({
      loading: false
    })

  }

  cancelOverride = async (record) => {

    let {
      changes2: changes,
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4
    } = this.state

    this.setState({
      loading: true
    })

    let data1 = _.clone(dataSource1)
    let data2 = _.clone(dataSource2)
    let data3 = _.clone(dataSource3)
    let data4 = _.clone(dataSource4)

    _.each(data1, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        c.override1 = false
      }

      this.setState({
        dataSource1: data1
      })

    })
    _.each(data2, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        c.override1 = false
      }

      this.setState({
        dataSource2: data2
      })

    })
    _.each(data3, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        c.override1 = false
      }

      this.setState({
        dataSource3: data3
      })

    })
    _.each(data4, (c) => {

      let x = _.find(changes, x => x._id == c._id)
      if (x) {
        c.override1 = false
      }

      this.setState({
        dataSource4: data4
      })

    })


    let test = _.reject(changes, x => x._id == record._id)

    this.setState({
      loading: false,
      changes2: test
    })

  }

  uploadCSVRequest = () => {
    return new Promise(async (resolve) => {

      let { uploadData } = this.state
      let type = 'contact'

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

  uploadCVRequest = (type) => {
    return new Promise(async (resolve) => {

      let { uploadData, cvRecord: x } = this.state

      let cvRecord = _.clone(x)

      if (type === 'cv') {
        cvRecord[type] = uploadData.file.response
      }

      if (type === 'supportingDocuments') {
        // console.log(uploadData)
        cvRecord[type] = _.map(uploadData.fileList, x => x.response)
      }

      await Request.editContact(cvRecord)
      notification.success({ message: 'New Data Uploaded', description: 'Reload to view' })

      this.setState({
        uploadData: null,
        cvRecord: null,
        visible3: false,
        visible4: false
      })

      resolve()

    })
  }

  changeSpeakerCap = async (checked, record) => {

    let {
      changes,
      dataSource1,
      dataSource2,
      dataSource3,
      dataSource4
    } = this.state

    this.setState({
      loading: true
    })

    let data1 = _.clone(dataSource1)
    let data2 = _.clone(dataSource2)
    let data3 = _.clone(dataSource3)
    let data4 = _.clone(dataSource4)


    let x = _.find(data1, x => x._id == record._id)
    if (x) {
      x.override1 = checked
      this.setState({
        dataSource1: data1
      })
    }

    x = _.find(data2, x => x._id == record._id)
    if (x) {
      x.override1 = checked
      this.setState({
        dataSource2: data2
      })
    }

    x = _.find(data3, x => x._id == record._id)
    if (x) {
      x.override1 = checked
      this.setState({
        dataSource3: data3
      })
    }

    x = _.find(data4, x => x._id == record._id)
    if (x) {
      x.override1 = checked
      this.setState({
        dataSource4: data4
      })
    }


    this.changeValues({
      _id: record._id,
      type: 'temp',
      value: 'NA'
    })

    this.setState({
      loading: false
    })

  }

  render () {

    const {
      loading, visible, visible2, visible3, visible4,
      dataSource1, dataSource2, dataSource3, dataSource4,
      editContact, columns, disabled, showingAll, editingSpeaker,
      columns2
    }
      = this.state
    const { dispatch } = this.props
    const Edit = editContact

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
      <PageHeaderWrapper title={'HCP Engagements'}>

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
              }}>Add Contact</Button>

              {/* <Button type="dashed" onClick={() => {
                this.setState({
                  visible2: true
                })
              }}>Upload Contacts</Button>*/}

            </Col>

            <Col span={16} style={{ textAlign: 'right' }}>
              {!Edit ?
                <Button type="primary"
                        onClick={() => {

                          // dispatch({
                          //   type: 'TOOGLE_EDIT_SPEAKER',
                          //   editContact: true
                          // })
                          // dispatch(getUrlPushWrapper('speakerEdit'))

                          this.setState({
                            editContact: true
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
                        editContact: false
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


          <Tabs defaultActiveKey="1">
            <TabPane tab="Speakers" key="1"><Table
              reloadButon={false}
              scroll={{ x: true }}
              rowKey={record => record._id}
              bordered
              loading={loading}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 100,
                pageSizeOptions: ['10', '20', '50', '100', '1000']
              }}
              columns={columns}
              dataSource={dataSource1}


            /></TabPane>
            <TabPane tab="Advisory Boards" key="2"><Table
              reloadButon={false}
              scroll={{ x: true }}
              rowKey={record => record._id}
              bordered
              loading={loading}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 100,
                pageSizeOptions: ['10', '20', '50', '100', '1000']
              }}
              columns={columns2}
              dataSource={dataSource2}


            /></TabPane>
            <TabPane tab="Consulting Arrangements" key="3"><Table
              reloadButon={false}
              scroll={{ x: true }}

              rowKey={record => record._id}
              bordered
              loading={loading}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 100,
                pageSizeOptions: ['10', '20', '50', '100', '1000']
              }}
              columns={columns2}
              dataSource={dataSource3}


            /></TabPane>
            <TabPane tab="Other HCP Engagements" key="4"><Table
              reloadButon={false}
              scroll={{ x: true }}
              rowKey={record => record._id}
              bordered
              loading={loading}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 100,
                pageSizeOptions: ['10', '20', '50', '100', '1000']
              }}
              columns={columns2}
              dataSource={dataSource4}


            /></TabPane>

          </Tabs>

        </Card>

        <Drawer
          title="Add Contact"
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

          <AddContact loading={loading}
                      values={editingSpeaker}
                      onSubmit={(valData) => {
                        this.add(valData)
                      }}/>

        </Drawer>

        <Drawer
          title="Upload  CSV "
          placement="right"
          closable={true}
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

          </div>

          <a href={`${apiUrl}/sample.csv`} style={{ marginTop: 10 }}>
            Download Sample File
          </a>

        </Drawer>


        <Drawer
          title="Add CV "
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({
              visible3: false
            })
          }}

          visible={visible3}
        >

          <div className={styles.drawerWrapper}>
            <Upload {...uploadprops}>
              <Button>
                <Icon type="upload"/> Click to Upload
              </Button>
            </Upload>

            <Button type={'primary'}
                    onClick={() => {
                      this.uploadCVRequest('cv')
                    }}
                    disabled={disabled} style={{ marginTop: 20 }}>
              Upload CV
            </Button>

            <Button type={'danger'} onClick={() => {
              this.setState({
                visible3: false
              })
            }} style={{ marginTop: 20, marginLeft: 8 }}>
              Close
            </Button>

          </div>

        </Drawer>

        <Drawer
          title="Add Supporting Documents "
          placement="right"
          closable={true}
          onClose={() => {
            this.setState({
              visible4: false
            })
          }}

          visible={visible4}
        >

          <div className={styles.drawerWrapper}>
            <Upload {...uploadprops}>
              <Button>
                <Icon type="upload"/> Click to Upload
              </Button>
            </Upload>

            <Button type={'primary'}
                    onClick={() => {
                      this.uploadCVRequest('supportingDocuments')
                    }}
                    disabled={disabled} style={{ marginTop: 20 }}>
              Upload Supporting Documents
            </Button>

            <Button type={'danger'} onClick={() => {
              this.setState({
                visible4: false
              })
            }} style={{ marginTop: 20, marginLeft: 8 }}>
              Close
            </Button>

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
)(ContactsView)
