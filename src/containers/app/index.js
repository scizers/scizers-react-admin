import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import memoizeOne from 'memoize-one'

import Home from '../home'
import About from '../about'
import Dashboard from '../dashboard'
import Exception from '../../components/Exception'

import AuthLayout from '../../layouts/AuthLayout'
import BasicLayout from '../../layouts/BasicLayout'
import Login from '../../containers/login'

import publicRoutes from '../../routes/publicRoutes'
import authRoutes from '../../routes/authRoutes'
import _ from 'lodash'

const menuData = [
  {
    'path': '/dashboard',
    'name': 'Dashboard',
    'icon': 'dashboard',
    'locale': 'menu.dashboard',
    'homepage': true,
    'component': Dashboard,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/form',
    'icon': 'form',
    'name': 'Form',
    'locale': 'menu.form',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/form/basic-form',
        'name': 'Basic Form',
        'exact': true,
        'locale': 'menu.form.basicform'
      },
      {
        'path': '/form/step-form',
        'name': 'Step Form',
        'hideChildrenInMenu': true,
        'locale': 'menu.form.stepform',
        'children': [
          {
            'path': '/form/step-form/info',
            'name': 'Step Form(write transfer information)',
            'exact': true,
            'locale': 'menu.form.stepform.info'
          },
          {
            'path': '/form/step-form/confirm',
            'name': 'Step Form(confirm transfer information)',
            'exact': true,
            'locale': 'menu.form.stepform.confirm'
          },
          {
            'path': '/form/step-form/result',
            'name': 'Step Form(finished)',
            'exact': true,
            'locale': 'menu.form.stepform.result'
          }
        ]
      },
      {
        'path': '/form/advanced-form',
        'name': 'Advanced Form',
        'authority': [
          'admin'
        ],
        'exact': true,
        'locale': 'menu.form.advancedform'
      }
    ]
  },
  {
    'path': '/list',
    'icon': 'table',
    'name': 'List',
    'locale': 'menu.list',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/list/table-list',
        'name': 'Search Table',
        'exact': true,
        'locale': 'menu.list.searchtable'
      },
      {
        'path': '/list/basic-list',
        'name': 'Basic List',
        'exact': true,
        'locale': 'menu.list.basiclist'
      },
      {
        'path': '/list/card-list',
        'name': 'Card List',
        'exact': true,
        'locale': 'menu.list.cardlist'
      },
      {
        'path': '/list/search',
        'name': 'Search List',
        'locale': 'menu.list.searchlist',
        'children': [
          {
            'path': '/list/search/articles',
            'name': 'Search List(articles)',
            'exact': true,
            'locale': 'menu.list.searchlist.articles'
          },
          {
            'path': '/list/search/projects',
            'name': 'Search List(projects)',
            'exact': true,
            'locale': 'menu.list.searchlist.projects'
          },
          {
            'path': '/list/search/applications',
            'name': 'Search List(applications)',
            'exact': true,
            'locale': 'menu.list.searchlist.applications'
          }
        ]
      }
    ]
  },
  {
    'path': '/profile',
    'name': 'Profile',
    'icon': 'profile',
    'locale': 'menu.profile',
    'authority': [
      'admin'
    ],
    'children': [
      {
        'path': '/profile/basic',
        'name': 'Basic Profile',
        'exact': true,
        'locale': 'menu.profile.basic'
      },
      {
        'path': '/profile/advanced',
        'name': 'Advanced Profile',
        'authority': [
          'admin'
        ],
        'exact': true,
        'locale': 'menu.profile.advanced'
      }
    ]
  },
  {
    'name': 'Result',
    'icon': 'check-circle-o',
    'path': '/result',
    'locale': 'menu.result',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/result/success',
        'name': 'Success',
        'exact': true,
        'locale': 'menu.result.success'
      },
      {
        'path': '/result/fail',
        'name': 'Fail',
        'exact': true,
        'locale': 'menu.result.fail'
      }
    ]
  },
  {
    'name': 'Exception',
    'icon': 'warning',
    'path': '/exception',
    'locale': 'menu.exception',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/exception/403',
        'name': '403',
        'exact': true,
        'locale': 'menu.exception.not-permission'
      },
      {
        'path': '/exception/404',
        'name': '404',
        'exact': true,
        'locale': 'menu.exception.not-find'
      },
      {
        'path': '/exception/500',
        'name': '500',
        'exact': true,
        'locale': 'menu.exception.server-error'
      }
    ]
  },
  {
    'name': 'Account',
    'icon': 'user',
    'path': '/account',
    'locale': 'menu.account',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/account/center',
        'name': 'Account Center',
        'locale': 'menu.account.center',
        'children': []
      },
      {
        'path': '/account/settings',
        'name': 'Account Settings',
        'locale': 'menu.account.settings',
        'children': []
      }
    ]
  }
]

const Exp = () => (<Exception
  type="404"
  desc={'You Seems lost !!'}
  linkElement={Link}
  redirect={'/dashboard'}
  backText={'Go To Homepage?'}
/>)

const Exp403 = () => (<Exception
  type="403"
  desc={'Sorry You Don\'t have access to this area !!'}
  linkElement={Link}
  redirect={'/dashboard'}
  backText={'Go To Homepage?'}
/>)

class BasicLayoutWrapper extends Component {
  render () {
    const { menuData, component, path, user } = this.props

    if (!user) {
      return (<Redirect to="/login"/>)
    }

    let menuItem = _(menuData)
      .thru(function(coll) {
        return _.union(coll, _.map(coll, 'children'))
      })
      .flatten()
      .find({ 'path': path })


    if (menuItem.authority !== undefined && menuItem.authority.indexOf(user.userType) === -1) {
      console.log('this user should not be here ', path)
      return <Exp403/>
    }


    return (
      <BasicLayout
        location={window.location}
        menuData={menuData}>
        {!!component ? <this.props.component/> : <Exp/>}
      </BasicLayout>)
  }
}


class App extends Component {

  constructor (props) {

    super(props)
    this.state = {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    }

  }

  render () {

    const { user } = this.state

    return (
      <div>

        <Route exact path="/form/basic-formsdf" render={(route) => {
          return (
            <div>
              asdfsdf
              {menuData.map((item, key) => {
                // console.log(item.children)
                if (item.children) {
                  return item.children.map((child, k) => {
                    console.log(child.path)
                    return (
                      <div key={item.children}>
                        {child.path}
                      </div>
                    )
                  })
                }
              })}
            </div>
          )
        }}/>

        {menuData.map((item, key) => {
          if (!item.children) {
            return (<Route exact path={item.path} key={item.path} render={(route) => {
              return <BasicLayoutWrapper component={item.component} path={item.path} user={user} menuData={menuData}/>
            }}/>)
          }
        })}

        {menuData.map((item, key) => {
          if (item.children) {
            return item.children.map((child, k) => {
              return (<Route exact path={child.path} key={child.path} render={(route) => {
                return <BasicLayoutWrapper component={child.component} path={child.path} user={user}
                                           menuData={menuData}/>
              }}/>)
            })
          }
        })}


        <Route exact path="/login" render={(route) => {
          return (
            <AuthLayout
              location={window.location}
              menuData={menuData}>
              <Login/>
            </AuthLayout>
          )
        }}/>

      </div>)
  }
}

export default App

