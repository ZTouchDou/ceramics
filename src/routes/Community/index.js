import React from 'react';
import {Divider,Layout, Menu,Col,Row,Carousel} from 'antd';
import './index.css';
import userimg from '../../Image/5.jpg'
import TC from '.././../JSON/TC/TC.json';
import MenuButton from "../../components/MenuButton";

const { Header, Content } = Layout;

class Community extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  //游览
  gotoVisit=(type)=>{
    if(type==='SC'){
      this.props.history.push('/Community/ComSC');
    }
  };

  //发布
  gotoAdd=(type)=>{
    sessionStorage.setItem('AddType',type);
    this.props.history.push('/Community/ComAdd');
  }

  render() {
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
            <Row style={{width:'100%',height:'80%'}}>
              <Col span={12} style={{height:'100%'}}>
                <div className='Community-body-tab gradient1'>
                  <div className='tab-img'>
                    <img
                      style={{width:'100%',height:'100%'}}
                      src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize:'4vmin',fontWeight:'500'}}>
                      鉴瓷
                    </div>
                    <div style={{fontSize:'3.5vmin'}}>
                      工人莫献天机巧，此器能输郡国材。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height:'100%'}}>
                      <Col span={11} style={{height:'100%'}}>
                        <div
                          style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}
                          onClick={this.gotoAdd.bind(this,'JC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}>
                        |
                      </Col>
                      <Col span={11} style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}>
                        游览
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col span={12} style={{height:'100%'}}>
                <div className='Community-body-tab gradient2'>
                  <div className='tab-img'>
                    <img
                      style={{width:'100%',height:'100%'}}
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      alt="example"
                    />
                  </div>
                  <div className='tab-body'>
                    <div style={{fontSize:'4vmin',fontWeight:'500'}}>
                      赏瓷
                    </div>
                    <div style={{fontSize:'3.5vmin'}}>
                      玲珑剔透万般好，静中见动青山来。
                    </div>
                  </div>
                  <div className='tab-action'>
                    <Row style={{height:'100%'}}>
                      <Col span={11} style={{height:'100%'}}>
                        <div
                          style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}
                          onClick={this.gotoAdd.bind(this,'SC')}
                        >
                          发布
                        </div>
                      </Col>
                      <Col span={2} style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}>
                        <div style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}>
                          |
                        </div>
                      </Col>
                      <Col span={11} style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}>
                        <div
                          style={{height:'100%',lineHeight:'6vh',textAlign:'center'}}
                          onClick={this.gotoVisit.bind(this,'SC')}
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
          <div className='Community-book'>
            <Carousel
              className='ant-carousel-Community'
              ref={el => (this.slider = el)}
              autoplay={true}
              dots={true}
              dotPosition='bottom'
              lazyLoad={true}
            >
              <div style={{width:'100%',height:'25vh'}}>
                <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3554881036,1166117629&fm=26&gp=0.jpg'
                     style={{width:'100%',height:'25vh'}}
                />
              </div>
              <div style={{width:'100%',height:'25vh'}}>
                <img src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=617031907,3445052043&fm=26&gp=0.jpg'
                     style={{width:'100%',height:'25vh'}}
                />
              </div>
              <div style={{width:'100%',height:'25vh'}}>
                <img src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3291806322,1575920950&fm=26&gp=0.jpg'
                     style={{width:'100%',height:'25vh'}}
                />
              </div>
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
                    <img src={userimg} alt='你的头像阵亡了' className='Community-user-image'/>
                  </div>
                </Col>
                <Col span={16}>
                  <div className='Community-user-Info'>
                    <div className='Community-user-name'>
                      一咖喱
                    </div>
                    <div className='Community-user-id'>
                      ID:102220200304068
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='Community-MyHome-invInfo'>
              <Layout className='ant-c-layout'>
                <Header className="header">
                  <div className="logo" />
                  <Menu
                    className='ant-c-menu'
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '10vh' }}
                  >
                    <Menu.Item className='ant-c-submenu' key="1" >帖子</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="2" >晒瓷</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="3" >评论</Menu.Item>
                    <Menu.Item className='ant-c-submenu' key="4" >瓷片</Menu.Item>
                  </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                  <Layout className="site-layout-background " style={{height:'54.5vh', padding: '4vh 0' }}>
                    <Content style={{overflow:'auto'}}>
                      {
                        TC.length>0?TC.map((item,index)=>{

                        }):
                        (
                          <div style={{width:'24vw',fontSize:'6vmin',opacity:'0.7',marginTop:'50%',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
                            空空如也
                          </div>
                        )
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