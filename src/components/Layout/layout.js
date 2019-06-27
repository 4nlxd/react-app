import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Routers from '../../pages/Routers';
import Service from '../../services/Menus';
import loginInfo from '../../utils/loginInfo';

import logo from '../../assets/images/logo-s.png';
import avatar from '../../assets/images/avatar.png';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const userInfo = loginInfo.getInstance();

class MyLayout extends Component{
    constructor(props){
        super(props);

        this.state = {
            menus: [],
            selectKeys: [],
            openKeys: []
        }
    }

    componentDidMount() {
        this.getMenus();
    };

    render(){
        let { openKeys } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <div className="user-info">
                        <div className="avatar-box">
                            <img src={ avatar } alt="avatar"/>
                        </div>
                        <ul>
                            <li onClick={ this.logOut }><Icon type="logout" />退出登录</li>
                        </ul>
                    </div>
                    <div className='layui-logo'>
                        <div className="layui-logo-img"><img src={ logo } alt="Lenovo"/></div>
                        <dl>
                            <dt>BAIYING</dt>
                            <dd>Management Platform</dd>
                        </dl>
                    </div>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            selectedKeys={ this.getkeys() }
                            openKeys={ openKeys }
                            mode="inline"
                            onClick={ this.menuItemClick }
                            onOpenChange={ this.onOpenChange }
                        >
                            {this.renderMenus()}
                        </Menu>
                    </Sider>
                    <Content className='layui-content'>
                        <div className="layui-breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item><a href="www.baidu.com">页面1</a></Breadcrumb.Item>
                                <Breadcrumb.Item>模块一</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Routers menus={ this.state.menus } />
                    </Content>
                </Layout>
                <Footer>BAIYING Application © 2017-2019</Footer>
            </Layout>
        )
    }

    getMenus = async () => {
        let menus = await Service.getMenus(), that = this;

        this.setState({ menus: menus }, function () {
            that.getSelectKeys();
        });
    };

    renderMenus = () => {
        let menus = this.state.menus;

        return this.loopMenus(menus);
    };

    loopMenus = (data) => {
        return data.map(c => {
            let child = c.items, showMenu = c.disable === 1 ? true : false;

            if (showMenu && child && child.length > 0) {
                return (
                    <SubMenu key={c.id} title={<span><Icon type={'appstore'} /><span>{c.name}</span></span>}>
                        {this.loopMenus(child)}
                    </SubMenu>
                )
            } else if (showMenu) {
                return (
                    <Menu.Item key={c.id}>
                        <Link to={c.functionId} replace title={c.name}>
                            <Icon type={'appstore'} />
                            <span>{c.name}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return null;
            }
        });
    };

    getAllMenus = (menu, menus) => {
        menu.forEach(c => {
            let child = c.items;

            if (child && child.length > 0) {
                this.getAllMenus(child, menus);
            } else {
                menus.push(c);
            }
        });
    };

    loopKeys = (res, isFind, menu, parent) => {
        let pathname = window.location.hash.substring(1);
        if (isFind) return false;

        for (let i = 0; i < menu.length; i++) {
            if (isFind) break;

            if (menu[i].functionId && (menu[i].functionId === pathname)) {
                if (parent) {
                    res.push(parent.id)
                }
                res.push(menu[i].id);
                isFind = true;

                break;
            } else if (menu[i].items && menu[i].items.length > 0) {
                this.loopKeys(res, isFind, menu[i].items, menu[i]);
            }
        }

        let list = [];

        for (let i = 0; i < res.length; i++) {
            list.push(res[i].toString())
        }

        return list;
    };

    getSelectKeys = () => {
        let menu = this.state.menus, res = [];

        let isFind = false;

        let _keys = this.loopKeys(res, isFind, menu);

        this.setState({ openKeys: _keys, selectKeys: _keys })
    };

    getkeys = () => {
        let menu = this.state.menus, res = [];

        let isFind = false;

        let _keys = this.loopKeys(res, isFind, menu);

        return _keys.length !== 0 ? _keys : this.state.selectKeys;
    };

    menuItemClick = ({ item, key, keyPath }) => {
        this.setState({ selectKeys: keyPath })
    };

    onOpenChange = (openKeys) => {
        this.setState({ openKeys })
    };

    logOut = () => {
        userInfo.clearInfo();

        this.props.history.push('/login');
    };
}

export default MyLayout;
