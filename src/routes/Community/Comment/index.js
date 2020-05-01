import React from 'react';
import request from "../../../utils/request";
import './index.css';
import CommentInfoTab from "./CommentInfoTab";

const pageSize = 10;

class Comment extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      total:10,
      comData:[],
    }
  }

  //取得评论信息
  getUserComment=(page)=>{
    let id = sessionStorage.getItem("userId");
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
            }
          })
        });
        this.setState({
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getUserComment(this.state.page);
  }

  render() {
    return (
      <div className='Comment-box'>
        {
          this.state.comData.map((item,index)=>{
            return(
              <CommentInfoTab
                key={index}
                item={item}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Comment;