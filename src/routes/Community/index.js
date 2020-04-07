import React from 'react';
import {Divider,Layout, Menu,Col,Row,Carousel,Pagination} from 'antd';
import './index.css';
import userimg from '../../Image/5.jpg'
import request from "../../utils/request";
import config from "../../config";
import MenuButton from "../../components/MenuButton";
import Invitation from "./Invitation";
import CeramicsPicture from "./CeramicesPicture";
import Comment from "./Comment";
import Chip from "./Chip";

const { Header, Content } = Layout;
const pageSize = 10;
const uploadUrl = config.poxzy.imgUrl;

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MyTab: 1,
      bookList:[]
    }
  }

  //取得书籍
  getBookList=(id)=>{
    request({url:'/getBookData',method:"GET",params:{id:id}}).then((res)=>{
      if(res && res.code){
        this.setState({
          bookList:res.data
        })
      }
    })
  };

  componentDidMount() {
    this.getBookList(0);
  }

  //游览
  gotoVisit = (type) => {
    if (type === 'SC') {
      this.props.history.push('/Community/ComSC');
    } else if (type === 'JC') {
      sessionStorage.setItem("invJCId",0);
      this.props.history.push('/Community/ComJC');
    }
  };

  //切换
  changeTab = (type) => {
    this.setState({
      MyTab: type
    })
  };

  //发布
  gotoAdd = (type) => {
    sessionStorage.setItem('AddType', type);
    this.props.history.push('/Community/ComAdd');
  };

  handleClick = () => {
    this.props.history.push('/Community/Combookdetails');
  };

  render() {
    let {MyTab} = this.state;
    return (
      <div className='Community-box'>
        <MenuButton/>
        <div className='Community-header'>
          社区
        </div>
        <div className='Community-body'>
          <div className='Community-content'>
            <div className='Community-title'>
              鉴赏
            </div>
            <Row style={{width: '100%', height: '80%'}}>
              <Col span={12} style={{height: '100%'}}>
                <div className='Community-body-tab gradient1'>
                  <div className='tab-img'>
                    <img
                      style={{width: '100%', height: '100%'}}
                      src={require("../../Image/JC.jpg")}
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize: '4vmin', fontWeight: '500'}}>
                      鉴瓷
                    </div>
                    <div style={{fontSize: '3.5vmin'}}>
                      工人莫献天机巧，此器能输郡国材。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height: '100%'}}>
                      <Col span={11} style={{height: '100%'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoAdd.bind(this, 'JC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        |
                      </Col>
                      <Col span={11} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoVisit.bind(this, 'JC')}
                        >
                          游览
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col span={12} style={{height: '100%'}}>
                <div className='Community-body-tab gradient2'>
                  <div className='tab-img'>
                    <img
                      style={{width: '100%', height: '100%'}}
                      src={require("../../Image/noSC.jpg")}
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize: '4vmin', fontWeight: '500'}}>
                      赏瓷
                    </div>
                    <div style={{fontSize: '3.5vmin'}}>
                      玲珑剔透万般好，静中见动青山来。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height: '100%'}}>
                      <Col span={11} style={{height: '100%'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoAdd.bind(this, 'SC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                          |
                        </div>
                      </Col>
                      <Col span={11} style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}>
                        <div
                          style={{height: '100%', lineHeight: '6vh', textAlign: 'center'}}
                          onClick={this.gotoVisit.bind(this, 'SC')}
                        >
                          游览
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Divider/>
          <div className='Community-title'>
            推荐书籍
          </div>
          <div className='Community-book' onClick={this.handleClick}>
            <Carousel
              className='ant-carousel-Community'
              ref={el => (this.slider = el)}
              autoplay={true}
              dots={true}
              dotPosition='bottom'
              lazyLoad={true}
            >
              {
                this.state.bookList.map((item,index)=>{
                  return(
                    <div key={index} style={{width: '100%', height: '25vh'}}>
                      <img
                        src={uploadUrl+item.imgUrl}
                        style={{width: '100%', height: '25vh'}}
                        alt="书籍配图"
                      />
                    </div>
                  )
                })
              }
            </Carousel>
          </div>
          <Divider/>
          <div className='Community-MyHome'>
            <div className='Community-title'>
              我的家
            </div>
            <div className='Community-MyHome-baseInfo'>
              <Row>
                <Col span={8}>
                  <div className='Community-user'>
                    <img src={uploadUrl+sessionStorage.getItem("userimg")} alt='你的头像阵亡了' className='Community-user-image'/>
                  </div>
                </Col>
                <Col span={16}>
                  <div className='Community-user-Info'>
                    <div className='Community-user-name'>
                      {sessionStorage.getItem("nickName")}
                    </div>
                    <div className='Community-user-id'>
                      ID:{sessionStorage.getItem("userId")}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='Community-MyHome-invInfo'>
              <Layout className='ant-c-layout'>
                <Header className="header">
                  <div className="logo"/>
                  <Menu
                    className='ant-c-menu'
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '10vh'}}
                  >
                    <Menu.Item className='ant-c-submenu' key="1" onClick={this.changeTab.bind(this, 1)}>帖子</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="2" onClick={this.changeTab.bind(this, 2)}>晒瓷</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="3" onClick={this.changeTab.bind(this, 3)}>评论</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="4" onClick={this.changeTab.bind(this, 4)}>瓷片</Menu.Item>
                  </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                  <Layout className="site-layout-background " style={{height: '54.5vh', padding: '4vh 0'}}>
                    <Content style={{overflow: 'auto'}}>
                      {
                        MyTab === 1 && <Invitation history={this.props.history}/>
                      }
                      {
                        MyTab === 2 && <CeramicsPicture/>
                      }
                      {
                        MyTab === 3 && <Comment/>
                      }
                      {
                        MyTab === 4 && <Chip/>
                      }
                    </Content>
                  </Layout>
                </Content>
              </Layout>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  export default Community;