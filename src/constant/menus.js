import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login/login';

const menusData = [
    { id: 1, name: 'Home', route: '/home', icon: 'home', showMenu: true, component: <Home /> },
    {
        id: 2, name: '移动站首页管理', route: '', icon: 'shop', showMenu: true,
        child: [
            { id: 20, name: '轮播图管理', route: '/mobile/list', icon: 'shop', showMenu: true, component: <Login /> },
            { id: 21, name: '商品分类', route: '/mobile/category', icon: 'shop', showMenu: true, component: <Home /> },
        ]
    }
];

export default menusData;
