import {push} from 'connected-react-router'
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
        'path': '/plant',
        'name': 'Plants',
        'icon': 'alert',
        'key': 'plants',
        'component': Undercons,
        'authority': [
            'user',
            'admin'
        ],
        'children': [
            {
                'path': '/plant/add',
                'name': 'Add Plant',
                'title': 'Add Plant',
                'component': AddUsers,
                'authority': [
                    'user'
                ]
            },
            {
                'path': '/plant/all',
                'name': 'All Plants',
                'title': 'All Plants',
                'component': AllUsers
            }
        ]
    },
    {
        'path': '/chillingcenter',
        'name': 'Chilling Centers',
        'icon': 'alert',
        'key': 'chillingCenters',
        'component': Undercons,
        'authority': [
            'user',
            'admin'
        ],
        'children': [
            {
                'path': '/ChillingCenter/add',
                'name': 'Add Chilling Centers',
                'title': 'Add Chilling Centers',
                'component': AddUsers,
                'authority': [
                    'user'
                ]
            },
            {
                'path': '/ChillingCenter/all',
                'name': 'All Chilling Centers',
                'title': 'All Chilling Centers',
                'component': AllUsers
            }
        ]
    },
    {
        'path': '/institution',
        'name': 'Institution / Company',
        'icon': 'user',
        'key': 'institution',
        'component': Undercons,
        'authority': [
            'admin',
            'user'
        ],
        'children': [
            {
                'path': '/institution/add',
                'name': 'Add Institution / Company',
                'title': 'Add Institution / Company',
                'component': AddInstitution
            },
            {
                'path': '/institution/all',
                'name': 'All Institution / Company',
                'title': 'All Institution / Company',
                'component': AllInstitution
            },
            {
                key: 'edit',
                'path': '/institution/edit/:id',
                'name': 'Edit Institution / Company',
                'title': 'Edit Institution / Company',
                'component': AddInstitution,
                dontShowOnMenu: true

            }
        ]
    },
    {
        'path': '/contact',
        'name': 'mcontact menu ',
        'icon': 'user',
        'key': 'contact',
        'component': Undercons,
        'authority': [
            'admin',
            'user'
        ],
        'children': [
            {
                'path': '/contact/add',
                'name': 'add coantct ',
                'title': 'add contact ',
                'component': contact
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
                'name': 'list Make/Brand ',
                'title': 'list Make / Brand ',
                'component': listMakes
            },
            {
                key: 'editMake',
                'path': '/make/edit/:id',
                'name': 'Edit Make/Brand ',
                'title': 'Edit Make / Brand ',
                'component': AddMakes
            }
        ]
    },
    {
        'path': '/models',
        'name': 'model ',
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
                'name': 'list Model ',
                'title': 'list Model ',
                'component': listModel
            },
            {
                key: 'editModel',
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
                'name': 'Add fuel ',
                'title': 'Add fuel ',
                'component': AddFuel
            },
            {
                key: 'listFuel',
                'path': '/fuelType/list',
                'name': 'list Fuel ',
                'title': 'list FuelType ',
                'component': listFuel
            },
            {
                key: 'editFuel',
                'path': '/fuel/edit/:id/:makeId/:modelId',
                'name': 'Edit Fuel ',
                'title': 'Edit Fuel ',
                'component': AddFuel
            }
        ]
    },
    {
        'path': '/variant',
        'name': 'variant ',
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
                'name': 'Add variant ',
                'title': 'Add variant ',
                'component': AddVariant
            },
            {
                key: 'listVariant',
                'path': '/variant/list',
                'name': 'list variant ',
                'title': 'list variantName ',
                'component': listVariant
            },
            {
                key: 'editVariant',
                'path': '/variant/edit/:id/:makeId/:modelId/:fuelId',
                'name': 'edit Variant  ',
                'title': 'edit Variant ',
                'component': AddVariant
            }
        ]
    },
    {
        'path': '/cars',
        'name': 'Cars ',
        'icon': 'settings',
        'key': 'cars',
        'component': Undercons,
        'authority': [
            'admin',
            'user'
        ],
        'children': [
            {
                'path': '/car/add',
                'name': 'Add Car ',
                'title': 'Add Car ',
                'component': AddCar
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

