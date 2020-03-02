import React from 'react';
import {Icon} from 'antd';

class SysAddButton extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  render() {
    let {color} = this.props;
    return (
      <div style={{width:'10vmin',height:'10vmin',position:'absolute',top:'50vh',transform:'translateY(-50%)',marginLeft:'85vw'}}>
        <Icon type="plus-circle" theme="filled" style={{color:`${color?color:'#1890FF'}`,fontSize:'10vmin'}}/>
      </div>
    );
  }
}

export default SysAddButton;