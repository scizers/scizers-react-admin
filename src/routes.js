import { push } from 'connected-react-router'
import _ from 'lodash'
import Path from 'path-parser'

import Dashboard from './containers/dashboard'
import Undercons from './containers/undercons'
import AllUsers from './containers/users/all'
import AddUsers from './containers/users/add'

import Budget from './containers/budget'
import BudgetNeeds from './containers/budget/needs'
import BudgetNeedsSingle from './containers/budget/single'
import BudgetAdd from './containers/budget/add'
import Speaker from './containers/speakers'
import AdvisoryBoard from './containers/advisoryBoard'
import BudgetContacts from './containers/budgetContacts'
import Contacts from './containers/contacts'

const menu = [

  {
    'path': '/needs',
    'name': 'Needs Analysis',
    'icon': 'user',
    'key': 'needs',
    'homepage': true,
    'component': BudgetNeeds,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/needs/:id',
    dontShowOnMenu: true,
    'name': 'Needs Analysis',
    'icon': 'user',
    'key': 'needsSingle',
    'homepage': true,
    'component': BudgetNeedsSingle,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/budget',
    'name': 'Annual Brand Budget',
    'icon': 'user',
    'key': 'budget',
    'homepage': true,
    'component': Budget,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/budget/:type',
    'name': 'Speakers Bureau Budget',
    'icon': 'user',
    'key': 'budgetspeaker',
    'component': BudgetContacts,
    'authority': [
      'admin',
      'user'
    ],
    dontShowOnMenu: true
  },
  {
    'path': '/contacts',
    'name': 'HCP Engagements',
    'icon': 'user',
    'key': 'allContacts',
    // dontShowOnMenu: true,

    'component': Contacts,
    'authority': [
      'admin',
      'user'
    ]
  },

  {
    'path': '/speaker',
    'name': 'Speaker Bureau FMV',
    'icon': 'user',
    'key': 'speaker',
    dontShowOnMenu: true,
    'component': Speaker,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/speaker/all',
    'name': 'All Speakers',
    'icon': 'user',
    'key': 'speakerall',
    dontShowOnMenu: true,
    'component': Speaker,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/adviser',
    'name': 'Advisory Board',
    'icon': 'user',
    dontShowOnMenu: true,
    'key': 'adviser',
    'component': AdvisoryBoard,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/adviser/all',
    'name': 'All Advisory Board',
    'icon': 'user',
    'key': 'advisoryBoardall',
    dontShowOnMenu: true,
    'component': AdvisoryBoard,
    'authority': [
      'admin',
      'user'
    ]
  },
  {
    'path': '/settings',
    'name': 'Settings',
    'icon': 'user',
    'key': 'settings',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/settings/addBudget',
        'name': 'Add Budget Tactic',
        'title': 'Add Budget Tactic',
        'key': 'addbudget',
        'component': BudgetAdd
      },
      {
        'path': '/settings/editBudget/:id',
        'name': 'Edit Budget Tactic',
        'title': 'Edit Budget Tactic',
        'key': 'editBudget',
        dontShowOnMenu: true,
        'component': BudgetAdd
      }
    ]

  },
  {
    'path': '/users',
    'name': 'Users',
    'icon': 'user',
    'key': 'users',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/users/add',
        'name': 'Add User',
        'title': 'Add User',
        'component': AddUsers
      },
      {
        'path': '/users/all',
        'name': 'All Users',
        'title': 'All Users',
        'component': AllUsers
      }
    ]
  }


]

//<editor-fold desc="Functions Exports">
export const getUrlPushWrapper = (keyString, query) => {
  return push(getUrlPath(keyString, query))
}

export const getUrlPath = (keyString, params) => {

  if (!params) params = {}

  let keyArr = keyString.split('.')

  let val = _.find(menu, p => p.key === keyArr[0])

  if (!val) {
    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')

  return `${val.path}?${queryString}`
}

export const getPushPathWrapper = (keyString, params) => {

  let obj = getUrlObject(keyString)

  if (obj) {
    const path = new Path(obj.path)

    return push(path.build(params))
  }

  return 'error'
}

export const getUrlParams = (keyString, route) => {

  let obj = getUrlObject(keyString)

  if (obj) {
    const path = new Path(obj.path)

    return path.test(route)
  }

  return { error: true }
}

export const getUrlObject = (keyString) => {

  let keyArr = keyString.split('.')

  let val = _.find(menu, p => p.key === keyArr[0])

  if (!val) {
    return `/`
  }

  if (keyArr.length === 2) {
    val = _.find(val.children, p => p.key === keyArr[1])
  }

  if (!val) {
    return `/`
  }

  return val
}
//</editor-fold>

export default menu

