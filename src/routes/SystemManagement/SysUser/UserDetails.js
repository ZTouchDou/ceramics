import React from 'react';
import {Row, Col, Menu,Divider, Drawer, Pagination,Popconfirm,Tooltip,Icon,message} from 'antd';
import './UserDetails.css';
import MenuTitle from "../../../components/MenuTitle";
import SysComJCDetails from "../SysComJC/SysComJCDetails";
import config from "../../../config";
import ChipDetails from "../Chip/ChipDetails";

const pageSize = config.pageSize;

//鉴瓷
const InvitationTab = ({t,id,title,time,content})=>{
  return(
    <div onClick={t.showInvitation} style={{cursor:'pointer'}}>
      <div className='inv-header'>
        <Row>
          <Col span={20}>
            <div className='inv-title'>
              <div>
                ID：102258
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
          onConfirm={t.deleteInvitation}
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
const CeramicsTab = ({t,id,imgUrl,content})=>{
  return(
    <div>
      <Row style={{height:'100%'}}>
        <Col span={12}>
          <div>
            <img
              style={{width:'100%',height:'100%'}}
              alt='配图'
              src={imgUrl}/>
          </div>
        </Col>
        <Col span={12} style={{height:'100%'}}>
          <div className='Cer-content'>
            <Row>
              <Col span={21}>
                <div style={{fontSize:'20px',fontWeight:'bold'}}>
                  ID：102258
                </div>
              </Col>
              <Col span={3}>
                <div style={{textAlign:'right',fontSize:'20px'}} onClick={t.topPropagationClick}>
                  <Popconfirm
                    title='确定删除吗？'
                    okText="确定"
                    cancelText="取消"
                    placement="left"
                    onConfirm={t.deleteInvitation}
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
const MyComment = ({t,id,time,comment,invContent})=>{
  return(
    <div>
      <Row>
        <Col span={21}>
          <div style={{fontWeight:'bold'}}>
            ID：12586
          </div>
        </Col>
        <Col span={3}>
          <div style={{textAlign:'right',fontSize:'20px'}} onClick={t.topPropagationClick}>
            <Popconfirm
              title='确定删除吗？'
              okText="确定"
              cancelText="取消"
              placement="left"
              onConfirm={t.deleteInvitation}
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
            <div className='MyComment-invContent' onClick={t.showInvitation}>
              {invContent}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
};

//陶片
const ChipInfoTab = ({t,id,name,imgUrl})=>{
  const mask={
    "WebkitMask":`url(${require('../../../Image/'+imgUrl)})`,
    "WebkitMaskSize":"100% 100%"
  };
  return(
    <Tooltip title='ID：1024' placement='left'>
      <div className='ChipInfoTab-box' onClick={t.gotoChipDetails}>
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
      chipShow:false
    }
  }

  //显示详情框
  showInvitation=()=>{
    this.setState({
      visible:true
    })
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
  gotoChipDetails=()=>{
    this.setState({
      chipShow:true
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
  changePage=(page,pageSize)=>{
    console.log("page,pageSize:", page,pageSize);
  };

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  //删除评论
  deleteInvitation=()=>{
    message.success('删除成功');
  };

  render() {
    let t = this;
    let {menuKey, visible, chipShow} = this.state;
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
                  src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1370247782,2489777805&fm=26&gp=0.jpg'
                />
              </div>
              <div className='UserDetails-baseInfo'>
                <div className='UserDetails-userContent'>
                  <span className='title'>ID：</span>
                  <span>1001</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>昵称：</span>
                  <span>小果果</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>账号：</span>
                  <span>1258234434@qq.com</span>
                </div>
                <div className='UserDetails-userContent'>
                  <span className='title'>密码：</span>
                  <span>1258234434@qq.com</span>
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
                        <InvitationTab
                          t = {t}
                          title='观形'
                          time='2020/3/3'
                          content='瓷之型代表和展现着历史、人文、政治、经济乃至形制和生产力发展的传承脉络。 是一个时段政治经济发展演绎过程最直接的体现。 因而，我们研究认识瓷之型的演绎过程也便于了解社会的进程与发展。 如果我们对某一类的器物，从起源到发展的全过程有一番系统的了解， 如瓷壶类，那么我们从器型，全然可以粗略地以型断代， 然后依据同时代的取材、用料、配方工艺、人文历史等进行全方位的核实论证，就完全有可能准确的断其年代。 假如说年代确立不了，那就容易张冠李戴，形成老虎吃天，无法下爪。 由此可说，鉴定瓷器，观型断代是坚定的第一要素。'
                        />
                        <Divider/>
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={100}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey === 2&&
                      <div>
                        <CeramicsTab
                          t = {t}
                          imgUrl='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2016551457,3277632260&fm=26&gp=0.jpg'
                          content='立春 2月3-4日'
                        />
                        <CeramicsTab
                          t = {t}
                          imgUrl='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=28463233,2696505373&fm=11&gp=0.jpg'
                          content='立春 2月3-4日'
                        />
                        <CeramicsTab
                          t = {t}
                          imgUrl='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=153995377,2161912859&fm=26&gp=0.jpg'
                          content='立春 2月3-4日'
                        />
                        <CeramicsTab
                          t = {t}
                          imgUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2653335221,2108390734&fm=26&gp=0.jpg'
                          content='立春 2月3-4日'
                        />
                        <CeramicsTab
                          t = {t}
                          imgUrl='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3503268207,941710284&fm=26&gp=0.jpg'
                          content='立春 2月3-4日'
                        />
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={100}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey===3 &&
                      <div>
                        <MyComment
                          t={t}
                          time='2020/3/3'
                          comment='早知道是这样，像梦一场，我才不会把爱都放在同一个地方'
                          invContent='让我在没有你的地方疗伤'
                        />
                        <Divider/>
                        <MyComment
                          t={t}
                          time='2020/3/3'
                          comment='早知道是这样，像梦一场，我才不会把爱都放在同一个地方'
                          invContent='让我在没有你的地方疗伤'
                        />
                        <Divider/>
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={100}
                          />
                        </div>
                      </div>
                  }
                  {
                    menuKey===4 &&
                      <div>
                        <ChipInfoTab
                          t={t}
                          name='乡俗'
                          imgUrl='CP3.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='关于李白的那些事'
                          imgUrl='SysBg.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='渔夫'
                          imgUrl='CP2.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='小九寨'
                          imgUrl='CP4.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='罗生'
                          imgUrl='CP5.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='1935'
                          imgUrl='CP6.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='清明传统'
                          imgUrl='CP7.png'
                        />
                        <ChipInfoTab
                          t={t}
                          name='花旦'
                          imgUrl='CP8.png'
                        />
                        <div style={{height:'50px',marginTop:'20px'}}>
                          <Pagination
                            onChange={this.changePage}
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={100}
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
        >
          <SysComJCDetails
            width='96%'
            closeDetails={this.closeInvitation}
          />
        </Drawer>
        <Drawer
          width='85%'
          title="帖子详情"
          placement="right"
          closable={false}
          visible={chipShow}
        >
          <ChipDetails
            width='96%'
            closeDetails={this.closeChipDetails}
          />
        </Drawer>
      </div>
    );
  }
}

export default UserDetails;