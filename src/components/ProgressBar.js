import React, {PureComponent} from 'react';

class ProgressBar extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            barDefaultStyle: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2000,
                width: 0,
                height: '2px',
                backgroundColor: '#40a9ff',
                transition: 'width 10s cubic-bezier(0, 1, 0.3, 1)',
                boxShadow: '#40a9ff 0px 0px 10px'
            }
        };

        this.loading = this.props.loading;
    }

    componentWillReceiveProps(nextProps){
        if(this.props.loading && !nextProps.loading){
            this.handler(false);
        }else if(!this.props.loading && nextProps.loading){
            this.handler(true);
        }
    }

    componentDidMount(){
        this.handler(this.loading);
    }

    handler = (show) => {
        setTimeout(()=>{
            if(show){
                this.setState({
                    barDefaultStyle: { ...this.state.barDefaultStyle, width: '80%', transition: 'ease 1s' }
                })
            }else{
                this.setState({
                    barDefaultStyle: { ...this.state.barDefaultStyle, width: '100%', transition: 'ease 400ms' }
                })
            }
        }, 1)
    };

    handlerEnd = () => {
        this.setState({
            barDefaultStyle: { ...this.state.barDefaultStyle, width: 0, transition: 'ease 0s' }
        })
    };

    render(){
        return(
            <div style={this.state.barDefaultStyle} onTransitionEnd={ this.handlerEnd }></div>
        )
    }
}

export default ProgressBar;