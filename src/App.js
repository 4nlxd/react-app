import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './App.css';

import Login from './pages/Login/login';
import MyLayout from './components/Layout/layout';

function App() {
    return (
        <LocaleProvider locale={zh_CN}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={ Login } />
                    <Route exact path="/login" component={ Login } />
                    <Route component={ MyLayout } />
                </Switch>
            </HashRouter>
        </LocaleProvider>
    );
}

export default App;
