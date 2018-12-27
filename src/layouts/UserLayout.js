import React, {Fragment} from 'react';
import {Icon} from 'antd';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom'
import SiderMenu from '../components/SiderMenu';

const links = [
    {
        key: 'help',
        title: "HELP",
        href: '',
    }
];

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright"/> 2018
    </Fragment>
);

class UserLayout extends React.PureComponent {

    render () {

        const {
            navTheme,
            layout: PropsLayout,
            children,
            location: {pathname},
            isMobile,
            menuData,
            breadcrumbNameMap,
            route: {routes},
            fixedHeader,
        } = this.props;


        const isTop = PropsLayout === 'topmenu';
        const routerConfig = undefined;
        const contentStyle = !fixedHeader ? {paddingTop: 0} : {};

        const layout = (
            <SiderMenu
                logo={logo}
                theme={'dark'}
                onCollapse={this.handleMenuCollapse}
                menuData={menuData}
                isMobile={isMobile}
                {...this.props}
            />
        );


        return (
            <React.Fragment>
                {layout}
            </React.Fragment>
        );
    }
}

export default UserLayout;
