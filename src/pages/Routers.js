import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";

import Middleware from '../components/Middleware';
import NotMatch from './NotMatch';

import staticMenus from '../constant/menus';

const loopStaticMenus = (menus, menusArray) => {
    for(let menu of menus){
        if(menu.route){
            menusArray.push(menu);
        }
        if(menu.child && menu.child.length > 0){
            loopStaticMenus(menu.child, menusArray);
        }
    }
};

const loopMenus = (menus, menusArray) => {
    for(let menu of menus){
        if(menu.functionId){
            menusArray.push(menu);
        }
        if(menu.items && menu.items.length > 0){
            loopMenus(menu.items, menusArray);
        }
    }
};

class Routers extends Component{
    constructor(props){
        super(props);

        loopStaticMenus(staticMenus, this.staticMenusArray);
        loopMenus(this.props.menus, this.menusArray);

        for(let i=0; i<this.staticMenusArray.length; i++){
            for(let j=0; j<this.menusArray.length; j++){
                let O = this.staticMenusArray[i],
                    C = this.menusArray[j];

                if(O.route === C.functionId){
                    O.id = C.id;
                    O.roleIds = C.roleIds;
                }
            }
        }
    }

    staticMenusArray= [];
    menusArray = [];

    render(){

        return (
            <Switch>
                {
                    this.staticMenusArray.map(C=>{
                        return (
                            <Route
                                exact
                                key={C.id}
                                path={C.route}
                                render={props => (
                                    <Middleware {...Object.assign(props, {currentMenu: C})}>
                                        { C.component }
                                    </Middleware>
                                )}
                            />
                        )
                    })
                }
                <Route component={NotMatch} />
            </Switch>
        )
    }
}

export default Routers;
