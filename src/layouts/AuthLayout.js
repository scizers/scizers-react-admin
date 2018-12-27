import React, {Fragment} from 'react';
import {Icon} from 'antd';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom'

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
        const {children} = this.props;
        return (
            <div className="container">
                <div className="content">
                    <div className="top">
                        <div className="header">
                            <Link to="/">
                                <img alt="logo" className='logo' src={logo}/>
                                <span className="title">Ant Design</span>
                            </Link>
                        </div>
                        <div className="desc">There goes our awesome tagline</div>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default UserLayout;
