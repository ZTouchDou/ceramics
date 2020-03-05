import React from 'react';
import {Icon} from 'antd';

class GoBackButton extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    let {color} = this.props;
    return (
      <div style={{position:'fixed', top:'1.5vh',left:'4vw',fontSize:'8vmin'}} onClick={this.props.gotoBack}>
        <Icon type="left-circle" theme="filled" style={{color:`${color?color:'white'}`}}/>
      </div>
    );
  }
}

export default GoBackButton;