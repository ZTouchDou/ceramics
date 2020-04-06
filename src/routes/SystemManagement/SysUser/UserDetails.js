import React from 'react';
import {Row, Col, Menu,Divider, Drawer, Pagination,Popconfirm,Tooltip,Icon,message} from 'antd';
import './UserDetails.css';
import MenuTitle from "../../../components/MenuTitle";
import SysComJCDetails from "../SysComJC/SysComJCDetails";
import request from "../../../utils/request";
import moment from 'moment';
import config from "../../../config";
import ChipDetails from "../Chip/ChipDetails";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

//鉴瓷
const InvitationTab = ({t,invId,title,time,content})=>{
  return(
    <div onClick={t.showInvitation.bind(t,invId,'major','')} style={{cursor:'pointer'}}>
      <div className='inv-header'>
        <Row>
          <Col span={20}>
            <div className='inv-title'>
              <div>
                ID：{invId}
              </div>
              <div>
                {title}
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className='inv-time'>
              {time}
            </div>
          </Col>
        </Row>
      </div>
      <div className='inv-content'>
        {content}
      </div>
      <div style={{textAlign:'right',fontSize:'20px'}} onClick={t.topPropagationClick}>
        <Popconfirm
          title='确定删除吗？'
          okText="确定"
          cancelText="取消"
          placement="left"
          onConfirm={t.deleteInvitation.bind(t,invId)}
        >
          <Tooltip placement="bottom" title="删除">
            <Icon type="delete" theme="filled" />
          </Tooltip>
        </Popconfirm>
      </div>
    </div>
  )
};

//赏瓷
const CeramicsTab = ({t,invId,imgUrl,content})=>{
  return(
    <div>
      <Row style={{height:'100%'}}>
        <Col span={12}>
          <div>
            <img
              style={{width:'100%',height:'100%'}}
              alt='配图'
              src={uploadUrl+imgUrl}/>
          </div>
        </Col>
        <Col span={12} style={{height:'100%'}}>
          <div className='Cer-content'>
            <Row>
              <Col span={21}>
                <div style={{fontSize:'20px',fontWeight:'bold'}}>
                  ID：{invId}
                </div>
              </Col>
              <Col span={3}>
                <div style={{textAlign:'right',fontSize:'20px'}} onClick={t.topPropagationClick}>
                  <Popconfirm
                    title='确定删除吗？'
                    okText="确定"
                    cancelText="取消"
                    placement="left"
                    onConfirm={t.deleteSC.bind(t,invId)}
                  >
                    <Tooltip placement="bottom" title="删除">
                      <Icon type="close-circle" theme="filled" />
                    </Tooltip>
                  </Popconfirm>
                </div>
              </Col>
            </Row>
            <div>
              {content}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
};

//评论
const MyComment = ({t,invId,comId,time,comment,invContent})=>{
  return(
    <div>
      <Row>
        <Col span={21}>
          <div style={{fontWeight:'bold'}}>
            ID：{comId}
          </div>
        </Col>
        <Col span={3}>
          <div style={{textAlign:'right',fontSize:'20px'}} onClick={t.topPropagationClick}>
            <Popconfirm
              title='确定删除吗？'
              okText="确定"
              cancelText="取消"
              placement="left"
              onConfirm={t.deleteComment.bind(t,comId)}
            >
              <Tooltip placement="bottom" title="删除">
                <Icon type="close-circle" theme="filled" />
              </Tooltip>
            </Popconfirm>
          </div>
        </Col>
      </Row>
      <div>
        <Row>
          <Col span={15}>
            <div className='MyComment-comment'>
              <div>
                {time}
              </div>
              <div>
                {comment}
              </div>
            </div>
          </Col>
          <Col span={9}>
            <div className='MyComment-invContent' onClick={invContent!=="来自书评"?t.showInvitation.bind(t,invId,'minor',comId):''}>
              {invContent}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
};

//陶片
const ChipInfoTab = ({t,item,chipId,name,imgUrl})=>{
  const mask={
    "WebkitMask":`url(${require('../../../Image/'+imgUrl)})`,
    "WebkitMaskSize":"100% 100%"
  };
  return(
    <Tooltip title={`ID：${chipId}`} placement='left'>
      <div className='ChipInfoTab-box' onClick={t.gotoChipDetails.bind(t,item)}>
        <div className='ChipInfoTab-name'>
          {name}
        </div>
        <div className='ChipInfoTab-pic' style={{...mask}}/>
      </div>
    </Tooltip>
  )
};

class UserDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      menuKey:1,
      visible:false,
      chipShow:false,
      invJCData:[],
      invSCData:[],
      comData:[],
      chipData:[],
      onePage:1,
      twoPage:1,
      threePage:1,
      fourPage:1,
      oneTotal:10,
      twoTotal:10,
      threeTotal:10,
      fourTotal:10,
      chipDetails:[],
      invJCId:'',//跳转到详细页的id
      commentId:'',//跳转到详细页的id
    }
  }

  //取得鉴瓷信息
  getInvJCData=(page)=>{
    let id = this.props.userInfo.id;
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getInvitationJCInUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          invJCData:res.data,
          oneTotal:res.total
        })
      }
    })
  };
  //取得赏瓷信息
  getInvSCData=(page)=>{
    let id = this.props.userInfo.id;
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getInvitationSCInUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          invSCData:res.data,
          twoTotal:res.total
        })
      }
    })
  };
  //取得评论信息
  getUserComment=(page)=>{
    let id = this.props.userInfo.id;
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getCommentFromUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        res.data.map((item,index)=>{
          request({url:'/getInvitationJC',method:'GET',params:{id:item.invitationId}}).then((res)=>{
            if(res && res.code){
              if(item.type===0){
                item.invContent = res.data[0].content
              }else{
                item.invContent = "来自书评";
              }
              let {comData} = this.state;
              comData[index] = item;
              this.setState({
                comData
              });
              console.log("item.invContent:", item.invContent);
            }
          })
        });
        this.setState({
          threeTotal:res.total
        })
      }
    })
  };
  //取得陶片信息
  getUserChip=(page)=>{
    let id = this.props.userInfo.id;
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getChipFromUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          chipData:res.data,
          fourTotal:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getInvJCData(this.state.onePage);
    this.getInvSCData(this.state.twoPage);
    this.getUserComment(this.state.threePage);
    this.getUserChip(this.state.fourPage);
  }

  //显示详情框
  showInvitation=(id,type,comId)=>{
    sessionStorage.setItem('invitationType',type);
    this.setState({
      visible:true,
      invJCId:id,
      commentId:comId
    });
  };

  //关闭详情框
  closeInvitation=()=>{
    this.setState({
      visible:false
    })
  };

  //关闭详情
  closeDetails=()=>{
    this.props.closeDetails();
  };

  //陶片详情
  gotoChipDetails=(item)=>{
    this.setState({
      chipShow:true,
      chipDetails:item
    })
  };

  //关闭陶片详情
  closeChipDetails=()=>{
    this.setState({
      chipShow:false
    })
  };

  //改变导航
  changeMenu = (key)=>{
    this.setState({
      menuKey:key
    })
  };

  //换页
  changePage=(page)=>{
    let {menuKey} = this.state;
    switch(menuKey){
      case 1:
        this.setState({
          onePage:page
        });
        this.getInvJCData(page);
        break;
      case 2:
        this.setState({
          twoPage:page
        });
        this.getInvSCData(page);
        break;
      case 3:
        this.setState({
          comData:[],
          threePage:page
        });
        this.getUserComment(page);
        break;
      case 4:
        this.setState({
          fourPage:page
        });
        this.getUserChip(page);
        break;
    }
  };

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  //删除帖子
  deleteInvitation =(id)=>{
    console.log("id:", id);
    request({url:'/deleteInvitationJCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getInvJCData(this.state.onePage);
      }else{
        message.error("删除失败");
      }
    })
  };

  //删除赏瓷帖子
  deleteSC=(id)=>{
    request({url:'/deleteInvitationSCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.getInvSCData(this.state.twoPage);
      }
    })
  };

  //删除评论
  deleteComment=(id)=>{
    request({url:'/deleteCommentById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success('删除成功');
        this.getUserComment(this.state.threePage);
      }else{
        message.error("删除失败")
      }
    })
  };

  render() {
    let t = this;
    let {menuKey, visible, chipShow,invJCData, invSCData, comData, chipData} = this.state;
    let {userInfo} = this.props;
    return (
      <div className='UserDetails-box'>
        <Row>
          <Col span={12}>
            <MenuTitle
              color='red'
              content='用户信息'
            />
            <div className='UserDetails-userInfo'>
              <div className='UserDetails-userImg'>
                <img
                  style={{width:'100%',height:'100%'}}
                  alt='用户头像'
                  src={uploadUrl+userInfo.imgUrl}
                />
              </div>
              <div className='UserDetails-baseInfo'>
                <div className='UserDetails-userContent'>
                  <span className='title'>ID：</span>
                  <span>{userInfo.id}</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>昵称：</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>账号：</span>
                  <span>{userInfo.account}</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>密码：</span>
                  <span>{userInfo.password}</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <MenuTitle
              color='#FF9E00'
              content='创作'
              closeDetails={this.closeDetails}
              closeable={true}
            />
            <div className='UserDetails-userInfo'>
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px',backgroundColor:'transparent' }}
              >
                <Menu.Item key="1" onClick={this.changeMenu.bind(this,1)}>鉴瓷</Menu.Item>
                <Menu.Item key="2" onClick={this.changeMenu.bind(this,2)}>赏瓷</Menu.Item>
                <Menu.Item key="3" onClick={this.changeMenu.bind(this,3)}>评论</Menu.Item>
                <Menu.Item key="4" onClick={this.changeMenu.bind(this,4)}>陶片</Menu.Item>
              </Menu>
                <div className='UserDetails-right'>
                  {
                    menuKey === 1&&
                      <div>
                        {
                          invJCData.map((item,index)=>{
                            return(
                              <div>
                                <InvitationTab
                                  invId={item.id}
                                  t = {t}
                                  title={item.title}
                                  time={moment(Number(item.time)).format("YYYY/MM/DD")}
                                  content={item.content}
                                />
                                <Divider/>
                              </div>
                            )
                          })
                        }
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={this.state.oneTotal}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey === 2&&
                      <div>
                        {
                          invSCData.map((item,index)=>{
                            return(
                              <CeramicsTab
                                invId={item.id}
                                t = {t}
                                imgUrl={item.imgUrl}
                                content={item.content}
                              />
                            )
                          })
                        }
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={this.state.twoTotal}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey===3 &&
                      <div>
                        {
                          comData.map((item,index)=>{
                            return(
                              <div>
                                <MyComment
                                  invId={item.invitationId}
                                  comId={item.id}
                                  t={t}
                                  time={moment(Number(item.time)).format("YYYY/MM/DD")}
                                  comment={item.content}
                                  invContent={item.invContent}
                                />
                                <Divider/>
                              </div>
                            )
                          })
                        }
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={this.state.threeTotal}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey===4 &&
                      <div>
                        {
                          chipData.map((item,index)=>{
                            return(
                              <ChipInfoTab
                                item={item}
                                chipId={item.id}
                                t={t}
                                name={item.title}
                                imgUrl={`CP${index+1}.png`}
                              />
                            )
                          })
                        }
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={this.state.fourTotal}
                          />
                        </div>
                      </div>
                  }
                </div>
            </div>
          </Col>
        </Row>
        <Drawer
          width='85%'
          title="帖子详情"
          placement="right"
          closable={false}
          visible={visible}
          destroyOnClose={true}
        >
          <SysComJCDetails
            width='96%'
            closeDetails={this.closeInvitation}
            invId={this.state.invJCId}
            commentId={this.state.commentId}
          />
        </Drawer>
        <Drawer
          width='85%'
          title="陶片详情"
          placement="right"
          closable={false}
          visible={chipShow}
        >
          <ChipDetails
            width='96%'
            closeDetails={this.closeChipDetails}
            chipDetails={this.state.chipDetails}
          />
        </Drawer>
      </div>
    );
  }
}

export default UserDetails;