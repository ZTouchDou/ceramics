import React from 'react';
import {notification} from 'antd';
import './index.css';
import request from "../../../utils/request";
import CerPicInfoTab from "./CerPicInfoTab";

const pageSize=20;

class CeramicsPicture extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      page:1,
      total:10,
      invSCData:[],
    }
  }

  //取得赏瓷信息
  getInvSCData=(page)=>{
    let id = sessionStorage.getItem("userId");
    let data={
      id:id,
      page:page,
      pageSize:pageSize
    };
    request({url:'/getInvitationSCInUser',method:"GET",params:data}).then((res)=>{
      if(res && res.code){
        this.setState({
          invSCData:res.data,
          total:res.total
        })
      }
    })
  };

  componentDidMount() {
    this.getInvSCData(this.state.page);
  }

  //删除赏瓷帖子
  deleteInvitation=(id)=>{
    request({url:'/deleteInvitationSCById/'+id,method:'GET'}).then((res)=>{
      if(res && res.code){
        notification['success']({
          message: '成功',
          description:
            '删除操作成功♪（＾∀＾●）ﾉｼ',
          duration: 0,
        });
        this.getInvSCData(this.state.page);
      }else{
        notification['error']({
          message: '失败',
          description:
            '删除操作失败  ╮(๑•́ ₃•̀๑)╭',
          duration: 0,
        });
      }
    })
  };

  render() {
    return (
      <div className='CerPic-box'>
        {
          this.state.invSCData.map((item,index)=>{
            return(
              <CerPicInfoTab
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

export default CeramicsPicture;