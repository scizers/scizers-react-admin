import React, { Component } from 'react'
import PageHeaderWrapper from '../../components/PageHeaderWrapper'
import { TableComp } from 'sz-react-utils'
import {
  Table,
  Badge,
  Card,
  Tabs,
  Tooltip,
  notification,
  Switch,
  Input, Button, Icon
} from 'antd'
import Request from '../../request'
import Color from 'color'
import _ from 'lodash'
import Highlighter from 'react-highlight-words'
import styles from './styles.less'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
import update from 'immutability-helper'
import { getPushPathWrapper } from '../../routes'
import renderHTML from 'react-render-html'
import Currency from 'react-currency-formatter'

const TabPane = Tabs.TabPane
const COUNT = 2

class BudgetView extends Component {

  state = {
    data: [],
    loading: true
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.apiRequest()
  }

  apiRequest = async () => {
    this.setState({
      loading: true
    })

    let { data, error } = await Request.getBudget()

    let data2 = _.reject(data, (x, y) => {
      return y < COUNT
    })

    if (!error) {
      this.setState({
        data,
        data2,
        loading: false
      })
    }
  }

  render () {

    const { data, data2, loading } = this.state
    const { dispatch } = this.props
    return (
      <PageHeaderWrapper
        title={'Need Analysis'}>

        <Card bordered={true}>

          {!loading && <Tabs>

            {data && data.slice(0, COUNT).map((val, index) => {
              return <TabPane tab={val.tactic} key={index + 1}>

                <Card className={'scrollCard'}>

                  <div className={'test'} style={{ float: 'right' }}>

                    <Button>Save As Draft</Button>
                    <Button type={'primary'}>Save and Submit</Button>

                    <Button shape="circle"
                            onClick={() => {
                              dispatch(getPushPathWrapper('settings.editBudget', { id: val._id }))
                            }} icon="edit"/>

                  </div>


                  <table className={styles.tableNeeds}>
                    <tbody>

                    <tr>
                      <td>Budget</td>
                      <td><p className={styles.price}><Currency
                        quantity={val.allocatedBudget}
                        currency="USD"
                      /></p>
                      </td>
                    </tr>

                    {/*  <tr>
                      <td>Actual Budget</td>
                      <td>{val.actualBudget}</td>
                    </tr>*/}

                    {val.customItems.map((x, key) => {
                      return <React.Fragment key={key}>
                        <tr>
                          <td>{x.name}</td>
                          <td>{x.value ? <p className={styles.price}><Currency
                            quantity={x.value}
                            currency="USD"
                          /></p> : renderHTML(x.desc)}</td>
                        </tr>
                        {x.desc && x.value &&
                        <tr>
                          <td></td>
                          <td>{renderHTML(x.desc)}</td>
                        </tr>
                        }
                      </React.Fragment>
                    })}

                    </tbody>
                  </table>

                </Card>

              </TabPane>
            })}


            <TabPane tab={'Others'} key={COUNT + 1}>

              <Tabs tabPosition={'left'}>

                {data2 && data2.map((val, index) => {
                  return <TabPane tab={val.tactic} key={index + 1}>

                    <Card className={'scrollCard'}>

                      <div style={{ float: 'right' }}>

                        <Button>Save As Draft</Button>
                        <Button type={'primary'}>Save and Submit</Button>

                        <Button shape="circle"
                                onClick={() => {
                                  dispatch(getPushPathWrapper('settings.editBudget', { id: val._id }))
                                }} icon="edit"/>

                      </div>


                      <table className={styles.tableNeeds}>
                        <tbody>

                        <tr>
                          <td>Budget</td>
                          <td><p className={styles.price}><Currency
                            quantity={val.allocatedBudget}
                            currency="USD"
                          /></p></td>
                        </tr>

                        {/* <tr>
                          <td>Actual Budget</td>
                          <td>{val.actualBudget}</td>
                        </tr>*/}

                        {val.customItems.map((x, key) => {
                          return <React.Fragment key={key}>
                            <tr>
                              <td>{x.name}</td>
                              <td>{x.value ? x.value : renderHTML(x.desc)}</td>
                            </tr>
                            {x.desc && x.value &&
                            <tr>
                              <td></td>
                              <td>{renderHTML(x.desc)}</td>
                            </tr>
                            }
                          </React.Fragment>
                        })}

                        </tbody>
                      </table>
                    </Card>

                  </TabPane>
                })}

              </Tabs>

            </TabPane>

          </Tabs>}


        </Card>

      </PageHeaderWrapper>)

  }
}


const mapStateToProps = ({ global }) => ({
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
)(BudgetView)
