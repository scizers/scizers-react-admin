import { push } from 'connected-react-router'
import _ from 'lodash'
import Path from 'path-parser'

import Dashboard from './containers/dashboard'
import Undercons from './containers/undercons'
import AllUsers from './containers/users/all'
import AddUsers from './containers/users/add'


import AddInstitution from './containers/institution/add'
import AllInstitution from './containers/institution/all'
import contact from './containers/contacts/add'

import listMakes from './containers/makesAndModels/all'
import listModel from './containers/Models/all'

import AddMakes from './containers/makesAndModels/add'
import AddCar from './containers/car/add'
import AddModel from './containers/Models/add'
import AddFuel from './containers/fuel/add'
import listFuel from './containers/fuel/all'
import AddVariant from './containers/variant/add'
import listVariant from './containers/variant/all'
import listDealer from './containers/Dealer/all'
import listRequirement from './containers/Requirement/all'


import listCars from './containers/car/all'

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
  },
  {
    'path': '/makesAndModels',
    'name': 'Makes and model ',
    'icon': 'settings',
    'key': 'makesandmodels',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/make/add',
        'name': 'Add Make/Brand ',
        'title': 'Add Make / Brand ',
        'component': AddMakes
      },
      {
        key: 'listMake',
        'path': '/make/list',
        'name': 'List Make/Brand ',
        'title': 'list Make / Brand ',
        'component': listMakes
      },
      {
        key: 'editMake',
        dontShowOnMenu : true,
        'path': '/make/edit/:id',
        'name': 'Edit Make/Brand ',
        'title': 'Edit Make / Brand ',
        'component': AddMakes
      }
    ]
  },
  {
    'path': '/models',
    'name': 'Model ',
    'icon': 'settings',
    'key': 'models',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/model/add',
        'name': 'Add Model ',
        'title': 'Add Model ',
        'component': AddModel
      },
      {
        key: 'listModel',
        'path': '/model/list',
        'name': 'List Model ',
        'title': 'list Model ',
        'component': listModel
      },
      {
        key: 'editModel',
        dontShowOnMenu : true,
        'path': '/model/edit/:id/:makeId',
        'name': 'Edit Model ',
        'title': 'Edit Model ',
        'component': AddModel
      }
    ]
  },
  {
    'path': '/fuel',
    'name': 'Fuel ',
    'icon': 'settings',
    'key': 'fuel',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/fuel/add',
        'name': 'Add Fuel ',
        'title': 'Add fuel ',
        'component': AddFuel
      },
      {
        key: 'listFuel',
        'path': '/fuelType/list',
        'name': 'List Fuel ',
        'title': 'list FuelType ',
        'component': listFuel
      },
      {
        key: 'editFuel',
        dontShowOnMenu : true,
        'path': '/fuel/edit/:id/:makeId/:modelId',
        'name': 'Edit Fuel ',
        'title': 'Edit Fuel ',
        'component': AddFuel
      }
    ]
  },
  {
    'path': '/variant',
    'name': 'Variant ',
    'icon': 'settings',
    'key': 'variant',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/variant/add',
        'name': 'Add Variant ',
        'title': 'Add variant ',
        'component': AddVariant
      },
      {
        key: 'listVariant',
        'path': '/variant/list',
        'name': 'List Variant ',
        'title': 'list variantName ',
        'component': listVariant
      },
      {
        key: 'editVariant',
        dontShowOnMenu : true,
        'path': '/variant/edit/:id/:makeId/:modelId/:fuelId',
        'name': 'Edit Variant  ',
        'title': 'edit Variant ',
        'component': AddVariant
      }
    ]
  },
  {
    'path': '/cars',
    'name': 'Cars ',
    'icon': 'car',
    'key': 'cars',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [

      {
        key: 'listCars',
        'path': '/cars/list',
        'name': 'List Cars ',
        'title': 'list Cars ',
        'component': listCars
      },
      {
        key: 'dealercars',
        dontShowOnMenu : true,
        'path': '/cars/dealercars/:id',
        'name': 'List Cars ',
        'title': 'list Cars ',
        'component': listCars
      }
    ]
  },
  {
    'path': '/dealers',
    'name': 'Dealers ',
    'icon': 'user',
    'key': 'dealers',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [

      {
        key: 'listDealers',
        'path': '/dealers/list',
        'name': 'List Dealers ',
        'title': 'list Dealers ',
        'component': listDealer
      }
    ]
  },
  {
    'path': '/requirements',
    'name': 'Requirements ',
    'icon': 'settings',
    'key': 'requirements',
    'component': Undercons,
    'authority': [
      'admin',
      'user'
    ],
    'children': [

      {
        key: 'listRequirement',
        'path': '/requirement/list',
        'name': 'List Requirements ',
        'title': 'list Requirement ',
        'component': listRequirement
      },
      {
        key: 'dealerRequirements',
        dontShowOnMenu : true,
        'path': '/cars/dealerRequirements/:id',
        'name': 'List Requirements ',
        'title': 'list requirement ',
        'component': listRequirement
      }
    ]
  },
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

    return {error: true}
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

