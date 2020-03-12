import React from 'react';
import { Layout, Menu,Icon } from 'antd';
import './index.css';
import MenuButton from "../../components/MenuButton";
import SysOrigin from "./SysOrigin";
import SysCeramicsShow from "./SysCeramicsShow";
import SysTechnology from "./SysTechnology";
import SysWorkshop from "./SysWorkshop";
import SysPageManagement from "./SysPageManagement";
import SysComJC from "./SysComJC";
import CeramicsPicture from "./CeramicesPicture";
import SysUser from "./SysUser";
import Comment from "./Comment";
import Chip from "./Chip";
import DataScreen from "./DataScreen";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

class SystemManagement extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible: false,
      menuKey:1,
      collapsed: false,
    }
  }

  //改变导航
  changeMenu = (key)=>{
    this.setState({
      menuKey:key
    })
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    let {menuKey} = this.state;
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{backgroundColor:''}}>
            <div className="logo" >
              釉色后台管理系统 v1.0
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" onClick={this.changeMenu.bind(this,1)}>
                <Icon type="pie-chart" />
                <span>数据统计</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={this.changeMenu.bind(this,2)}>
                <Icon type="pie-chart" />
                <span>起源管理</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.changeMenu.bind(this,3)}>
                <Icon type="desktop" />
                <span>陶瓷管理</span>
              </Menu.Item>
              <Menu.Item key="4" onClick={this.changeMenu.bind(this,4)}>
                <Icon type="pie-chart" />
                <span>工序管理</span>
              </Menu.Item>
              <Menu.Item key="5" onClick={this.changeMenu.bind(this,5)}>
                <Icon type="pie-chart" />
                <span>工坊管理</span>
              </Menu.Item>
              <Menu.Item key="6" onClick={this.changeMenu.bind(this,6)}>
                <Icon type="user" />
                <span>用户管理</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                  <Icon type="team" />
                  <span>社区管理</span>
                </span>
                }
              >
                <Menu.Item key="7" onClick={this.changeMenu.bind(this,7)}>鉴瓷</Menu.Item>
                <Menu.Item key="8" onClick={this.changeMenu.bind(this,8)}>赏瓷</Menu.Item>
                <Menu.Item key="9" onClick={this.changeMenu.bind(this,9)}>陶片</Menu.Item>
                <Menu.Item key="10">书籍</Menu.Item>
                <Menu.Item key="11" onClick={this.changeMenu.bind(this,11)}>评论</Menu.Item>
              </SubMenu>
              <Menu.Item key="12" onClick={this.changeMenu.bind(this,12)}>
                <Icon type="file" />
                <span>页面管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff',padding: 0 }} />
            <Content style={{ margin: '10px 16px',overflow:'auto' }}>
              {
                menuKey===1&&
                <DataScreen/>
              }
              {
                menuKey===2&&
                <SysOrigin/>
              }
              {
                menuKey===3&&
                  <SysCeramicsShow/>
              }
              {
                menuKey===4&&
                <SysTechnology/>
              }
              {
                menuKey===5&&
                <SysWorkshop/>
              }
              {
                menuKey===6&&
                <SysUser/>
              }
              {
                menuKey===7&&
                <SysComJC/>
              }
              {
                menuKey===8&&
                  <CeramicsPicture/>
              }
              {
                menuKey===9&&
                <Chip/>
              }
              {
                menuKey===11&&
                <Comment/>
              }
              {
                menuKey===12&&
                <SysPageManagement/>
              }
            </Content>
            <Footer style={{ textAlign: 'center' }}>ZJGS University @2020 ZTouchDou</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default SystemManagement;