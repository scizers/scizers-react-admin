import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import memoizeOne from 'memoize-one'

import Home from '../home'
import About from '../about'
import AddWebsite from '../websites/add'
import AllWebsite from '../websites/all'
// import EditWebsite from '../websites/add'
import Dashboard from '../dashboard'
import NewPage from '../newpage'
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
    'path': '/websites',
    'icon': 'chrome',
    'name': 'Websites',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/websites/add-website',
        'name': 'Add Website',
        'title': 'Add Website',
        'component': AddWebsite
      },
      {
        'path': '/websites/all-website',
        'name': 'All Website',
        'title': 'All Website',
        'component': AllWebsite
      },
      {
        'path': '/websites/website',
        'name': 'Single Website',
        'title': 'Single Website',
        'component': AddWebsite,
        'dontShowOnMenu': true
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
        pageTitle={`${menuItem.title} - Scizers Portfolio App`}
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
      user: (localStorage.getItem('user') != 'undefined') ? JSON.parse(localStorage.getItem('user')) : null
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

