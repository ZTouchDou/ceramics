import React from 'react';
import { Layout, Menu } from 'antd';
import './index.css';
import MenuButton from "../../components/MenuButton";
import SysOrigin from "./SysOrigin";
import SysCeramicsShow from "./SysCeramicsShow";
import SysTechnology from "./SysTechnology";
import SysWorkshop from "./SysWorkshop";
import SysPageManagement from "./SysPageManagement";
import Invitation from "../Community/Invitation";
import CeramicsPicture from "../Community/CeramicesPicture";
import Comment from "../Community/Comment";
import Chip from "../Community/Chip";

const { Header, Content } = Layout;
const { SubMenu } = Menu;
class SystemManagement extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible: false,
      menuKey:1,
    }
  }

  //改变导航
  changeMenu = (key)=>{
    this.setState({
      menuKey:key
    })
  };

  render() {
    let {menuKey} = this.state;
    return (
      <div>
        <MenuButton color='white'/>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              className='ant-s-menu'
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '10vh' }}
            >
              <Menu.Item className='ant-s-submenu' key="1" onClick={this.changeMenu.bind(this,1)}>起源</Menu.Item>
              <Menu.Item className='ant-s-submenu' key="2" onClick={this.changeMenu.bind(this,2)}>陶瓷</Menu.Item>
              <Menu.Item className='ant-s-submenu' key="3" onClick={this.changeMenu.bind(this,3)}>工艺</Menu.Item>
              <Menu.Item className='ant-s-submenu' key="4" onClick={this.changeMenu.bind(this,4)}>工坊</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Layout className="site-layout-background" style={{ padding: '4vh 0' }}>
              <Content style={{height:'82vh',overflow:'auto'}}>
                {
                  menuKey ===1&&
                  <SysOrigin/>
                }
                {
                  menuKey === 2&&
                  <SysCeramicsShow/>
                }
                {
                  menuKey===3&&
                  <SysTechnology/>
                }
                {
                  menuKey===4&&
                  <SysWorkshop/>
                }
              </Content>
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default SystemManagement;