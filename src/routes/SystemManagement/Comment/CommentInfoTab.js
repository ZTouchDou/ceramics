import React from 'react';
import {Tooltip} from 'antd';
import { withRouter } from 'react-router-dom'
import {Popconfirm, Icon,notification,Avatar }from 'antd';
import './CommentInfoTab.css';
import SysComJCDetails from "../SysComJC/SysComJCDetails";

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
    return (
      <Tooltip title='ID：10125'>
        <div className='ComInfoTab-box'>
          <div className='ComInfoTab-header'>
            <div className='ComInfoTab-time'>
              <Avatar
                src="http://img1.imgtn.bdimg.com/it/u=1266666099,348969094&fm=26&gp=0.jpg"
              />
              <div>
                <div style={{padding:'2px 10px'}}>
                  小果果
                </div>
                <div style={{padding:'2px 10px',color:'#ccc'}}>
                  2020/3/3
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
            Support for let and class redeclarations When experimenting with new code in the Console
          </div>
          <div className='ComInfoTab-invitation' onClick={this.props.showModal.bind(this,'1')}>
            Improved WebAssembly debugging The Sources pannel has increased support for stepping over code.
          </div>
        </div>
      </Tooltip>
    );
  }
}

export default withRouter(CommentInfoTab);