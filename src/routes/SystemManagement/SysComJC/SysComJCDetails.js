import React from 'react';
import {Row, Col, Icon, Modal, Divider, Pagination,Tooltip,Popconfirm,message} from 'antd';
import MenuTitle from "../../../components/MenuTitle";
import request from "../../../utils/request";
import moment from 'moment';
import './SysComJCDetails.css';
import config from "../../../config";
import UserInfoTab from "../../../components/UserInfoTab";

const pageSize = config.pageSize;
const uploadUrl = config.poxzy.imgUrl;

class SysComJCDetails extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      visible:false,
      ImageUrl:'',
      arr:['','','','',''],
      major:true,
      commentList:[],
      page:1,
      total:10,
      jcDetailsData:[]
    }
  }

  //取得帖子的详细信息：：：如果帖子是从用户帖子，或评论跳转过来的，则需要取得帖子的详细信息
  getInvitationInfo=(id)=>{
    request({url:'/getInvitationJC',method:'GET',params:{id:id}}).then((res)=>{
      if(res && res.code){
        this.setState({
          jcDetailsData:res.data[0]
        });
        if(this.props.commentId){
          //如果是从评论页面跳转来的，只显示当前评论
          this.getInvitationComment(this.state.page,this.props.commentId);
        }else{
          //如果是从帖子页面跳转来的，显示所有评论
          this.getInvitationComment(this.state.page);
        }
      }else{
        message.error("请求出错");
      }
    })
  };

  //取得帖子的评论表
  getInvitationComment=(page,comId)=>{
    //这个id是帖子id
    let id='';
    if(this.props.jcDetails){
      id=this.props.jcDetails.id;
    }else{
      id=this.props.invId;
    }
    let data={
      id,
      page:page,
      pageSize:pageSize
    };
    let {major} = this.state;
    //如果是minor，则是从帖子页面跳转过来
    if(!major){
      if(comId){
        data.comId=comId;
      }
    }
    request({url:'/getCommentFromInvitation',method:'GET',params:data}).then((res)=>{
      this.setState({
        commentList:res.data,
        total:res.total
      })
    })
  };

  componentDidMount() {
    //判断是从帖子详情页面进入还是点击的评论页面的帖子快捷跳转
    let type = sessionStorage.getItem('invitationType');
    //通过父组件的jcDetails判断是不是从鉴瓷总页面跳转，如是，只需要请求评论列表
    if(this.props.jcDetails){
      this.getInvitationComment(this.state.page);
      this.setState({
        jcDetailsData:this.props.jcDetails,
        major:true
      })
    }else{
      if(type && type==='minor'){
        this.getInvitationInfo(this.props.invId);
        this.setState({
          major:false
        })
      }else{
        this.getInvitationInfo(this.props.invId);
        this.setState({
          major:true
        })
      }
    }
  }

  //删除图片
  deleteImage=(index)=>{
    let {jcDetailsData}= this.state;
    jcDetailsData['imgUrl'+(index)] = "";
    request({url:"/updateInvitationJC",method:"GET",params:jcDetailsData}).then((res)=>{
      if(res && res.code){
        message.success("删除成功");
        this.setState({
          jcDetailsData
        })
      }else{
        message.error("删除失败");
      }
    });
  };

  //查看图片
  lookImage=(imgUrl)=>{
    this.setState({
      ImageUrl:imgUrl,
      visible: true,
    });
  };

  //点击取消关闭图片详情
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  //关闭详情页
  closeDetails=()=>{
    this.props.closeDetails();
  };

  //展示所有的评论
  showAllComment=()=>{
    this.setState({
      major:true
    },()=>{
      this.getInvitationComment(this.state.page);
    })
  };

  //删除评论
  deleteInvitation=(id)=>{
    request({url:'/deleteCommentById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success('删除成功');
        this.getInvitationComment(this.state.page);
      }else{
        message.error('删除失败');
      }
    });
  };

  //换页
  changePage=(page)=>{
    this.setState({
      page
    })
  };

  render() {
    let t = this;
    let {visible, ImageUrl, major, commentList,jcDetailsData, arr} = this.state;
    return (
      <div className='SysJCDe-box' style={{width:`${this.props.width?this.props.width:'85%'}`}}>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
              color='#FF0000'
              content='基本信息'
            />
              <div>
                <Row>
                  <Col span={12}>
                    {/*左边创作者标题时间等信息*/}
                    <div className='SysJCDe-baseInfo'>
                      {/*创作者id*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>用户id：</span>
                        <span> {jcDetailsData.userId?jcDetailsData.userId:''}</span>
                      </div>
                      {/*创作者昵称*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>用户昵称：</span>
                        <span> {jcDetailsData.userName?jcDetailsData.userName:''}</span>
                      </div>
                      {/*帖子id*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>帖子id：</span>
                        <span> {jcDetailsData.id?jcDetailsData.id:''}</span>
                      </div>
                      {/*帖子标题*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>帖子标题：</span>
                        <span> {jcDetailsData.title?jcDetailsData.title:''}</span>
                      </div>
                      {/*帖子时间*/}
                      <div className='DivHeight-40'>
                        <span style={{fontWeight:'bold'}}>发贴时间：</span>
                        <span> {moment(Number(jcDetailsData.time?jcDetailsData.time:'')).format("YYYY/MM/DD")}</span>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    {/*右边用户头像*/}
                    <div
                      style={{height:'200px',boxShadow:'3px 3px 10px 3px #ccc'}}
                      onClick={this.lookImage.bind(this,jcDetailsData.userImg)}
                    >
                      <img
                        className='userAvatar'
                        style={{width:'100%',height:'100%'}}
                        alt='用户头像'
                        src={jcDetailsData.userImg?uploadUrl+jcDetailsData.userImg:''}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/*帖子配图*/}
              <div className='SysJCDe-invimage'>
                <div style={{fontWeight:'bold',marginBottom:'20px'}}>帖子配图：</div>
                <div className='SysJCDe-invimage-image'>
                  <Row>
                    {
                      arr.map((item,index)=>{
                        return(
                          <Col span={4}>
                            {
                              jcDetailsData['imgUrl'+(index+1)] &&
                              <div style={{height:'80px',padding:'2px 2px',display:'flex'}}>
                                <img
                                  className='invimage'
                                  style={{width:'100%',height:'100%'}}
                                  src={uploadUrl+jcDetailsData['imgUrl'+(index+1)]}
                                  alt='帖子配图'
                                />
                                <div className='SysJCDe-deleteImg'>
                                  <Row style={{height:'100%'}}>
                                    <Col span={12} style={{height:'100%'}}>
                                      <Icon
                                        onClick={this.lookImage.bind(this,jcDetailsData['imgUrl'+(index+1)])}
                                        className='SysJCDe-deleteImg-icon'
                                        type="eye"
                                        theme="filled"
                                      />
                                    </Col>
                                    <Col span={12} style={{height:'100%'}}>
                                      <Icon
                                        onClick={this.deleteImage.bind(this,index+1)}
                                        className='SysJCDe-deleteImg-icon'
                                        type="delete"
                                        theme="filled"
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            }
                          </Col>
                        )
                      })
                    }
                  </Row>
                </div>
              </div>
              {/*内容*/}
              <div className='SysJCDe-content'>
                <div style={{fontWeight:'bold',marginBottom:'20px'}}>帖子内容：</div>
                <div className='InvitationContent' style={{overflow:'auto',height:'150px'}}>
                  {jcDetailsData.content?jcDetailsData.content:''}
                </div>
              </div>
            </div>
          </Col>
          <Col span={12} style={{height:'100%'}}>
            <div style={{height:'100%'}}>
              <MenuTitle
                color='#FF9E00'
                content='评论'
                closeDetails={this.closeDetails}
                closeable={true}
              />
              <div className='SysJCDe-comment'>
                {
                  commentList.map((item,index)=>{
                    return(
                      <div key={index}>
                        <UserInfoTab
                          deleteInvitation={this.deleteInvitation.bind(this,item.id)}
                          imgUrl={uploadUrl+item.userImg}
                          name={item.userName}
                          time={moment(Number(item.time)).format("YYYY/MM/DD HH:mm")}
                          content={item.content}
                        />
                        <Divider/>
                      </div>
                    )
                  })
                }
                {
                  (!major) &&
                    <div
                      style={{textAlign:'center',color:'blue',cursor:'pointer'}}
                      onClick={this.showAllComment}
                    >
                      显示所有评论
                    </div>
                }
                <div style={{height:'50px',marginTop:'20px'}}>
                  <Pagination
                    onChange={this.changePage}
                    defaultCurrent={1}
                    pageSize={pageSize}
                    total={this.state.total}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={uploadUrl+ImageUrl} />
        </Modal>
      </div>
    );
  }
}

export default SysComJCDetails;