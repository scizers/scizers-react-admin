import React from 'react'
import {Route, Link} from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Dashboard from '../dashboard'
import UserLayout from '../../layouts/UserLayout'
import PublicLayout from '../../layouts/PublicLayout'
import AuthLayout from '../../layouts/AuthLayout'

import publicRoutes from "../../routes/publicRoutes";
import authRoutes from "../../routes/authRoutes";
import _ from 'lodash';

const routes = [
    {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
    },
    {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
            {
                "path": "/dashboard/analysis",
                "name": "analysis",
                "exact": true
            },
            {
                "path": "/dashboard/monitor",
                "name": "monitor",
                "exact": true
            },
            {
                "path": "/dashboard/workplace",
                "name": "workplace",
                "exact": true
            },
            {}
        ]
    },
    {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
            {
                "path": "/form/basic-form",
                "name": "basicform",
                "exact": true
            },
            {
                "path": "/form/step-form",
                "name": "stepform",
                "hideChildrenInMenu": true,
                "routes": [
                    {
                        "path": "/form/step-form",
                        "redirect": "/form/step-form/info",
                        "exact": true
                    },
                    {
                        "path": "/form/step-form/info",
                        "name": "info",
                        "exact": true
                    },
                    {
                        "path": "/form/step-form/confirm",
                        "name": "confirm",
                        "exact": true
                    },
                    {
                        "path": "/form/step-form/result",
                        "name": "result",
                        "exact": true
                    },
                    {}
                ]
            },
            {
                "path": "/form/advanced-form",
                "name": "advancedform",
                "authority": [
                    "admin"
                ],
                "exact": true
            },
            {}
        ]
    },
    {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
            {
                "path": "/list/table-list",
                "name": "searchtable",
                "exact": true
            },
            {
                "path": "/list/basic-list",
                "name": "basiclist",
                "exact": true
            },
            {
                "path": "/list/card-list",
                "name": "cardlist",
                "exact": true
            },
            {
                "path": "/list/search",
                "name": "searchlist",
                "routes": [
                    {
                        "path": "/list/search",
                        "redirect": "/list/search/articles",
                        "exact": true
                    },
                    {
                        "path": "/list/search/articles",
                        "name": "articles",
                        "exact": true
                    },
                    {
                        "path": "/list/search/projects",
                        "name": "projects",
                        "exact": true
                    },
                    {
                        "path": "/list/search/applications",
                        "name": "applications",
                        "exact": true
                    },
                    {}
                ]
            },
            {}
        ]
    },
    {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
            {
                "path": "/profile/basic",
                "name": "basic",
                "exact": true
            },
            {
                "path": "/profile/advanced",
                "name": "advanced",
                "authority": [
                    "admin"
                ],
                "exact": true
            },
            {}
        ]
    },
    {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
            {
                "path": "/result/success",
                "name": "success",
                "exact": true
            },
            {
                "path": "/result/fail",
                "name": "fail",
                "exact": true
            },
            {}
        ]
    },
    {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
            {
                "path": "/exception/403",
                "name": "not-permission",
                "exact": true
            },
            {
                "path": "/exception/404",
                "name": "not-find",
                "exact": true
            },
            {
                "path": "/exception/500",
                "name": "server-error",
                "exact": true
            },
            {
                "path": "/exception/trigger",
                "name": "trigger",
                "hideInMenu": true,
                "exact": true
            },
            {}
        ]
    },
    {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
            {
                "path": "/account/center",
                "name": "center",
                "routes": [
                    {
                        "path": "/account/center",
                        "redirect": "/account/center/articles",
                        "exact": true
                    },
                    {
                        "path": "/account/center/articles",
                        "exact": true
                    },
                    {
                        "path": "/account/center/applications",
                        "exact": true
                    },
                    {
                        "path": "/account/center/projects",
                        "exact": true
                    },
                    {}
                ]
            },
            {
                "path": "/account/settings",
                "name": "settings",
                "routes": [
                    {
                        "path": "/account/settings",
                        "redirect": "/account/settings/base",
                        "exact": true
                    },
                    {
                        "path": "/account/settings/base",
                        "exact": true
                    },
                    {
                        "path": "/account/settings/security",
                        "exact": true
                    },
                    {
                        "path": "/account/settings/binding",
                        "exact": true
                    },
                    {
                        "path": "/account/settings/notification",
                        "exact": true
                    },
                    {}
                ]
            },
            {}
        ]
    },
    {
        "exact": true
    },
    {}
]

const App = () => (
    <div>

        {/*<Route exact path="/" render={(route) => {
            return (
                <UserLayout>
                    <Home/>
                </UserLayout>
            )
        }}/>*/}

        <Route exact path="/dashboard" render={(route) => {
            return (
                <UserLayout
                    collapsed={false}
                    fixSiderbar={true}
                    theme={'test'}
                    location={{
                        pathname: "/dashboard",
                        "search": "",
                        "hash": "",
                        "query": {},
                        "key": "hr4eq3"
                    }}
                    menuData={routes}
                    route={{
                        routes: routes
                    }}>

                    <Dashboard/>

                </UserLayout>
            )
        }}/>

        {_.map(publicRoutes, (route, key) => {
            const {component, path} = route;
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
            const {component, path} = route;
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

