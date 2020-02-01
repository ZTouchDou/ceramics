import React from 'react';
import {Icon, Drawer} from 'antd';
import Texty from 'rc-texty';
import MenuPage from "../../routes/MenuPage";

class MenuButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    }
  }

  //显示菜单
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  //关闭菜单
  onClose = ()=>{
    this.setState({
      visible: false,
    });
  }

  render(){
    let {visible} = this.state;
    return(
      <div>
        <div style={{position:'absolute',left:'90vw',top:'3vh',width:'5vw',height:'8vw'}} onClick={this.showDrawer}>
          <Icon type='unordered-list'></Icon>
        </div>
        <Drawer
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={visible}
          width='100vw'
        >
          <MenuPage/>
        </Drawer>
      </div>
    )
  }
}

export default MenuButton;