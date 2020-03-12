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
      <div style={{zIndex:'10',position:'absolute',top:'50vh',transform:'translateY(-50%)',left:'92vw'}}>
        <Icon type="plus-circle" theme="filled"
              style={{color:`${color?color:'#1890FF'}`,fontSize:'10vmin'}}
              onClick={this.props.showModal}
        />
      </div>
    );
  }
}

export default SysAddButton;