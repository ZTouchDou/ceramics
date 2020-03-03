import React from 'react';
import {Icon, Drawer} from 'antd';
import MenuPage from "../../routes/MenuPage";
import './index.css';

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
    let {color, direction} = this.props;
    return(
      <div>
        <div style={{zIndex:10,position:'absolute',left:'90vw',top:'3vh',width:'5vw',height:'8vw'}} onClick={this.showDrawer}>
          <Icon type='unordered-list' style={{color:color?color:'black'}}></Icon>
        </div>
        <Drawer
          placement={direction?direction:"right"}
          closable={true}
          onClose={this.onClose}
          visible={visible}
          width='100vw'
          height='100vh'
        >
          <MenuPage/>
        </Drawer>
      </div>
    )
  }
}

export default MenuButton;