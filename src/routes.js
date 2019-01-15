import Dashboard from './containers/dashboard'
import WebsiteScreenShot from './containers/websites/screens'
import AddWebsite from './containers/websites/add'
import AllWebsite from './containers/websites/all'
import { push } from 'connected-react-router'
import _ from 'lodash'

const menu = [
  {
    'path': '/dashboard',
    'name': 'Dashboard',
    'icon': 'dashboard',
    'key': 'dashboard',
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
    'key': 'websites',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/websites/add-website',
        'name': 'Add Website',
        'title': 'Add Website',
        'key': 'add',
        'component': AddWebsite
      },
      {
        'path': '/websites/all-website',
        'name': 'All Website',
        'title': 'All Website',
        'component': AllWebsite
      },
      {
        'path': '/websites/edit-website',
        'name': 'Edit Website',
        'key': 'edit',
        'title': 'Edit Website',
        'component': AddWebsite,
        'dontShowOnMenu': true
      },
      {
        'path': '/websites/screen-website',
        'name': 'WebsiteScreenShot',
        'key': 'screenshots',
        'title': 'Website ScreenShots',
        'component': WebsiteScreenShot,
        'dontShowOnMenu': true
      }
    ]
  }
]

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

export default menu