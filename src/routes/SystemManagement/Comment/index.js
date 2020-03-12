import React from 'react';
import {Pagination} from 'antd';
import CommentInfoTab from "./CommentInfoTab";
import config from "../../../config";
import SysComJCDetails from "../SysComJC/SysComJCDetails";

const pageSize = config.pageSize;

class Comment extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      showDetails:false
    }
  }

  //展示这个评论的帖子页面
  gotoInvitation=(id)=>{
    sessionStorage.setItem('invitationType','minor');
    console.log("id:", id);
    this.setState({
      showDetails:true
    })
  };

  //关闭这个评论的帖子页面
  closeDetails = ()=>{
    this.setState({
      showDetails:false
    })
  };

  render() {
    let {showDetails} = this.state;
    return (
      <div style={{display:'flex',flexWrap:'wrap'}}>
        <div style={{display:'flex',overflow:'auto'}}>
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
          <CommentInfoTab
            showModal={this.gotoInvitation}
          />
        </div>
        <div style={{height:'50px',marginLeft:'50%',transform:'translateX(-50%)'}}>
          <Pagination
            onChange={this.changePage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={500}
          />
        </div>
        {
          showDetails &&
          <SysComJCDetails
            closeDetails={this.closeDetails}
          />
        }
      </div>
    );
  }
}

export default Comment;