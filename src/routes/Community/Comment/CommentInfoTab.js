import React from 'react';
import moment from "moment"
import { withRouter } from 'react-router-dom'
import {Popconfirm, Icon,notification }from 'antd';
import './CommentInfoTab.css';

class CommentInfoTab extends React.Component{
  constructor(props) {
    super(props);

  }

  //添加这个点击事件是为了阻止事件冒泡
  topPropagationClick=(e)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  //确认删除
  handleDelete=(id,e)=>{
    console.log("id:", id);
    notification['success']({
      message: '成功',
      description:
        '删除操作成功（假的，接口还没调呢）( ‘-ωก̀ )',
      duration: 0,
    });
  };

  //展示这个评论的帖子页面
  gotoInvitation=(id)=>{
    if(id){
      sessionStorage.setItem("invJCId",id);
      this.props.history.push('/Community/ComJC');
    }
  };

  render() {
    let {item} = this.props;
    return (
      <div className='ComInfoTab-box'>
        <div className='ComInfoTab-header'>
          <div className='ComInfoTab-time'>
            {moment(Number(item.time)).format("YYYY/MM/DD HH:mm")}
          </div>
          <div onClick={this.topPropagationClick}>
            <Popconfirm
              title='确定删除吗？'
              okText="确定"
              cancelText="取消"
              placement="left"
              onConfirm={this.handleDelete}
            >
              <div className='ComInfoTab-delete'>
                <Icon type="close-circle" theme="filled" />
              </div>
            </Popconfirm>
          </div>
        </div>
        <div className='ComInfoTab-body'>
          {item.content}
        </div>
        <div className='ComInfoTab-invitation' onClick={this.gotoInvitation.bind(this,item.invitationId)}>
          {item.invContent}
        </div>
      </div>
    );
  }
}

export default withRouter(CommentInfoTab);