import React from 'react'
import { Route, Link } from 'react-router-dom'
import memoizeOne from 'memoize-one'

import Home from '../home'
import About from '../about'
import Dashboard from '../dashboard'
import UserLayout from '../../layouts/UserLayout'
import PublicLayout from '../../layouts/PublicLayout'
import AuthLayout from '../../layouts/AuthLayout'
import BasicLayout from '../../layouts/BasicLayout'

import publicRoutes from '../../routes/publicRoutes'
import authRoutes from '../../routes/authRoutes'
import _ from 'lodash'

const routes = [
  {
    'path': '/',
    'redirect': '/dashboard/analysis',
    'exact': true
  },
  {
    'path': '/dashboard',
    'name': 'dashboard',
    'icon': 'dashboard',
    'routes': [
      {
        'path': '/dashboard/analysis',
        'name': 'analysis',
        'exact': true
      },
      {
        'path': '/dashboard/monitor',
        'name': 'monitor',
        'exact': true
      },
      {
        'path': '/dashboard/workplace',
        'name': 'workplace',
        'exact': true
      },
      {}
    ]
  },
  {
    'path': '/form',
    'icon': 'form',
    'name': 'form',
    'routes': [
      {
        'path': '/form/basic-form',
        'name': 'basicform',
        'exact': true
      },
      {
        'path': '/form/step-form',
        'name': 'stepform',
        'hideChildrenInMenu': true,
        'routes': [
          {
            'path': '/form/step-form',
            'redirect': '/form/step-form/info',
            'exact': true
          },
          {
            'path': '/form/step-form/info',
            'name': 'info',
            'exact': true
          },
          {
            'path': '/form/step-form/confirm',
            'name': 'confirm',
            'exact': true
          },
          {
            'path': '/form/step-form/result',
            'name': 'result',
            'exact': true
          },
          {}
        ]
      },
      {
        'path': '/form/advanced-form',
        'name': 'advancedform',
        'authority': [
          'admin'
        ],
        'exact': true
      },
      {}
    ]
  },
  {
    'path': '/list',
    'icon': 'table',
    'name': 'list',
    'routes': [
      {
        'path': '/list/table-list',
        'name': 'searchtable',
        'exact': true
      },
      {
        'path': '/list/basic-list',
        'name': 'basiclist',
        'exact': true
      },
      {
        'path': '/list/card-list',
        'name': 'cardlist',
        'exact': true
      },
      {
        'path': '/list/search',
        'name': 'searchlist',
        'routes': [
          {
            'path': '/list/search',
            'redirect': '/list/search/articles',
            'exact': true
          },
          {
            'path': '/list/search/articles',
            'name': 'articles',
            'exact': true
          },
          {
            'path': '/list/search/projects',
            'name': 'projects',
            'exact': true
          },
          {
            'path': '/list/search/applications',
            'name': 'applications',
            'exact': true
          },
          {}
        ]
      },
      {}
    ]
  },
  {
    'path': '/profile',
    'name': 'profile',
    'icon': 'profile',
    'routes': [
      {
        'path': '/profile/basic',
        'name': 'basic',
        'exact': true
      },
      {
        'path': '/profile/advanced',
        'name': 'advanced',
        'authority': [
          'admin'
        ],
        'exact': true
      },
      {}
    ]
  },
  {
    'name': 'result',
    'icon': 'check-circle-o',
    'path': '/result',
    'routes': [
      {
        'path': '/result/success',
        'name': 'success',
        'exact': true
      },
      {
        'path': '/result/fail',
        'name': 'fail',
        'exact': true
      },
      {}
    ]
  },
  {
    'name': 'exception',
    'icon': 'warning',
    'path': '/exception',
    'routes': [
      {
        'path': '/exception/403',
        'name': 'not-permission',
        'exact': true
      },
      {
        'path': '/exception/404',
        'name': 'not-find',
        'exact': true
      },
      {
        'path': '/exception/500',
        'name': 'server-error',
        'exact': true
      },
      {
        'path': '/exception/trigger',
        'name': 'trigger',
        'hideInMenu': true,
        'exact': true
      },
      {}
    ]
  },
  {
    'name': 'account',
    'icon': 'user',
    'path': '/account',
    'routes': [
      {
        'path': '/account/center',
        'name': 'center',
        'routes': [
          {
            'path': '/account/center',
            'redirect': '/account/center/articles',
            'exact': true
          },
          {
            'path': '/account/center/articles',
            'exact': true
          },
          {
            'path': '/account/center/applications',
            'exact': true
          },
          {
            'path': '/account/center/projects',
            'exact': true
          },
          {}
        ]
      },
      {
        'path': '/account/settings',
        'name': 'settings',
        'routes': [
          {
            'path': '/account/settings',
            'redirect': '/account/settings/base',
            'exact': true
          },
          {
            'path': '/account/settings/base',
            'exact': true
          },
          {
            'path': '/account/settings/security',
            'exact': true
          },
          {
            'path': '/account/settings/binding',
            'exact': true
          },
          {
            'path': '/account/settings/notification',
            'exact': true
          },
          {}
        ]
      },
      {}
    ]
  },
  {
    'exact': true
  },
  {}
]

const menuData = [
  {
    'path': '/dashboard',
    'name': 'Dashboard',
    'icon': 'dashboard',
    'locale': 'menu.dashboard',
    'authority': [
      'admin',
      'user'
    ],
    'children': [
      {
        'path': '/dashboard/analysis',
        'name': 'Analysis',
        'exact': true,
        'locale': 'menu.dashboard.analysis'
      },
      {
        'path': '/dashboard/monitor',
        'name': 'Monitor',
        'exact': true,
        'locale': 'menu.dashboard.monitor'
      },
      {
        'path': '/dashboard/workplace',
        'name': 'Workplace',
        'exact': true,
        'locale': 'menu.dashboard.workplace'
      }
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
      'admin',
      'user'
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

const App = () => (
  <div>

    <Route exact path="/" render={(route) => {
      return (
        <div>go to /dashboard/monitor</div>
      )
    }}/>

    <Route exact path="/dashboard/monitor" render={(route) => {
      return (
        <BasicLayout
          // collapsed={false}
          // fixSiderbar={true}
          // theme={'dark'}

          location={window.location}
          menuData={menuData}
          route={{
            routes: routes
          }}>

          <Dashboard/>

        </BasicLayout>
      )
    }}/>

    {_.map(publicRoutes, (route, key) => {
      const { component, path } = route
      return (
        <Route
          exact
          path={path}
          key={key}
          render={(r) => <PublicLayout route={r}>
            <route.component/>
          </PublicLayout>}
        />
      )
    })}

    {_.map(authRoutes, (route, key) => {
      const { component, path } = route
      return (
        <Route
          exact
          path={path}
          key={key}
          render={(r) => <AuthLayout route={r}>
            <route.component/>
          </AuthLayout>}
        />
      )
    })}

  </div>
)

export default App

