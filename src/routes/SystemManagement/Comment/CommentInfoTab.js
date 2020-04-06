import React from 'react';
import {Tooltip} from 'antd';
import moment from "moment";
import { withRouter } from 'react-router-dom'
import {Popconfirm, Icon,notification,Avatar }from 'antd';
import './CommentInfoTab.css';
import config from "../../../config";

const uploadUrl = config.poxzy.imgUrl;

class CommentInfoTab extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      showDetails:false
    }
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

  render() {
    let {item} = this.props;
    return (
      <Tooltip title={`ID：${item.id}`}>
        <div className='ComInfoTab-box'>
          <div className='ComInfoTab-header'>
            <div className='ComInfoTab-time'>
              <Avatar
                src={uploadUrl+item.userImg}
              />
              <div>
                <div style={{padding:'2px 10px'}}>
                  {item.userName}
                </div>
                <div style={{padding:'2px 10px',color:'#ccc'}}>
                  {moment(Number(item.time)).format("YYYY/MM/DD")}
                </div>
              </div>
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
          <div className='ComInfoTab-invitation' onClick={this.props.showModal.bind(this,item)}>
            {item.invContent}
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default withRouter(CommentInfoTab);