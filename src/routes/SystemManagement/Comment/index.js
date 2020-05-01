import React from 'react';
import {Pagination, message} from 'antd';
import request from "../../../utils/request";
import CommentInfoTab from "./CommentInfoTab";
import SysComJCDetails from "../SysComJC/SysComJCDetails";

const pageSize = 6;


class Comment extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      showDetails:false,
      commentData:[],
      page:1,
      total:10,
      invId:'',
      commentId:''
    }
  }

  //取得评论列表
  getCommentList=(page)=>{
    request({url:"/getCommentFromAll",method:'GET',params:{page:page,pageSize:pageSize}}).then((res)=>{
      if(res && res.code){
        res.data.map((item,index)=>{
          request({url:'/getInvitationJC',method:'GET',params:{id:item.invitationId}}).then((res)=>{
            if(res && res.code){
              if(item.type===0){
                item.invContent = res.data[0].content
              }else{
                item.invContent = "来自书评";
              }
              let {commentData} = this.state;
              commentData[index] = item;
              this.setState({
                commentData
              });
            }
          })
        });
        this.setState({
          total:res.total
        })
      }else{
        message.error("取得评论失败");
      }
    })
  };

  componentDidMount() {
    this.getCommentList(this.state.page);
  }

  //删除评论
  deleteComment=(id)=>{
    request({url:'/deleteCommentById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        message.success('删除成功');
        this.getCommentList(this.state.page);
      }else{
        message.error('删除失败');
      }
    });
  };

  //展示这个评论的帖子页面
  gotoInvitation=(item)=>{
    sessionStorage.setItem('invitationType','minor');
    this.setState({
      showDetails:true,
      invId:item.invitationId,
      commentId:item.id
    })
  };

  //关闭这个评论的帖子页面
  closeDetails = ()=>{
    this.setState({
      showDetails:false
    })
  };

  changePage=(page)=>{
    this.setState({
      commentData:[],
      page
    });
    this.getCommentList(page);
  };

  render() {
    let {showDetails, commentData} = this.state;
    return (
      <div style={{display:'flex',flexWrap:'wrap'}}>
        <div style={{display:'flex',overflow:'auto'}}>
          {
            commentData.map((item,index)=>{
              return(
                <CommentInfoTab
                  key={index}
                  item={item}
                  showModal={this.gotoInvitation}
                  deleteComment={this.deleteComment}
                />
              )
            })
          }
        </div>
        <div style={{width:'100%',textAlign:'center',height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={this.state.total}
          />
        </div>
        {
          showDetails &&
          <SysComJCDetails
            closeDetails={this.closeDetails}
            invId={this.state.invId}
            commentId={this.state.commentId}
          />
        }
      </div>
    );
  }
}

export default Comment;