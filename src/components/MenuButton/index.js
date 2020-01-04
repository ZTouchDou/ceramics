import React from 'react';
import {Button} from 'antd';
import './index.less';

class MenuButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    let {text,disable} = this.props;
    return(
      <Button style={{height:'100%',width:'100%',fontSize:'3vmin',color:'black',fontFamily:'楷体',fontWeight:'bold',border:'0.5vmin solid'}}
              shape="circle"
              ghost
              onClick={this.props.handleClick}
              disabled={disable?disable:false}>
        {text}
      </Button>
    )
  }
}

export default MenuButton;