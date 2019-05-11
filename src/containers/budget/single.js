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
import { getPushPathWrapper, getUrlParams } from '../../routes'
import renderHTML from 'react-render-html'
import Currency from 'react-currency-formatter'

const TabPane = Tabs.TabPane
const COUNT = 2

class BudgetView extends Component {

  state = {
    id: null,
    data: [],
    data2: null,
    loading: true
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {

    let data = getUrlParams('needsSingle', this.props.pathname)

    if (!!data && data.id) {
      this.setState({
        id: data.id
      })

      this.apiRequest(data.id)

    }

  }

  apiRequest = async (id) => {
    this.setState({
      loading: true
    })

    let { data, error } = await Request.getBudget()

    let data2 = _.find(data, x => x._id == id)

    if (!error) {
      this.setState({
        data,
        data2,
        loading: false
      })
    }
  }

  render () {

    const { data, data2: val, loading } = this.state
    const { dispatch } = this.props
    return (
      <PageHeaderWrapper
        title={'Budget'}>

        <Card bordered={true}>

          {!loading && <Card className={'scrollCard'}>

            <div className={'test'} style={{ float: 'right' }}>


              <Button shape="circle"
                      onClick={() => {
                        dispatch(getPushPathWrapper('settings.editBudget', { id: val._id }))
                      }} icon="edit"/>

            </div>


            <table className={styles.tableNeeds}>
              <tbody>

              <tr>
                <td>Allocated Budget</td>
                <td><p className={styles.price}>
                  <Currency
                    quantity={val.allocatedBudget}
                    currency="USD"
                  />
                </p>
                </td>
              </tr>

              <tr>
                <td>Actual Budget</td>
                <td>
                  <p className={styles.price}><Currency
                    quantity={val.actualBudget}
                    currency="USD"
                  /></p>
                </td>
              </tr>

              {val.customItems.map((x, key) => {
                return <React.Fragment key={key}>
                  <tr>
                    <td>{x.name}</td>
                    <td>{x.value ? <p className={styles.price}><Currency
                      quantity={x.value}
                      currency="USD"
                    /></p> : renderHTML(x.desc)}</td>
                    <td>
                      <Button type={'dashed'} size={'small'} onClick={() => {

                        let ssd = _.clone(this.state.data2)

                        _.each(ssd.customItems, (v, k) => {

                          if (k === key) {
                            v.showMore = !v.showMore
                          }
                        })

                        this.setState({
                          data2: ssd
                        })

                        // x.showMore


                      }}>{x.showMore ? 'Show Less' : 'Show More'}</Button>
                    </td>
                  </tr>
                  {x.showMore && x.desc && x.value &&
                  <tr>
                    <td></td>
                    <td>{renderHTML(x.desc)}</td>
                  </tr>
                  }
                </React.Fragment>
              })}

              </tbody>
            </table>

            <div className={'test'} style={{ textAlign: 'center' }}>


              <Button type={'primary'}>Save</Button>
              <Button type={'primary'}>Submit</Button>


            </div>


          </Card>}


        </Card>

      </PageHeaderWrapper>)

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
)(BudgetView)
