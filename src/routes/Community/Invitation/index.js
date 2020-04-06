import React from 'react';
import {notification} from 'antd';
import './index.css';
import request from "../../../utils/request";
import InvitationInfoTab from "./InvitationInfoTab";
import config from "../../../config";

const pageSize = 10;


class Invitation extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      total:10,
      invJCData:[]
    }
  }

  //取得鉴瓷信息
  getInvJCData=(page)=>{
    let id = sessionStorage.getItem("userId");
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getInvitationJCInUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          invJCData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getInvJCData(this.state.page);
  }

  //删除一个鉴瓷帖子
  deleteInvitation=(id)=>{
    request({url:'/deleteInvitationJCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        notification['success']({
          message: '成功',
          description:
            '删除操作成功♪（＾∀＾●）ﾉｼ',
          duration: 0,
        });
        this.getInvJCData(this.state.page);
      }else{
        notification['error']({
          message: '失败',
          description:
            '删除操作失败  ╮(๑•́ ₃•̀๑)╭',
          duration: 0,
        });
      }
    });
  };

  render() {
    return (
      <div className='Invitation-box'>
        {
          this.state.invJCData.map((item,index)=>{
            return(
              <InvitationInfoTab
                key={index}
                item={item}
                deleteInvitation={this.deleteInvitation}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Invitation;