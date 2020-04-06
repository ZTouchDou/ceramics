import React from 'react';
import {Row, Col,Carousel,Drawer,Divider,Icon,Input,message} from 'antd';
import moment from "moment";
import request from "../../../utils/request";
import GoBackButton from "../../../components/GoBackButton";
import './index.css';
import config from "../../../config";

const uploadUrl = config.poxzy.imgUrl;

const UserInfoTab = ({imgUrl, name, time, title, content})=>{
  return(
    <div>
      <div className='ComJC-user'>
        <Row style={{width:'100%',height:'100%'}}>
          <Col span={4} style={{height:'100%'}}>
            <img
              style={{borderRadius:'50%',width:'100%',height:'100%'}}
              src={imgUrl}
              alt='用户头像'
            />
          </Col>
          <Col span={16} style={{height:'100%'}}>
            <div className='ComJC-user-name'>
              {name}
            </div>
            <div className='ComJC-user-time'>
              {time}
            </div>
          </Col>
        </Row>
      </div>
      {
        title &&
        <div className='ComJC-title'>
          {title}
        </div>
      }
      {
        content &&
        <div className='ComJC-text'>
          {content}
        </div>
      }
    </div>
  )
};

class ComJC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      commentShow:false,
      jcDetailsData:[],
      invId:'',
      commentList:[]
    }
  }

  //取得帖子的详细信息
  getInvitationInfo=(id)=>{
    request({url:'/getInvitationJC',method:'GET',params:{id:id}}).then((res)=>{
      if(res && res.code){
        this.setState({
          jcDetailsData:res.data[0],
          invId:res.data[0].id
        },()=>{
          this.changeHeight();
        });
      }else{
        message.error("请求出错");
      }
    })
  };

  componentDidMount() {
    let id = sessionStorage.getItem("invJCId");
    this.getInvitationInfo(id);
    this.changeHeight();
  }

  componentWillUnmount() {
    sessionStorage.removeItem("invJCId");
  }

  //取得帖子的评论列表
  getCommentList=()=>{
    let data={
      id:this.state.invId
    };
    request({url:'/getCommentFromInvitation',method:'GET',params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          commentList:res.data
        })
      }else{
        message.error("取得评论失败");
      }
    })
  };

  //返回
  gotoBack=()=>{
    this.props.history.go(-1);
  };

  //显示评论
  showComment=()=>{
    this.setState({
      commentShow:true
    },()=>{
      this.getCommentList()
    })
  };

  //关闭评论
  closeComment=()=>{
    this.setState({
      commentShow:false
    })
  };

  //发表评论
  submitComment=()=>{
    let str=document.getElementById("commentInput").getAttribute("value");
    if(str.length!==0){
      let data={
        userId:sessionStorage.getItem("userId"),
        type:0,
        invitationId:this.state.invId,
        content:str
      };
      request({url:'/insertComment',method:"POST",data:data}).then((res)=>{
        if(res && res.code){
          message.success("发表评论成功");
          this.getCommentList()
        }
      })
    }else{
      message.warn("空空如也，正如这个评论");
    }
  };

  //改变高度
  changeHeight=()=>{
    let h = document.getElementsByClassName('slick-active')[0] && document.getElementsByClassName('slick-active')[0].offsetHeight;
    document.getElementById('ComJC-image').setAttribute('style',`height:${h}px;transition:height 1s`);
  };

  render() {
    let {commentShow,jcDetailsData}=this.state;
    return (
      <div className='ComJC-box'>
        <GoBackButton
          gotoBack={this.gotoBack}
          color='black'
        />
        <div className='ComJC-Affix'>
          <div className='ComJC-Affix-next'>
            <Icon type="right-circle" theme="filled" onClick={this.getInvitationInfo.bind(this,0)}/>
          </div>
          <div className='ComJC-Affix-comment' onClick={this.showComment}>
            <Icon type="message" theme="filled" />
          </div>
        </div>
        <div className='ComJC-header'>
          鉴瓷
        </div>
        <div className='ComJC-body'>
          <div className='ComJC-image' id='ComJC-image'>
            <Carousel
              afterChange={this.changeHeight}
              className='ant-carousel-ComJC'
              ref={el => (this.slider = el)}
              autoplay={false}
              dots={true}
              dotPosition='bottom'
              lazyLoad={false}
            >
              {
                jcDetailsData.imgUrl1&&
                <img
                  src={uploadUrl+jcDetailsData.imgUrl1}
                  style={{width:'100%',height:'100%'}}
                  alt='陶瓷配图'
                />
              }
              {
                jcDetailsData.imgUrl2&&
                <img
                  src={uploadUrl+jcDetailsData.imgUrl2}
                  style={{width:'100%',height:'100%'}}
                  alt='陶瓷配图'
                />
              }
              {
                jcDetailsData.imgUrl3&&
                <img
                  src={uploadUrl+jcDetailsData.imgUrl3}
                  style={{width:'100%',height:'100%'}}
                  alt='陶瓷配图'
                />
              }
              {
                jcDetailsData.imgUrl4&&
                <img
                  src={uploadUrl+jcDetailsData.imgUrl4}
                  style={{width:'100%',height:'100%'}}
                  alt='陶瓷配图'
                />
              }
              {
                jcDetailsData.imgUrl5&&
                <img
                  src={uploadUrl+jcDetailsData.imgUrl5}
                  style={{width:'100%',height:'100%'}}
                  alt='陶瓷配图'
                />
              }
            </Carousel>
          </div>
          <Row>
            <Col span={24}>
              <div className='ComJC-content'>
                <UserInfoTab
                  imgUrl={uploadUrl+jcDetailsData.userImg}
                  name={jcDetailsData.userName}
                  time={moment(Number(jcDetailsData.time)).format("YYYY/MM/DD")}
                />
                <div className='ComJC-title'>
                  {jcDetailsData.title}
                </div>
                <div className='ComJC-text'>
                  {jcDetailsData.content}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Drawer
          style={{borderTopLeftRadius:'5%'}}
          placement="bottom"
          closable={true}
          onClose={this.closeComment}
          visible={commentShow}
          title='评论'
          width='100vw'
          height='90vh'
        >
          <div className='ComJC-com-box'>
            <div className='ComJC-com-input'>
              <Row>
                <Col span={21}>
                  <Input placeholder='写个评论吧' id="commentInput"/>
                </Col>
                <Col span={3} style={{textAlign:'center'}}>
                  <Icon
                    type="edit"
                    theme="filled"
                    style={{fontSize:'8vmin',color:'#009cfd'}}
                    onClick={this.submitComment}
                  />
                </Col>
              </Row>
            </div>
            {
              this.state.commentList.length>0 ?
              this.state.commentList.map((item,index)=>{
                return(
                  <div>
                    <UserInfoTab
                      key={index}
                      imgUrl={uploadUrl+item.userImg}
                      name={item.userName}
                      time={moment(Number(item.time)).format("YYYY/MM/DD HH:mm")}
                      content={item.content}
                    />
                    <Divider/>
                  </div>
                )
              })
                :
                <div style={{width:'24vw',fontSize:'6vmin',opacity:'0.7',marginTop:'50%',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
                  空空如也
                </div>
            }
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ComJC;