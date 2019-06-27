import React, {PureComponent} from 'react';
import ProgressBar from './ProgressBar';
import LoginInfo from '../utils/loginInfo';

const getData = () => {
    return new Promise((resolve, reject) => {
        let result = {
            code: 200,
            msg: 'success',
            data: {
                menuId: '007'
            }
        };

        setTimeout(()=>{
            resolve(result);
        }, 500)
    })
};

class Middleware extends PureComponent {
    constructor(props){
        super(props);

        this.LoginInfo = LoginInfo.getInstance();
        this.childrenElement = React.Children.map(props.children, (child)=>{
            return React.cloneElement(child,
                {
                    ...this.props,
                    menuId: this.state.menuId,
                    LoginInfo: this.LoginInfo
                }
            );
        });
    };

    state = {
        loading: true,
        menuId: ''
    };

    componentWillReceiveProps(props){
        const preMatch = this.props.match;
        const nextMatch = props.match;
        if(preMatch && nextMatch && preMatch.path !== nextMatch.path){
            this.getPageInfo();
        }
    }

    componentDidMount(){
        this.getPageInfo();
    };

    getPageInfo = async () => {
        this.setState({ loading: true });
        const result = await getData();
        this.setState({ menuId: result.data.menuId, loading: false })
    };

    render(){
        let { loading } = this.state;

        return (
            <div style={{height: '100%', padding: 24, overflowY: 'auto'}}>
                <ProgressBar loading={ loading } />
                {
                    !loading ? this.childrenElement : null
                }
            </div>
        )
    }
}

export default Middleware;
